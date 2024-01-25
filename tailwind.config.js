/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        light: "rgb(255, 255, 255)",
        medium: "rgb(100, 100, 100)",
        "medium-light": "rgb(239, 239, 239)",
        "medium-dark": "rgb(54, 54, 54)",
        dark: "rgb(0, 0, 0)",
        accent: "rgb(0, 149, 246)",
        "accent-light": "rgb(224, 241, 255)",
        "accent-dark": "rgb(0, 55, 107)",
        warning: "theme(colors.orange.500)",
        success: "theme(colors.green.500)",
        danger: "theme(colors.red.600)"
      },
      backgroundImage: {
        "gradient-instagram": "linear-gradient(45deg, #ffc000, #fa7e1e, #d62976, #d300c5)"
      },
      borderRadius: {
        shape: "theme(borderRadius.md)"
      },
      screens: {
        xs: "300px"
      }
    },
  },
  plugins: [],
}
