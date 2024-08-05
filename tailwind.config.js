/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.handlebars",
    "./public/**/*.{js,css}",
    "./node_modules/tw-elements/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"),
    require("daisyui"),
    require("flowbite/plugin"),
  ],
};
