module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-atrule-bem"),
    require("tailwindcss/nesting")(require("postcss-nesting")),
    require("tailwindcss"),
    require("rucksack-css"),
    require("autoprefixer"),
  ],
};
