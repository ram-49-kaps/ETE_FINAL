# Deployment Guide: Vercel & Hugging Face Spaces

This guide explains how to deploy your ASL Gesture Recognition application completely for free.

---

## 🚀 1. Deploy the Backend (Hugging Face Spaces)

Your model is 163MB, which means it needs specialized ML hosting. Hugging Face provides **16GB RAM for free** via their Spaces feature.

### Step 1: Create a Hugging Face Space
1. Go to [Hugging Face Spaces](https://huggingface.co/spaces) and log in/sign up.
2. Click **Create new Space**.
3. Fill in the details:
   - **Space name**: `asl-gesture-api` (or whatever you prefer)
   - **License**: Choose your license (e.g., `mit`)
   - **Select the Space SDK**: Choose **Docker** > **Blank**
4. Click **Create Space**.

### Step 2: Upload Your Files
In your new Space, you have a "Files and versions" tab. You need to upload **4 files**:

1. **Upload your model:** Drag and drop your `asl_model (1).h5` file.
2. **Upload `main.py`:** From your `Backend/` folder.
3. **Upload `requirements.txt`:** From your `Backend/` folder.
4. **Create a `Dockerfile`:** Click "Add file" -> "Create new file", name it `Dockerfile`, and paste this exact code:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your app code and model
COPY main.py .
COPY "asl_model (1).h5" .

# Expose port (HF Spaces uses 7860 by default)
EXPOSE 7860

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

### Step 3: Wait for Building
Once you commit the `Dockerfile`, Hugging Face will automatically start building your Docker container. 
- Watch the **Logs** tab. It will say "Running" when done.
- Your backend API URL will be: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`

*(Example: `https://ram-49-kaps-asl-gesture-api.hf.space`)*

---

## 🌐 2. Deploy the Frontend (Vercel)

Now that your backend is live, you need to point your frontend to it and deploy.

### Step 1: Update the API URL
In your project on your local laptop, open `src/utils/api.js`.

Change line 3:
```javascript
// Change this line:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// To your new Hugging Face Space URL:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space';
```
*(Make sure to use your actual HF Space URL!)*

Save the file, commit, and push to GitHub:
```bash
git add src/utils/api.js
git commit -m "Update API URL to Hugging Face Space"
git push
```

### Step 2: Deploy to Vercel
Since your code is already on GitHub (`ram-49-kaps/ETE_FINAL`), Vercel is one click away:

1. Go to [Vercel.com](https://vercel.com/) and log in with GitHub.
2. Click **Add New...** > **Project**.
3. Import your `ETE_FINAL` repository from GitHub.
4. Leave all build settings as default (Framework Preset: **Vite**).
5. Click **Deploy**.

In 30 seconds, Vercel will give you a live URL (e.g., `https://ete-final.vercel.app`).

---

## 🎉 Done!
Your frontend is now hosted globally on Vercel, securely communicating with your deep learning model hosted on Hugging Face Spaces!
