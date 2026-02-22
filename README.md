# Deepfake Guard

AI-powered deepfake detection using CNN (ResNet/EfficientNet) + face detection pipeline, trained on FaceForensics++ / Celeb-DF style datasets built with CNNs, transformer models, and a clean web interface.

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

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
