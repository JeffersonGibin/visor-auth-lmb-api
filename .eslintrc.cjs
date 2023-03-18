/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      files: ["**/*.spec.js"],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    "new-cap": 0,
    "object-curly-spacing": ["error", "always"],
    "require-jsdoc": 0,
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-this-alias": "off",
  },
};
