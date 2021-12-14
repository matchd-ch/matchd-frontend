module.exports = {
  root: true,
  env: {
    browser: true,
  },
  globals: {
    process: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
    {
      files: [
        ".eslintrc.js",
        "babel.config.js",
        "jest.config.js",
        "postcss.config.js",
        "vue.config.js",
      ],
      env: {
        node: true,
        browser: false,
      },
    },
  ],
};
