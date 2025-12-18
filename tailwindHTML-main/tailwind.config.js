/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'p-dark': '#3B2B20',
        'p-mid': '#8B6B5A',
        'p-light': '#F3EFE9',
        'p-acc': '#B86B56',
        'start-bg': '#3B2B20'
      }
    }
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
