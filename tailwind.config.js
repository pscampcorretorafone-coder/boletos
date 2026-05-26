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
          darker: '#202225',
          dark: '#2f3136',
          main: '#36393f',
          light: '#40444b',
          hover: '#42464d',
          brand: '#5865f2',
          'brand-hover': '#4752c4',
          green: '#3ba55c',
          red: '#ed4245',
          yellow: '#faa61a',
          text: '#dcddde',
          'text-muted': '#72767d',
          'text-header': '#fff',
          'channel-bg': '#2f3136',
        },
      },
    },
  },
  plugins: [],
}

