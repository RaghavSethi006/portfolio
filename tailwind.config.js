/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          900: '#0B1428',
          800: '#0E1A34',
          700: '#13213F',
          600: '#1A2744',
          500: '#1E2D4D',
          400: '#2A3A5A',
          300: '#4A5568',
          200: '#7A8EAB',
          100: '#8BA3C7',
        },
        platinum: {
          900: '#0B1428',
          800: '#0E1A34',
          700: '#13213F',
          600: '#1A2744',
          500: '#1E2D4D',
          400: '#2A3A5A',
          300: '#4A5568',
          200: '#7A8EAB',
          100: '#8BA3C7',
          50: '#CAD4E4',
          25: '#EEF2F9',
        },
        gold: '#B8960C',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(184, 150, 12, 0.3)' },
          '100%': { boxShadow: '0 0 24px rgba(184, 150, 12, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
