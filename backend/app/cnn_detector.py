"""
CNN-based deepfake detector using ResNet / EfficientNet.
Designed for weights trained on FaceForensics++, Celeb-DF, or similar datasets.
"""

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import numpy as np
from pathlib import Path

from .face_detector import crop_largest_face, center_crop
from .config import MODEL_WEIGHTS_PATH, MAX_IMAGE_SIZE


# Standard ImageNet normalization for pre-trained backbones
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]


def build_resnet18(num_classes: int = 2) -> nn.Module:
    """Build ResNet18 with custom classifier head for binary deepfake detection."""
    model = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    return model


def build_efficientnet_b0(num_classes: int = 2) -> nn.Module:
    """Build EfficientNet-B0 with custom classifier head."""
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.IMAGENET1K_V1)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    return model


class CNNDetector:
    """
    CNN-based detector. Loads ResNet18 or EfficientNet weights trained on
    FaceForensics++, Celeb-DF, or similar. Use face detection pipeline for face crops.
    """

    def __init__(self, architecture: str = "resnet18", weights_path: str | None = None):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        arch = architecture.lower()
        if arch == "efficientnet":
            self.model = build_efficientnet_b0()
        else:
            self.model = build_resnet18()
        self.model = self.model.to(self.device)
        self.model.eval()

        if weights_path and Path(weights_path).exists():
            state = torch.load(weights_path, map_location=self.device)
            if isinstance(state, dict) and "model" in state:
                self.model.load_state_dict(state["model"], strict=False)
            else:
                self.model.load_state_dict(state, strict=False)
        # If no weights: uses ImageNet pretrained backbone (not trained for deepfake - low accuracy)

        self.transform = transforms.Compose([
            transforms.ToPILImage(),
            transforms.Resize((MAX_IMAGE_SIZE, MAX_IMAGE_SIZE)),
            transforms.ToTensor(),
            transforms.Normalize(IMAGENET_MEAN, IMAGENET_STD),
        ])

    def predict(self, image: np.ndarray, use_face_detection: bool = True) -> tuple[bool, float]:
        """
        Predict if image is real (True) or fake (False).
        Returns (is_real, confidence).
        """
        # Face detection pipeline: crop face or center crop
        if use_face_detection:
            crop = crop_largest_face(image, MAX_IMAGE_SIZE)
        else:
            crop = None
        if crop is None:
            crop = center_crop(image, MAX_IMAGE_SIZE)

        # BGR to RGB if needed
        if crop.shape[2] == 3:
            crop = crop[:, :, ::-1]  # BGR -> RGB

        tensor = self.transform(crop).unsqueeze(0).to(self.device)
        with torch.no_grad():
            logits = self.model(tensor)
            probs = torch.softmax(logits, dim=1)
            # Assuming index 0 = Real, 1 = Fake (adjust if your training used different labels)
            prob_real = probs[0, 0].item()
            prob_fake = probs[0, 1].item()

        is_real = prob_real >= 0.5
        confidence = prob_real if is_real else prob_fake
        return is_real, float(confidence)
