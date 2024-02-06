/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        celeriterBlue: {
          400: "#36A2EB",
        },
        celeriterGreen: {
          400: "#4BC0C0",
        },
        celeriterRed: {
          400: "#FF5733",
        },
        celeriterYellow: {
          400: "#FFCD56",
        },
        celeriterOrange: {
          400: "#F1AFE6",
        },
      },
    },
  },
  plugins: [],
};
