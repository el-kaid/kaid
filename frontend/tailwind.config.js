/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        darkBackground: '#0D0D1A',
        purpleStart: '#8A00FF',
        purpleEnd: '#FF00FF',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(to right, #8A00FF, #FF00FF)',
      },
    },
  },
  plugins: [],
};
