module.exports = {
  purge: ['./src/**/*.js'],
  theme: {
    extend: {
      screens: {
        'dark': {'raw': '(prefers-color-scheme: dark)'}
      }
    }
  },
  variants: {},
  plugins: [],
};
