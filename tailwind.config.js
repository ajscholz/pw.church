const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  media: false,
  theme: {
    colors: {
      ...colors,
      current: "currentColor",
      transparent: "transparent",
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
      spacing: {
        full: "100%",
        "16/9": "56.25%",
        "16/10": "62.5%",
        "3/4": "75%",
        "4/5": "80%",
        128: "32rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
}
