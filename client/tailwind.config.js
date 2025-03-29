/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#13131a",
        "primary-bg": "#1c1c24",
        "secondary-bg": "#2c2f32",
        "placeholder-text": "#4b5264",
        "green-bg": "#4acd8d",
        "green-bg-hover": "#2f9c67",
      },
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
