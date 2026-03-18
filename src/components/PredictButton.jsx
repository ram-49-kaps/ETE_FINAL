export default function PredictButton({ onClick, disabled, loading }) {
  return (
    <button
      id="predict-btn"
      onClick={onClick}
      disabled={disabled || loading}
      className="btn-primary w-full flex items-center justify-center gap-3 text-base py-4 group"
    >
      {loading ? (
        <>
          {/* Animated spinner with inner icon */}
          <div className="relative">
            <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
          <span className="animate-pulse">Analyzing Gesture...</span>
        </>
      ) : (
        <>
          {/* AI Brain icon */}
          <div className="relative">
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {/* Glow behind icon */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0
                            group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
          <span className="tracking-wide">Predict Gesture</span>
          {/* Arrow that slides in on hover */}
          <svg className="w-4 h-4 -ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                          transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </>
      )}
    </button>
  );
}
