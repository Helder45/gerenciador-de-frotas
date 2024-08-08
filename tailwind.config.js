/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.handlebars",
    "./public/**/*.{js,css}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"),
    require("daisyui"),
  ],
};
