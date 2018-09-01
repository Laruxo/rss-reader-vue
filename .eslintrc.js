module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
