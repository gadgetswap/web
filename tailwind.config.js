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
        'gadget-1': '1 0 calc(100% - 2em)',
        'gadget-2': '0 0 calc(50% - 2em)',
        'gadget-3': '0 0 calc(100% / 3 - 2em)'
      },
      fontFamily: {
        sans: ['Inter var']
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
