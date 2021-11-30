const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      green: {
        50: "#fafcf6",
        100: "#f4faed",
        200: "#e4f2d2",
        300: "#d4ebb7",
        400: "#b4db82",
        500: "#94cc4c",
        600: "#85b844",
        700: "#6f9939",
        800: "#597a2e",
        900: "#496425",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
