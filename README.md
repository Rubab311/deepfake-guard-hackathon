# Deepfake Guard

AI-powered deepfake detection using CNN (ResNet/EfficientNet) + face detection pipeline, trained on FaceForensics++ / Celeb-DF style datasets.

## Project layout

- **`frontend/`** – React + Vite + Tailwind app (UI, pages, components). Do not change `node_modules`.
- **`backend/`** – Python FastAPI + PyTorch API (detection, face pipeline, training script).

See [STRUCTURE.md](STRUCTURE.md) for folder and file breakdown.

## Architecture

- **Frontend**: React + Vite + Tailwind
- **Backend**: FastAPI + PyTorch
- **Models**: ResNet18, EfficientNet-B0 (CNN) or Hugging Face transformers
- **Face detection**: OpenCV Haar Cascade

## Quick Start

### 1. Backend (Python)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python run.py
```

Runs on http://localhost:8000. Uses pre-trained Hugging Face model by default.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173. Set `VITE_USE_REAL_API=true` (default) to use the backend API.

## CNN Mode (ResNet/EfficientNet)

To use your own trained weights:

1. **Train** on FaceForensics++ or Celeb-DF:

```bash
cd backend
# Organize: dataset/train/real/, dataset/train/fake/
python train.py --data-dir dataset --epochs 50 --model resnet18 --output weights.pth
```

2. **Run** with CNN:

```bash
set MODEL_TYPE=cnn
set MODEL_WEIGHTS_PATH=weights.pth
python run.py
```

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| MODEL_TYPE | transformers | `transformers` or `cnn` |
| MODEL_WEIGHTS_PATH | - | Path to .pth for CNN |
| VITE_API_URL | http://localhost:8000 | Backend URL |
| VITE_USE_REAL_API | true | Use real API vs mock |
