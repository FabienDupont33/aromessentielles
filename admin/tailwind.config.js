/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A8D5BA",
        secondary: "#B5DFF8",
        background: "#F7F9F9",
        accent: "#FAF3E0",
        text: "#6B7280",
      },
      fontFamily: {
        sans: ['"Quicksand"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
