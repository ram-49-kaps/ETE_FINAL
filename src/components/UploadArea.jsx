import { useState, useRef, useCallback } from 'react';

export default function UploadArea({ onFileSelect, preview }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      id="upload-area"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer rounded-2xl border-2 border-dashed
        transition-all duration-500 ease-out overflow-hidden
        ${isDragOver
          ? 'border-neon-blue bg-neon-blue/[0.06] scale-[1.02] shadow-[0_0_40px_rgba(0,212,255,0.15)]'
          : preview
            ? 'border-primary-500/30 bg-white/[0.02]'
            : 'border-white/[0.1] bg-white/[0.02] hover:border-primary-400/40 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]'
        }
        min-h-[280px] flex items-center justify-center
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />

      {/* Background grid pattern */}
      {!preview && (
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      )}

      {preview ? (
        <div className="relative w-full h-full p-4 animate-scale-in">
          {/* Image with subtle border glow */}
          <div className="relative rounded-xl overflow-hidden group/img">
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full max-h-[300px] object-contain rounded-xl"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-300 rounded-xl flex items-center justify-center">
              <span className="text-white/0 group-hover/img:text-white/80 text-sm font-medium transition-all duration-300">
                Click to replace
              </span>
            </div>
          </div>

          {/* Remove button */}
          <button
            onClick={handleRemove}
            className="absolute top-6 right-6 w-9 h-9 bg-red-500/80 hover:bg-red-500
                       rounded-xl flex items-center justify-center text-white
                       transition-all duration-300 hover:scale-110 hover:rotate-90
                       backdrop-blur-sm shadow-lg shadow-red-500/20 z-10"
            title="Remove image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* File info badge */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2
                          bg-black/60 backdrop-blur-md rounded-lg px-3 py-1.5
                          border border-white/10 z-10">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[11px] text-white/60 font-medium">Image loaded</span>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center gap-5 p-8 z-10">
          {/* Upload Icon with animated ring */}
          <div className="relative">
            <div className={`
              w-20 h-20 rounded-2xl flex items-center justify-center
              transition-all duration-500
              ${isDragOver
                ? 'bg-neon-blue/20 scale-110 rotate-3'
                : 'bg-white/[0.04] group-hover:bg-primary-500/10 group-hover:scale-105'
              }
            `}>
              <svg
                className={`w-10 h-10 transition-all duration-500 ${
                  isDragOver ? 'text-neon-blue scale-110' : 'text-white/25 group-hover:text-primary-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            {/* Orbiting dot */}
            <div className={`absolute -inset-2 rounded-2xl border border-dashed transition-all duration-500 ${
              isDragOver ? 'border-neon-blue/40 animate-spin-slow' : 'border-transparent'
            }`} />
          </div>

          <div className="text-center space-y-1.5">
            <p className={`font-semibold text-lg transition-colors duration-300 ${
              isDragOver ? 'text-neon-blue' : 'text-white/60 group-hover:text-white/80'
            }`}>
              {isDragOver ? 'Release to upload!' : 'Drag & drop your gesture image'}
            </p>
            <p className="text-white/25 text-sm">
              or <span className="text-primary-400/70 underline underline-offset-2 decoration-primary-400/30">browse files</span>
            </p>
          </div>

          {/* File type badges */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]
                             text-[11px] text-white/30 font-mono font-medium tracking-wider
                             group-hover:border-primary-400/20 group-hover:text-primary-400/50 transition-all duration-300">
              .JPG
            </span>
            <span className="text-white/10">•</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]
                             text-[11px] text-white/30 font-mono font-medium tracking-wider
                             group-hover:border-primary-400/20 group-hover:text-primary-400/50 transition-all duration-300">
              .PNG
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
