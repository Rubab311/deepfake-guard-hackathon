"""Configuration for deepfake detection API."""

import os

# API
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))

# Model settings
# Use "cnn" for ResNet/EfficientNet (requires trained weights), "transformers" for HF model
MODEL_TYPE = os.getenv("MODEL_TYPE", "transformers")

# Path to custom CNN weights (ResNet/EfficientNet trained on FaceForensics++/Celeb-DF)
# Set MODEL_WEIGHTS_PATH to use your trained .pth file
MODEL_WEIGHTS_PATH = os.getenv("MODEL_WEIGHTS_PATH", "")

# Hugging Face model for transformers mode
HF_MODEL_ID = os.getenv("HF_MODEL_ID", "dima806/deepfake_vs_real_image_detection")

# Conservative threshold: require this probability to classify as REAL.
# Higher = stricter (more images flagged as fake). 0.65 = need 65%+ confidence to say real.
# Model author recommends being conservative with newer AI-generated images.
REAL_THRESHOLD = float(os.getenv("REAL_THRESHOLD", "0.65"))

# Allowed image settings
MAX_IMAGE_SIZE = 224  # ResNet/EfficientNet standard input
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
