/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#000",
          "primary-content": "#fff",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        }
      }
    ],
  },
  plugins: [require('daisyui')],
}
