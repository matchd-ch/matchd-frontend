module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-recommended", "@vue/prettier", "@vue/typescript", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
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
        ".prettier.config.js",
      ],
      env: {
        node: true,
        browser: false,
      },
    },
  ],
  rules: {
    "vue/multi-word-component-names": 0,
    "@typescript-eslint/consistent-type-imports": "error",
  },
};
