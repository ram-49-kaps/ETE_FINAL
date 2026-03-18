/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        },
        neon: {
          blue: '#00d4ff',
          purple: '#a855f7',
          pink: '#ec4899',
          green: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'progress': 'progressFill 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scan': 'scanLine 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'letter-float-1': 'letterFloat1 12s ease-in-out infinite',
        'letter-float-2': 'letterFloat2 15s ease-in-out infinite',
        'letter-float-3': 'letterFloat3 10s ease-in-out infinite',
        'letter-float-4': 'letterFloat4 14s ease-in-out infinite',
        'letter-float-5': 'letterFloat5 11s ease-in-out infinite',
        'ripple': 'ripple 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(99, 102, 241, 0.6), 0 0 100px rgba(99, 102, 241, 0.2)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        scanLine: {
          '0%': { top: '10%', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { top: '85%', opacity: '1' },
          '60%': { opacity: '1' },
          '90%': { top: '10%', opacity: '1' },
          '100%': { top: '10%', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(99, 102, 241, 0.2)' },
          '50%': { borderColor: 'rgba(99, 102, 241, 0.5)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        letterFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.06' },
          '25%': { transform: 'translate(10px, -30px) rotate(5deg)', opacity: '0.1' },
          '50%': { transform: 'translate(-5px, -15px) rotate(-3deg)', opacity: '0.06' },
          '75%': { transform: 'translate(15px, -25px) rotate(8deg)', opacity: '0.1' },
        },
        letterFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.05' },
          '33%': { transform: 'translate(-20px, -20px) rotate(-8deg)', opacity: '0.09' },
          '66%': { transform: 'translate(10px, -35px) rotate(5deg)', opacity: '0.05' },
        },
        letterFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.07' },
          '50%': { transform: 'translate(20px, -20px) rotate(10deg)', opacity: '0.12' },
        },
        letterFloat4: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.04' },
          '40%': { transform: 'translate(-15px, -25px) rotate(-6deg)', opacity: '0.08' },
          '80%': { transform: 'translate(5px, -10px) rotate(3deg)', opacity: '0.04' },
        },
        letterFloat5: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.06' },
          '30%': { transform: 'translate(25px, -15px) rotate(12deg)', opacity: '0.1' },
          '70%': { transform: 'translate(-10px, -30px) rotate(-5deg)', opacity: '0.06' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
