/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bastarda': ['"Pirata One"', 'cursive'],
        'serif': ['"MedievalSharp"', 'serif'],
      },
      animation: {
        'creep': 'creep 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        creep: {
          '0%': { transform: 'translate(-50%, -50%) translateX(-20px)' },
          '50%': { transform: 'translate(-50%, -50%) translateX(20px)' },
          '100%': { transform: 'translate(-50%, -50%) translateX(-20px)' },
        }
      },
      colors: {
        'vellum': '#f4f1ea',
        'iron-gall': '#2b2622',
      },
    },
  },
  plugins: [],
}
