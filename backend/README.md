# Deepfake Guard Backend

ML-powered deepfake detection API using CNN (ResNet/EfficientNet) + face detection or Hugging Face transformers.

## Architecture

- **Face detection pipeline**: OpenCV Haar Cascade (can swap for MTCNN, RetinaFace)
- **CNN models**: ResNet18, EfficientNet-B0 (torchvision)
- **Datasets**: FaceForensics++, Celeb-DF (for training)
- **Framework**: PyTorch

## Quick Start (Pre-trained Model)

Uses Hugging Face model `dima806/deepfake_vs_real_image_detection` by default (works out of the box):

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python run.py
```

API: `POST /api/analyze` with multipart form file (image).

## Using CNN (ResNet/EfficientNet)

1. **Train** on FaceForensics++ or Celeb-DF:

```bash
# Organize data: dataset/train/real/, dataset/train/fake/
# dataset/val/real/, dataset/val/fake/
python train.py --data-dir dataset --epochs 50 --model resnet18 --output weights.pth
```

2. **Run API** with custom weights:

```bash
set MODEL_TYPE=cnn
set MODEL_WEIGHTS_PATH=weights.pth
python run.py
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| MODEL_TYPE | transformers | `transformers` or `cnn` |
| MODEL_WEIGHTS_PATH | (empty) | Path to .pth for CNN mode |
| HF_MODEL_ID | dima806/deepfake_vs_real_image_detection | Hugging Face model |
| API_HOST | 0.0.0.0 | Server host |
| API_PORT | 8000 | Server port |

## API Response

```json
{
  "authenticityScore": 0.92,
  "isReal": true,
  "confidence": 0.92,
  "riskLevel": "low",
  "verdict": "real",
  "factors": [
    {"name": "Face consistency", "value": "Natural", "status": "success"},
    ...
  ]
}
```
