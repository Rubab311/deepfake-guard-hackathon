"""
Face detection pipeline for deepfake analysis.
Extracts face regions for CNN-based detection (ResNet/EfficientNet).
Uses OpenCV Haar Cascade - can be swapped for MTCNN, RetinaFace, etc.
"""

import cv2
import numpy as np
from pathlib import Path

# Haar cascade path (bundled with OpenCV)
CASCADE_PATH = Path(cv2.data.haarcascades) / "haarcascade_frontalface_default.xml"


def load_cascade():
    """Load face detection cascade."""
    return cv2.CascadeClassifier(str(CASCADE_PATH))


def detect_faces(image, scale_factor=1.1, min_neighbors=5):
    """
    Detect faces in image. Returns list of (x, y, w, h) bounding boxes.
    """
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    else:
        gray = image
    cascade = load_cascade()
    faces = cascade.detectMultiScale(gray, scaleFactor=scale_factor, minNeighbors=min_neighbors)
    return [(int(x), int(y), int(w), int(h)) for (x, y, w, h) in faces]


def crop_largest_face(image, target_size=224):
    """
    Crop the largest detected face and resize to target_size.
    Returns None if no face detected - caller can fall back to center crop.
    """
    faces = detect_faces(image)
    if not faces:
        return None
    x, y, w, h = max(faces, key=lambda r: r[2] * r[3])
    margin = int(0.2 * max(w, h))
    x1 = max(0, x - margin)
    y1 = max(0, y - margin)
    x2 = min(image.shape[1], x + w + margin)
    y2 = min(image.shape[0], y + h + margin)
    face_crop = image[y1:y2, x1:x2]
    if face_crop.size == 0:
        return None
    face_resized = cv2.resize(face_crop, (target_size, target_size))
    return face_resized


def center_crop(image, target_size=224):
    """Fallback: center crop when no face is detected."""
    h, w = image.shape[:2]
    s = min(h, w)
    y = (h - s) // 2
    x = (w - s) // 2
    crop = image[y : y + s, x : x + s]
    return cv2.resize(crop, (target_size, target_size))
