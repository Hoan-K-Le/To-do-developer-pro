/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,ts,tsx,html,js}'],
  theme: {
    extend: {
      colors: {
        'button-primary': '#0D99FF',
        'remove-checkList': '#F55858CC',
      },
      width: {
        'container-width': '450px',
      },
    },
  },
  plugins: [],
}
