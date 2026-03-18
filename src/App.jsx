import { useState, useCallback } from 'react';
import UploadArea from './components/UploadArea';
import WebcamCapture from './components/WebcamCapture';
import ResultCard from './components/ResultCard';
import PredictButton from './components/PredictButton';
import ErrorMessage from './components/ErrorMessage';
import { predictImage } from './utils/api';

const MODES = { UPLOAD: 'upload', WEBCAM: 'webcam' };

// Floating background ASL letters
const FLOATING_LETTERS = [
  { letter: 'A', style: 'top-[8%] left-[5%]', animation: 'animate-letter-float-1' },
  { letter: 'B', style: 'top-[15%] right-[8%]', animation: 'animate-letter-float-2' },
  { letter: 'C', style: 'top-[45%] left-[3%]', animation: 'animate-letter-float-3' },
  { letter: 'D', style: 'bottom-[20%] right-[5%]', animation: 'animate-letter-float-4' },
  { letter: 'E', style: 'bottom-[10%] left-[10%]', animation: 'animate-letter-float-5' },
  { letter: 'F', style: 'top-[60%] right-[3%]', animation: 'animate-letter-float-1' },
  { letter: 'G', style: 'top-[30%] left-[8%]', animation: 'animate-letter-float-4' },
  { letter: 'H', style: 'bottom-[35%] right-[10%]', animation: 'animate-letter-float-2' },
];

export default function App() {
  const [mode, setMode] = useState(MODES.UPLOAD);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = useCallback((selectedFile) => {
    setResult(null);
    setError(null);

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  }, []);

  const handlePredict = useCallback(async () => {
    if (!file) {
      setError('Please upload an image first before predicting.');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await predictImage(file);
      setResult(data);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to get prediction. Please ensure the backend server is running.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleWebcamCapture = useCallback(async (capturedFile) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await predictImage(capturedFile);
      setResult(data);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to get prediction. Please ensure the backend server is running.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setResult(null);
    setError(null);
    if (newMode === MODES.WEBCAM) {
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* ===== Floating ASL Letters Background ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {FLOATING_LETTERS.map(({ letter, style, animation }) => (
          <span
            key={letter}
            className={`absolute text-7xl sm:text-8xl font-black text-white/[0.04] ${style} ${animation}`}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* ===== Ambient light blobs ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-500/[0.07] rounded-full blur-[120px] animate-float" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/[0.06] rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-neon-blue/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="relative w-full max-w-xl z-10">
        {/* ===== Header ===== */}
        <div className="text-center mb-10 animate-slide-up">
          {/* Logo Icon */}
          <div className="inline-flex items-center justify-center w-18 h-18 rounded-2xl mb-6 relative group">
            {/* Glow behind logo */}
            <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-xl group-hover:bg-primary-500/30 transition-all duration-500" />
            <div className="relative w-16 h-16 rounded-2xl glass-card flex items-center justify-center
                            border-primary-400/20 hover:border-primary-400/40 transition-all duration-500
                            hover:scale-105">
              <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-tight">
            <span className="glow-text">ASL Gesture</span>
            <br className="sm:hidden" />
            <span className="text-white"> Recognition</span>
          </h1>

          <p className="text-white/25 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
            Upload an image or use your webcam to recognize
            <span className="text-primary-400/50"> American Sign Language </span>
            gestures in real-time
          </p>

          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary-400/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400/40" />
            <div className="w-16 h-px bg-primary-400/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400/40" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary-400/30" />
          </div>
        </div>

        {/* ===== Main Card ===== */}
        <div className="glass-card p-6 sm:p-8 space-y-6 animate-slide-up"
             style={{ animationDelay: '0.1s' }}>

          {/* Mode Toggle Tabs */}
          <div className="flex rounded-xl bg-white/[0.03] border border-white/[0.06] p-1 gap-1">
            {[
              { key: MODES.UPLOAD, label: 'Upload', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )},
              { key: MODES.WEBCAM, label: 'Webcam', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )},
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                id={`tab-${key}`}
                onClick={() => handleModeSwitch(key)}
                className={`
                  flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-lg text-sm font-semibold
                  transition-all duration-400 relative overflow-hidden
                  ${mode === key
                    ? 'bg-primary-500/15 text-primary-300 shadow-lg shadow-primary-500/10'
                    : 'text-white/35 hover:text-white/55 hover:bg-white/[0.02]'
                  }
                `}
              >
                {/* Active indicator line */}
                {mode === key && (
                  <div className="absolute bottom-0 left-[20%] right-[20%] h-[2px]
                                  bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
                )}
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="transition-all duration-300">
            {mode === MODES.UPLOAD ? (
              <div className="space-y-5 animate-fade-in">
                <UploadArea onFileSelect={handleFileSelect} preview={preview} />
                <PredictButton
                  onClick={handlePredict}
                  disabled={!file}
                  loading={loading}
                />
              </div>
            ) : (
              <div className="animate-fade-in">
                <WebcamCapture onCapture={handleWebcamCapture} loading={loading} />
              </div>
            )}
          </div>

          {/* Error */}
          <ErrorMessage message={error} onDismiss={() => setError(null)} />

          {/* Result */}
          <ResultCard result={result} />
        </div>

        {/* ===== Footer ===== */}
        <div className="text-center mt-8 space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-center gap-3 text-[11px] text-white/15 font-mono">
            <span>REACT</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>VITE</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>TAILWIND</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>FASTAPI</span>
          </div>
          <p className="text-white/10 text-xs">
            ASL Gesture Recognition System • Deep Learning Powered
          </p>
        </div>
      </div>
    </div>
  );
}
