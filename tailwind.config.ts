const colors = require('tailwindcss/colors')
module.exports = {
  plugins: [
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      colors: {
        shgray: '#E6E6E6',
        primary: {
          DEFAULT: colors.blue[700],
          focus: colors.blue[800],
          content: colors.white
        },
        secondary: {
          DEFAULT: colors.gray[200],
          focus: colors.gray[300],
          content: colors.gray[700]
        },
        info: {
          DEFAULT: colors.blue[500],
          focus: colors.blue[600],
          content: colors.gray[100]
        },
        warning: {
          DEFAULT: colors.yellow[400],
          focus: colors.yellow[500],
          content: colors.gray[500]
        },
        danger: {
          DEFAULT: colors.red[700],
          focus: colors.red[800],
          content: colors.gray[100]
        }
      }
    }
  }
}