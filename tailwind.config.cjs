/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#8338ec",
        secondary: "#3a86ff",
        tertiary: "#eabe2b",
        quaternary: "#ff006e",
        quinary: "#fb5607"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'tajawal': ['Tajawal', 'sans-serif']
      },
    },
  },
  plugins: [],
}