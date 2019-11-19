const pseudo = require('tailwindcss-pseudo')

module.exports = {
  plugins: [pseudo()],
  theme: {
    extend: {
      colors: {
        accent: '#fc0',
        modal: 'rgba(255, 255, 255, 0.95)',
        primary: '#151515'
      },
      flex: {
        2: '2',
        'gadget-1': '1 0 calc(100% - 2em)',
        'gadget-2': '0 0 calc(50% - 2em)'
      },
      fontFamily: {
        sans: [
          'Inter var',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji'
        ]
      },
      width: {
        100: '20rem'
      },
      zIndex: {
        '-1': -1,
        '-2': -2
      }
    }
  },
  variants: {}
}
