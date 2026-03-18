# ASL Gesture Recognition System

A modern, full-stack American Sign Language (ASL) gesture recognition web application. 

**Live Demo:** [https://ete-final.vercel.app/](https://ete-final.vercel.app/)

## 🚀 Architecture & Deployment

This project uses a decoupled architecture, completely hosted for free:

### 1. Frontend (Deployed on Vercel)
- **Framework**: React.js (Vite) + Tailwind CSS 3.4.17
- **Features**: 
  - Drag-and-drop Image Upload
  - Real-time Webcam capture with target reticle
  - Premium Dark UI (Glassmorphism, animations)
- **Live URL**: `https://ete-final.vercel.app/`

### 2. Backend API (Deployed on Hugging Face Spaces)
- **Framework**: FastAPI (Python)
- **AI Model**: TensorFlow/Keras CNN (`asl_model.h5`) predicting 29 ASL classes.
- **Hosting**: Deployed via Docker container on Hugging Face Spaces (16GB RAM) to accommodate the 163MB model footprint.
- **Live URL**: `https://ram49k-asl-gesture.hf.space`

---

## 🛠️ Local Development

### Frontend
```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

### Backend
*(Note: requires the 163MB `asl_model (1).h5` file inside the `Backend/` folder)*
```bash
cd Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
