/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-900": "#0a0a0a",
        "dark-800": "#0d0d0d",
        "dark-700": "#101010",
        "dark-600": "#131313",
        "dark-500": "#161616",
        "dark-400": "#191919",
        "dark-300": "#1c1c1c",
        "dark-200": "#1f1f1f",
        "dark-100": "#222222",
        "light-900": "#fafafa",
        "light-800": "#e6e6e6",
        "light-700": "#d2d2d2",
        "light-600": "#bebebe",
        "light-500": "#a0a0a0",
      }
    },
    fontFamily: {
      "sans": ["Poppins", ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [],
}