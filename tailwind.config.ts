const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class", // Important!
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2da44e", // GitHub green button
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#57606a", // GitHub secondary button
          foreground: "#ffffff",
        },
        background: {
          light: "#ffffff", // GitHub light
          dark: "#0d1117", // GitHub dark
        },
        surface: {
          light: "#f6f8fa", // GitHub light bg
          dark: "#161b22", // GitHub dark bg
        },
        border: {
          light: "#d0d7de",
          dark: "#30363d",
        },
        text: {
          light: "#1f2328", // GitHub text
          dark: "#c9d1d9",
        },
      },
    },
  },
  plugins: [],
};
