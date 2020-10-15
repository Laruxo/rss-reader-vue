module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  overrides: [
    {
      files: ["src/**/*.test.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
