/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        ink: '#ffffff',
        accent: {
          DEFAULT: '#ff003c',
          light: '#ff6b85',
          dim: 'rgba(255,0,60,0.4)',
          glow: 'rgba(255,0,60,0.06)',
        },
        muted: {
          50: 'rgba(255,255,255,0.85)',
          100: 'rgba(255,255,255,0.7)',
          200: 'rgba(255,255,255,0.6)',
          300: 'rgba(255,255,255,0.5)',
          400: 'rgba(255,255,255,0.4)',
          500: 'rgba(255,255,255,0.3)',
          line: 'rgba(255,255,255,0.08)',
          card: 'rgba(255,255,255,0.03)',
          border: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'spin-rev': 'spin 12s linear infinite reverse',
        'spin-fast': 'spin 8s linear infinite',
        'pulse-core': 'pulseCore 2s ease-in-out infinite',
        'blink': 'blink 1.4s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite',
      },
      keyframes: {
        pulseCore: {
          '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
