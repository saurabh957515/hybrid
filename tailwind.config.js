/**
 * @format
 */

module.exports = {
  darkMode: "class",
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        BookBlue: {
          400: "#36A2EB",
        },
        BookGreen: {
          400: "#4BC0C0",
        },
        BookRed: {
          400: "#FF5733",
        },
        BookYellow: {
          400: "#FFCD56",
        },
        BookOrange: {
          400: "#F1AFE6",
        },
      },
    },
  },
  plugins: [],
};
