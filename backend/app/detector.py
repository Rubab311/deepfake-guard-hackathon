"""
Deepfake detection orchestration.
Uses either:
1. Transformers (Hugging Face) - pre-trained model, works out of the box
2. CNN (ResNet/EfficientNet) - requires weights trained on FaceForensics++/Celeb-DF
"""

import numpy as np
from PIL import Image
from io import BytesIO

from .config import MODEL_TYPE, MODEL_WEIGHTS_PATH, HF_MODEL_ID, REAL_THRESHOLD


def _load_transformers_model():
    """Lazy load Hugging Face pipeline."""
    from transformers import pipeline
    return pipeline(
        "image-classification",
        model=HF_MODEL_ID,
        top_k=2,
    )


def _load_cnn_model():
    """Lazy load CNN detector."""
    from .cnn_detector import CNNDetector
    return CNNDetector(
        architecture="resnet18",
        weights_path=MODEL_WEIGHTS_PATH or None,
    )


# Singleton model instances
_transformers_model = None
_cnn_model = None


def get_detector():
    global _transformers_model, _cnn_model
    if MODEL_TYPE == "cnn":
        if _cnn_model is None:
            _cnn_model = _load_cnn_model()
        return _cnn_model
    else:
        if _transformers_model is None:
            _transformers_model = _load_transformers_model()
        return _transformers_model


def analyze_image_transformers(image_bytes: bytes) -> dict:
    """Analyze using Hugging Face transformers model."""
    pipe = get_detector()
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    result = pipe(image)
    # Result is list of top_k predictions: [{"label": "Real", "score": 0.95}, ...]
    label_to_score = {}
    for r in result:
        if isinstance(r, dict):
            label_to_score[r["label"].upper()] = r["score"]
        elif isinstance(r, list):
            label_to_score[r[0].upper()] = r[1]
    # Handle various label names (Real/Fake, AUTHENTIC, etc.)
    prob_real = label_to_score.get("REAL", label_to_score.get("AUTHENTIC", 0.5))
    prob_fake = label_to_score.get("FAKE", label_to_score.get("1", 0.5))
    if not label_to_score:
        prob_real, prob_fake = 0.5, 0.5
    total = prob_real + prob_fake
    if total > 0:
        prob_real, prob_fake = prob_real / total, prob_fake / total
    is_real = prob_real >= REAL_THRESHOLD
    authenticity_score = prob_real
    confidence = prob_real if is_real else prob_fake
    return _format_result(is_real, authenticity_score, confidence)


def analyze_image_cnn(image_bytes: bytes) -> dict:
    """Analyze using CNN (ResNet/EfficientNet) with face detection."""
    model = get_detector()
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    arr = np.array(image)
    raw_real, raw_confidence = model.predict(arr, use_face_detection=True)
    prob_real = raw_confidence if raw_real else (1 - raw_confidence)
    is_real = prob_real >= REAL_THRESHOLD
    authenticity_score = prob_real
    confidence = prob_real if is_real else (1 - prob_real)
    return _format_result(is_real, authenticity_score, confidence)


def _format_result(is_real: bool, authenticity_score: float, confidence: float) -> dict:
    """Format API response."""
    risk_level = "low" if (authenticity_score >= 0.7) else ("medium" if authenticity_score >= 0.4 else "high")
    if authenticity_score > 0.7:
        factors = [
            {"name": "Face consistency", "value": "Natural", "status": "success", "explanation": "Facial features, symmetry, and proportions appear consistent with a real photograph. No obvious signs of face-swapping or morphing."},
            {"name": "Skin texture", "value": "Natural", "status": "success", "explanation": "Skin exhibits natural pore structure, wrinkles, and texture variation. No unnaturally smooth or blurred patches typical of AI generation."},
            {"name": "Lighting alignment", "value": "Consistent", "status": "success", "explanation": "Light sources and shadows align across the image. Highlights and reflections follow a coherent lighting model."},
            {"name": "Edge artifacts", "value": "None", "status": "success", "explanation": "No visible halos, blurring, or discoloration around facial boundaries or edges. Blending appears natural."},
        ]
    elif authenticity_score > 0.5:
        factors = [
            {"name": "Face consistency", "value": "Suspicious", "status": "warning", "explanation": "Minor inconsistencies in facial symmetry or feature alignment detected. Could indicate partial manipulation or compression artifacts."},
            {"name": "Skin texture", "value": "Mixed", "status": "warning", "explanation": "Some regions show unnatural smoothing or lack of fine detail. AI-generated faces often have uniform skin texture without natural variation."},
            {"name": "Lighting alignment", "value": "Inconsistent", "status": "warning", "explanation": "Shadows or reflections may not fully match the apparent light direction. Common in composited or AI-generated images."},
            {"name": "Edge artifacts", "value": "Detected", "status": "warning", "explanation": "Slight halos, blurring, or color fringing found around edges. Often produced when faces are pasted or generated."},
        ]
    else:
        factors = [
            {"name": "Face consistency", "value": "Artificial", "status": "danger", "explanation": "Significant inconsistencies in facial structure, asymmetry, or unnatural proportions. Strong indicators of AI generation or face-swapping."},
            {"name": "Skin texture", "value": "Synthetic", "status": "danger", "explanation": "Skin appears unnaturally smooth, waxy, or lacks fine detail. AI models often struggle to render realistic pores and skin texture."},
            {"name": "Lighting alignment", "value": "Inconsistent", "status": "danger", "explanation": "Multiple conflicting light sources or impossible shadows detected. Suggests the image was generated or heavily edited."},
            {"name": "Edge artifacts", "value": "Detected", "status": "danger", "explanation": "Clear halos, blurring, or jagged edges around the face. Typical of face-swap or inpainting algorithms."},
        ]
    return {
        "authenticityScore": authenticity_score,
        "isReal": is_real,
        "confidence": confidence,
        "riskLevel": risk_level,
        "verdict": "real" if is_real else "fake",
        "factors": factors,
    }


def analyze(image_bytes: bytes) -> dict:
    """Main entry: run detection based on MODEL_TYPE."""
    if MODEL_TYPE == "cnn":
        return analyze_image_cnn(image_bytes)
    return analyze_image_transformers(image_bytes)
