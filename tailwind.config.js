/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        light: "rgb(255, 255, 255)",
        medium: "rgb(100 100 100)",
        dark: "rgb(0, 0, 0)",
        accent: "theme(colors.sky.400)",
        "accent-dark": "theme(colors.blue.900)",
        "accent-light": "theme(colors.blue.100)",
        warning: "theme(colors.orange.300)",
        danger: "theme(colors.red.500)"
      },
      backgroundImage: {
        "gradient-instagram": "linear-gradient(45deg, #ffc000, #fa7e1e, #d62976, #d300c5)"
      },
      screens: {
        xs: "300px"
      }
    },
  },
  plugins: [],
}
