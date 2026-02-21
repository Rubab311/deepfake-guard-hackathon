# Deepfake Guard – Project Structure

Frontend and backend are separate. Do not modify `node_modules` or backend virtual env.

```
deepfake-guard/
├── frontend/                 # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── api/              # API client (analyze.js)
│   │   ├── components/
│   │   │   ├── analysis/     # VerdictCard, ScoreCard, RiskMeter, Breakdown
│   │   │   ├── common/       # Badge, Button, Loader
│   │   │   ├── landing/      # Hero, About, Features, CTASection, ContactSection, ResourcesStrip
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   ├── routing/      # Link
│   │   │   └── upload/       # UploadBox, CameraCapture
│   │   ├── context/          # ThemeContext, RouterContext, AnalysisContext
│   │   ├── hooks/            # useImageAnalysis
│   │   ├── pages/            # Home, Analyze, About, FAQ, CyberRules, HelpGuide
│   │   ├── utils/            # mockAnalysis, helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                  # Python FastAPI + PyTorch
│   ├── app/
│   │   ├── main.py           # FastAPI app, /api/analyze
│   │   ├── config.py         # Env and model settings
│   │   ├── detector.py       # Orchestrates transformers vs CNN
│   │   ├── cnn_detector.py   # ResNet/EfficientNet + face pipeline
│   │   ├── face_detector.py  # OpenCV face detection
│   │   └── __init__.py
│   ├── run.py                # Entry: uvicorn app.main:app
│   ├── train.py              # Train ResNet/EfficientNet on dataset
│   ├── requirements.txt
│   └── README.md
│
├── README.md
└── STRUCTURE.md              # This file
```

## Running

- **Frontend:** `cd frontend && npm install && npm run dev`
- **Backend:** `cd backend && pip install -r requirements.txt && python run.py`
