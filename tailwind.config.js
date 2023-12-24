/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        light: "rgb(255, 255, 255)",
        medium: "rgb(100 100 100)",
        dark: "rgb(0, 0, 0)",
        accent: "theme(colors.sky.400)"
      },
      screens: {
        xs: "300px"
      }
    },
  },
  plugins: [],
}
