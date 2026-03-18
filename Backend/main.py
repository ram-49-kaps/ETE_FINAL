"""
ASL Gesture Recognition — FastAPI Backend
==========================================
Serves a trained Keras model (asl_model.h5) for American Sign Language
letter prediction via image upload or webcam capture.
"""

import io
import logging

import numpy as np
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# ─── Logging ────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("asl-backend")

# ─── App Setup ──────────────────────────────────────────────────────────
app = FastAPI(
    title="ASL Gesture Recognition API",
    description="Predict American Sign Language letters from images using a CNN model.",
    version="1.0.0",
)

# ─── CORS (allow the Vite frontend + any origin) ───────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Constants ──────────────────────────────────────────────────────────
MODEL_PATH = "asl_model (1).h5"
IMAGE_SIZE = (200, 200)
CONFIDENCE_THRESHOLD = 0.6

# ASL alphabet labels — 29 classes (A-Z + del, nothing, space)
# Sorted alphabetically to match typical Keras ImageDataGenerator class ordering
CLASS_LABELS = [
    "A", "B", "C", "D", "del", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "nothing", "O", "P", "Q", "R",
    "S", "space", "T", "U", "V", "W", "X", "Y", "Z",
]

# ─── Global model reference ────────────────────────────────────────────
model = None


# ─── Startup: Load Model ───────────────────────────────────────────────
@app.on_event("startup")
async def load_model():
    """Load the Keras model into memory at server startup."""
    global model
    try:
        import tensorflow as tf
        logger.info(f"Loading model from {MODEL_PATH} ...")
        model = tf.keras.models.load_model(MODEL_PATH)
        logger.info("✅ Model loaded successfully!")
        logger.info(f"   Input shape : {model.input_shape}")
        logger.info(f"   Output shape: {model.output_shape}")
    except Exception as e:
        logger.error(f"❌ Failed to load model: {e}")
        raise RuntimeError(f"Could not load model: {e}")


# ─── Helpers ────────────────────────────────────────────────────────────
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/jpg", "image/webp"}


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Convert raw image bytes to the format expected by the model.
    - Resize to IMAGE_SIZE
    - Normalize pixel values to [0, 1]
    - Expand to batch dimension
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(IMAGE_SIZE)
    img_array = np.array(image, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # (1, 200, 200, 3)
    return img_array


def run_prediction(img_array: np.ndarray) -> dict:
    """
    Run model prediction and return the result dict.
    Applies confidence thresholding.
    """
    predictions = model.predict(img_array, verbose=0)
    predicted_index = int(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0]))

    if confidence < CONFIDENCE_THRESHOLD:
        label = "UNKNOWN"
    else:
        label = CLASS_LABELS[predicted_index] if predicted_index < len(CLASS_LABELS) else "UNKNOWN"

    logger.info(f"Prediction: {label} | Confidence: {confidence:.4f} (index={predicted_index})")

    return {
        "label": label,
        "confidence": round(confidence, 4),
    }


# ─── Routes ─────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    """Root endpoint — basic info."""
    return {
        "service": "ASL Gesture Recognition API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "predict": "POST /predict",
            "health": "GET /health",
        },
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict ASL gesture from an uploaded image.

    - Accepts: JPEG, PNG, WebP images
    - Returns: { label: string, confidence: float }
    """
    # Validate model is loaded
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please try again later.")

    # Validate file type
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: {file.content_type}. Accepted: JPEG, PNG, WebP.",
        )

    try:
        # Read and preprocess
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        img_array = preprocess_image(image_bytes)
        result = run_prediction(img_array)

        return JSONResponse(content=result)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


# ─── Main (for direct execution) ───────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
