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
          "primary": "#000",
          "primary-content": "#f6f6f6",
          "secondary": "#f6d860",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        }
      }
    ],
  },
  plugins: [require('daisyui')],
}
