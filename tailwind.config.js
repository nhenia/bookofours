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
      colors: {
        vellum: 'var(--color-vellum)',
        'iron-gall': 'var(--color-iron-gall)'
      },
    },
  },
  plugins: [],
}
