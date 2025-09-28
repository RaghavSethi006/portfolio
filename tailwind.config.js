/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
        blue: {
          950: '#172554',
        },
        slate: {
          900: '#0f172a',
          950: '#020617',
        }
      }
    },
  },
  plugins: [],
}