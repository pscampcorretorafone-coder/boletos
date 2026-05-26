/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#40444b',
          500: '#4f545c',
          400: '#72767d',
          300: '#96989d',
          200: '#b9bbbe',
          100: '#dcddde',
          50:  '#f2f3f5',
          blurple: '#5865f2',
          'blurple-dark': '#4752c4',
          green: '#3ba55d',
          red: '#ed4245',
          yellow: '#faa61a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Whitney', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
