module.exports = {
  purge: ['./src/**/*.js'],
  theme: {
    typography: (theme) => ({
      default: {
        css: {
          'a': {
            color: theme('colors.red.800'),
            textDecoration: 'none',
          },
          'blockquote': {
            borderLeftColor: theme('colors.purple.500'),
          },
          'code': {
            color: null,
            fontWeight: null,
          },
          'code::before': {content: null},
          'code::after': {content: null},
          'pre': {
            color: null,
            backgroundColor: null,
          },
          'pre code': {
            backgroundColor: null,
            color: null,
            fontSize: null,
            fontFamily: null,
            lineHeight: null,
          },
          'pre code::before': {content: ''},
          'pre code::after': {content: ''},
        },
      },
      dark: {
        css: {
          'blockquote': {
            color: theme('colors.gray.500'),
          },
          color: theme('colors.gray.300'),
          h1: {
            color: theme('colors.gray.300'),
          },
          h2: {
            color: theme('colors.gray.300'),
          },
          h3: {
            color: theme('colors.gray.300'),
          },
          h4: {
            color: theme('colors.gray.300'),
          },
          h5: {
            color: theme('colors.gray.300'),
          },
          h6: {
            color: theme('colors.gray.300'),
          },
          figcaption: {
            color: theme('colors.gray.500'),
          },
          'thead': {
            color: theme('colors.gray.300')
          }
        }
      },
    }),
    extend: {
      screens: {
        'dark': {'raw': '(prefers-color-scheme: dark)'},
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
