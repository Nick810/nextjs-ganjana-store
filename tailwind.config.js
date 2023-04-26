/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      maxWidth: {
        'para': '540px'
      },
      gridTemplateColumns: {
        'header-menu': '96px 972px 1fr',
        'first-blog': '70% 1fr',
        'home-shop': '500px 1fr'
      }
    },
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#0a0a0a",
          "primary-content": "#e1e1e1",
          "secondary-content": '#656565',
          "secondary": "#f6d860",
          "success": "#0e9b0e",
          "warning": "#FBBD23",
          "error": "#e20f0f",
          "error-dark": "#bc2020"
        }
      }
    ],
  },
  plugins: [require('daisyui')],
}
