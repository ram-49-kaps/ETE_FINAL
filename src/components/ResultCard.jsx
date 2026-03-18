export default function ResultCard({ result }) {
  if (!result) return null;

  const { label, confidence } = result;
  const confidencePercent = Math.round(confidence * 100);
  const isUnknown = label === 'UNKNOWN' || confidencePercent < 60;

  const getConfidenceColor = (pct) => {
    if (pct >= 90) return { bar: 'from-emerald-500 to-emerald-400', text: 'text-emerald-400', label: 'Excellent' };
    if (pct >= 75) return { bar: 'from-primary-500 to-primary-400', text: 'text-primary-400', label: 'Good' };
    if (pct >= 60) return { bar: 'from-amber-500 to-amber-400', text: 'text-amber-400', label: 'Fair' };
    return { bar: 'from-red-500 to-red-400', text: 'text-red-400', label: 'Low' };
  };

  const colors = getConfidenceColor(confidencePercent);

  return (
    <div id="result-card" className="animate-slide-up">
      <div className="gradient-border p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${isUnknown ? 'bg-amber-400' : 'bg-emerald-400'}`}
                 style={{ boxShadow: `0 0 8px ${isUnknown ? 'rgb(251, 191, 36)' : 'rgb(52, 211, 153)'}` }} />
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-[0.15em]">
              Prediction Result
            </h3>
          </div>
          <div className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md
                          ${isUnknown
                            ? 'text-amber-400/70 bg-amber-400/[0.08] border border-amber-400/10'
                            : 'text-emerald-400/70 bg-emerald-400/[0.08] border border-emerald-400/10'
                          }`}>
            {isUnknown ? 'UNCERTAIN' : 'MATCHED'}
          </div>
        </div>

        {isUnknown ? (
          /* === Unknown / Low Confidence State === */
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20
                              flex items-center justify-center neon-ring animate-bounce-subtle"
                   style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.15), inset 0 0 20px rgba(245, 158, 11, 0.05)' }}>
                <span className="text-6xl font-black text-amber-400/80">?</span>
              </div>
              {/* Warning badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full
                              bg-amber-500/20 border border-amber-500/30
                              flex items-center justify-center animate-bounce-subtle">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            <div className="text-center space-y-1.5">
              <p className="text-amber-300 font-bold text-lg">Gesture Not Recognized</p>
              <p className="text-white/25 text-sm leading-relaxed">
                Low confidence score — try a clearer image or gesture
              </p>
            </div>

            {confidencePercent > 0 && (
              <div className="w-full mt-1">
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="text-white/25 font-medium">Confidence</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${colors.text} opacity-60`}>{colors.label}</span>
                    <span className={`font-bold font-mono ${colors.text}`}>{confidencePercent}%</span>
                  </div>
                </div>
                <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.04]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colors.bar} animate-progress`}
                    style={{ '--progress-width': `${confidencePercent}%`, width: `${confidencePercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* === Valid Prediction State === */
          <div className="flex flex-col items-center gap-6">
            {/* Predicted Letter — hero element */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-3xl opacity-30 animate-pulse-glow"
                   style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%)' }} />

              <div className="relative w-32 h-32 rounded-2xl
                              bg-gradient-to-br from-primary-500/[0.12] via-purple-500/[0.08] to-neon-blue/[0.06]
                              border border-primary-400/20 flex items-center justify-center
                              neon-ring">
                <span className="text-7xl font-black glow-text drop-shadow-2xl">{label}</span>
              </div>

              {/* Success badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full
                              bg-emerald-500 flex items-center justify-center
                              shadow-lg animate-scale-in"
                   style={{ boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)' }}>
                <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Label text */}
            <div className="text-center space-y-1">
              <p className="text-white/50 text-sm">Predicted ASL Letter</p>
              <p className="text-2xl font-bold text-white tracking-wide">{label}</p>
            </div>

            {/* Confidence Bar */}
            <div className="w-full">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="text-white/25 font-medium">Confidence Score</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono ${colors.text} opacity-60 uppercase tracking-wider`}>{colors.label}</span>
                  <span className={`font-bold font-mono text-sm ${colors.text}`}>{confidencePercent}%</span>
                </div>
              </div>
              <div className="relative h-3 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.04]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${colors.bar} animate-progress relative`}
                  style={{ '--progress-width': `${confidencePercent}%`, width: `${confidencePercent}%` }}
                >
                  {/* Shimmer on the bar */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
