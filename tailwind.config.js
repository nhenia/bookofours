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
        'vellum': '#f4f1ea',
        'iron-gall': '#2b2622',
      },
    },
  },
  plugins: [],
}
