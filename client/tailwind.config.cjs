/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {},
    minWidth: {
      '0': '0',
      '1/16': '6.25%',
      '1/8': '12.5%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    }
  },
  plugins: [],
}
