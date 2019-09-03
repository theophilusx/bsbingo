module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "script"
  },
  rules: {
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "should|expect"
      }
    ],
    "no-console": "off",
    indent: "off",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
