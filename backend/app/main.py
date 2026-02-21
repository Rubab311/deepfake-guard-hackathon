"""
Deepfake Guard API - ML-powered image analysis.
Uses CNN (ResNet/EfficientNet) + face detection or Hugging Face transformers.
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .detector import analyze
from .config import ALLOWED_EXTENSIONS

app = FastAPI(
    title="Deepfake Guard API",
    description="AI-powered deepfake detection using CNN (ResNet/EfficientNet) + face detection or transformers.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _check_extension(filename: str) -> bool:
    ext = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    return ext in ALLOWED_EXTENSIONS


@app.get("/health")
def health():
    return {"status": "ok", "message": "Deepfake Guard API is running"}


@app.post("/api/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image (JPEG, PNG, WebP)")
    if not _check_extension(file.filename or ""):
        raise HTTPException(400, f"Unsupported format. Allowed: {', '.join(ALLOWED_EXTENSIONS)}")

    try:
        content = await file.read()
        if len(content) > 10 * 1024 * 1024:  # 10 MB
            raise HTTPException(400, "Image too large (max 10MB)")
        result = analyze(content)
        return result
    except Exception as e:
        raise HTTPException(500, str(e))
