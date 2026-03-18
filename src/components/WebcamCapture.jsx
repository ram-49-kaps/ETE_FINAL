import { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 480,
  height: 360,
  facingMode: 'user',
};

export default function WebcamCapture({ onCapture, loading }) {
  const webcamRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const handleCapture = useCallback(() => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
          onCapture(file);
        });
    }
  }, [onCapture]);

  return (
    <div className="relative rounded-2xl overflow-hidden gradient-border">
      {/* Animated gradient bg behind the camera */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-surface-900 to-purple-950/30" />

      {/* Camera Feed */}
      <div className="relative aspect-[4/3] w-full">
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 z-10">
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20
                            flex items-center justify-center animate-bounce-subtle">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-red-400 font-semibold text-lg">Camera Unavailable</p>
              <p className="text-white/30 text-sm mt-1">Allow camera access or use the upload option</p>
            </div>
          </div>
        ) : (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={() => setIsCameraReady(true)}
              onUserMediaError={(err) => setCameraError(err.message || 'Camera access denied')}
              className="w-full h-full object-cover relative z-[1]"
              mirrored
            />

            {isCameraReady && (
              <div className="absolute inset-0 pointer-events-none z-[2]">
                {/* ===== Sweeping Scan Line ===== */}
                <div className="scan-line" />

                {/* ===== Corner Brackets (Neon glow) ===== */}
                <div className="absolute top-6 left-6 w-14 h-14">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-blue to-transparent" />
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-neon-blue to-transparent" />
                </div>
                <div className="absolute top-6 right-6 w-14 h-14">
                  <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-neon-blue to-transparent" />
                  <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-neon-blue to-transparent" />
                </div>
                <div className="absolute bottom-6 left-6 w-14 h-14">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-blue to-transparent" />
                  <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-neon-blue to-transparent" />
                </div>
                <div className="absolute bottom-6 right-6 w-14 h-14">
                  <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-neon-blue to-transparent" />
                  <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-neon-blue to-transparent" />
                </div>

                {/* ===== Live Indicator with pulse ===== */}
                <div className="absolute top-3 left-3 flex items-center gap-2
                                bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5
                                border border-white/10">
                  <span className="status-dot bg-red-500 text-red-500 animate-pulse" />
                  <span className="text-[11px] text-white/90 font-bold tracking-widest uppercase">Live</span>
                </div>

                {/* ===== FPS Counter style indicator ===== */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5
                                bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5
                                border border-white/10">
                  <svg className="w-3 h-3 text-neon-green" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="text-[11px] text-neon-green font-mono font-bold">AI READY</span>
                </div>

                {/* ===== Bottom info bar ===== */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                      <span>RES: 480×360</span>
                      <span className="text-white/20">|</span>
                      <span>JPG</span>
                    </div>
                    <div className="text-[10px] text-primary-400/60 font-mono">
                      ASL • GESTURE • DETECT
                    </div>
                  </div>
                </div>

                {/* ===== Vignette Effect ===== */}
                <div className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)'
                  }}
                />
              </div>
            )}

            {/* Loading camera */}
            {!isCameraReady && !cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-900/80 z-10 gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-primary-500/20 border-t-primary-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <span className="text-white/40 text-sm font-medium">Initializing Camera...</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Capture Button */}
      {isCameraReady && !cameraError && (
        <div className="relative p-4 flex justify-center z-10 bg-black/30 backdrop-blur-sm border-t border-white/[0.05]">
          <button
            id="capture-btn"
            onClick={handleCapture}
            disabled={loading}
            className="btn-primary flex items-center gap-3 text-base group"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                {/* Capture icon with ring */}
                <div className="relative">
                  <div className="w-6 h-6 rounded-full border-2 border-white/80 flex items-center justify-center
                                  group-hover:border-white transition-colors">
                    <div className="w-3 h-3 rounded-full bg-white/80 group-hover:bg-white
                                    group-hover:scale-90 transition-all" />
                  </div>
                </div>
                <span>Capture & Predict</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
