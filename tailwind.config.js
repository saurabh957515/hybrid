/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundLight: 'hsl(var(200), 100%, 16%)',
      },
    },
  },
  plugins: [],
};

