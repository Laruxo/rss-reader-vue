/**
 * @see https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
 * @since 2017.03.27
 *
 * Lines with "custom" comment should stay.
 */
module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
  },
  plugins: [
    "html"
  ],
  rules: {
    "accessor-pairs": "off",
    "array-bracket-spacing": "error", // custom
    "array-callback-return": "off",
    "arrow-body-style": "off",
    "arrow-parens": ["error", "as-needed"], // custom
    "arrow-spacing": "error", // custom
    "block-scoped-var": "off",
    "block-spacing": "off",
    "brace-style": "error", // custom
    "callback-return": "off",
    "camelcase": "error", // custom
    "capitalized-comments": "off",
    "class-methods-use-this": "off",
    "comma-dangle": ["error", 'always-multiline'], // custom
    "comma-spacing": "error", // custom
    "comma-style": "off",
    "complexity": "off",
    "computed-property-spacing": "error", // custom
    "consistent-return": "off",
    "consistent-this": "error", // custom
    "constructor-super": "error",
    "curly": "off",
    "default-case": "off",
    "dot-location": "off",
    "dot-notation": "off",
    "eol-last": "error", // custom
    "eqeqeq": "off",
    "func-call-spacing": "error", // custom
    "func-name-matching": "off",
    "func-names": "off",
    "func-style": "off",
    "generator-star-spacing": "off",
    "global-require": "off",
    "guard-for-in": "error", // custom
    "handle-callback-err": "off",
    "id-blacklist": "off",
    "id-length": "off",
    "id-match": "off",
    "indent": ["error", 2, {SwitchCase: 1}], // custom
    "init-declarations": "off",
    "jsx-quotes": "off",
    "key-spacing": "error", // custom
    "keyword-spacing": "error", // custom
    "line-comment-position": "off",
    "linebreak-style": "error", // custom
    "lines-around-comment": "off",
    "lines-around-directive": "off",
    "max-depth": "off",
    "max-len": ["warn", {code: 100, ignoreComments: true, ignoreUrls: true}], // custom
    "max-lines": "off",
    "max-nested-callbacks": "off",
    "max-params": ["warn", 3], // custom
    "max-statements": "off",
    "max-statements-per-line": "off",
    "multiline-ternary": "off",
    "new-cap": "error", // custom
    "new-parens": "error", // custom
    "newline-after-var": "off",
    "newline-before-return": "off",
    "newline-per-chained-call": "off",
    "no-alert": "off",
    "no-array-constructor": "off",
    "no-await-in-loop": "off",
    "no-bitwise": "off",
    "no-caller": "off",
    "no-case-declarations": "error",
    "no-catch-shadow": "off",
    "no-class-assign": "error",
    "no-compare-neg-zero": "off",
    "no-cond-assign": "error",
    "no-confusing-arrow": "off",
    "no-console": 0, // custom
    "no-const-assign": "error",
    "no-constant-condition": "error",
    "no-continue": "off",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-div-regex": "off",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": ["error", {"includeExports": true}], // custom
    "no-else-return": "off",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-empty-function": "off",
    "no-empty-pattern": "error",
    "no-eq-null": "off",
    "no-eval": "off",
    "no-ex-assign": "error",
    "no-extend-native": "error", // custom
    "no-extra-bind": "error", // custom
    "no-extra-boolean-cast": "error",
    "no-extra-label": "off",
    "no-extra-parens": "off",
    "no-extra-semi": "error",
    "no-fallthrough": "error",
    "no-floating-decimal": "off",
    "no-func-assign": "error",
    "no-global-assign": "error",
    "no-implicit-coercion": "off",
    "no-implicit-globals": "off",
    "no-implied-eval": "off",
    "no-inline-comments": "off",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-invalid-this": "error", // custom
    "no-irregular-whitespace": "error",
    "no-iterator": "off",
    "no-label-var": "off",
    "no-labels": "off",
    "no-lone-blocks": "off",
    "no-lonely-if": "off",
    "no-loop-func": "off",
    "no-magic-numbers": "off",
    "no-mixed-operators": "off",
    "no-mixed-requires": "off",
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-assign": "off",
    "no-multi-spaces": "error", // custom
    "no-multi-str": "error", // custom
    "no-multiple-empty-lines": ["error", {max: 1}], // custom
    "no-native-reassign": "off",
    "no-negated-condition": "error", // custom
    "no-negated-in-lhs": "off",
    "no-nested-ternary": "off",
    "no-new": "off",
    "no-new-func": "off",
    "no-new-object": "off",
    "no-new-require": "off",
    "no-new-symbol": "error",
    "no-new-wrappers": "off",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-octal-escape": "off",
    "no-param-reassign": "off",
    "no-path-concat": "off",
    "no-plusplus": "off",
    "no-process-env": "off",
    "no-process-exit": "off",
    "no-proto": "off",
    "no-prototype-builtins": "off",
    "no-redeclare": "error",
    "no-regex-spaces": "error",
    "no-restricted-globals": "off",
    "no-restricted-imports": "off",
    "no-restricted-modules": "off",
    "no-restricted-properties": "off",
    "no-restricted-syntax": "off",
    "no-return-assign": "off",
    "no-return-await": "off",
    "no-script-url": "off",
    "no-self-assign": "error",
    "no-self-compare": "off",
    "no-sequences": "off",
    "no-shadow": "off",
    "no-shadow-restricted-names": "off",
    "no-spaced-func": "off",
    "no-sparse-arrays": "error",
    "no-sync": "off",
    "no-tabs": "off",
    "no-template-curly-in-string": "off",
    "no-ternary": "off",
    "no-this-before-super": "error",
    "no-throw-literal": "off",
    "no-trailing-spaces": "off",
    "no-undef": "error",
    "no-undef-init": "off",
    "no-undefined": "off",
    "no-underscore-dangle": "off",
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "off",
    "no-unneeded-ternary": "off",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "no-unused-expressions": "off",
    "no-unused-labels": "error",
    "no-unused-vars": "error",
    "no-use-before-define": "off",
    "no-useless-call": "off",
    "no-useless-computed-key": "off",
    "no-useless-concat": "off",
    "no-useless-constructor": "error", // custom
    "no-useless-escape": "off",
    "no-useless-rename": "error", // custom
    "no-useless-return": "off",
    "no-var": "error", // custom
    "no-void": "off",
    "no-warning-comments": "warn", // custom
    "no-whitespace-before-property": "off",
    "no-with": "error", // custom
    "nonblock-statement-body-position": "off",
    "object-curly-newline": "off",
    "object-curly-spacing": ["error", "never"], // custom
    "object-property-newline": "off",
    "object-shorthand": "off",
    "one-var": ["error", "never"], // custom
    "one-var-declaration-per-line": "off",
    "operator-assignment": "error", // custom
    "operator-linebreak": "off",
    "padded-blocks": ["error", "never"],
    "prefer-arrow-callback": "off",
    "prefer-const": "error", // custom
    "prefer-destructuring": "off",
    "prefer-numeric-literals": "off",
    "prefer-promise-reject-errors": "off",
    "prefer-reflect": "off",
    "prefer-rest-params": "error", // custom
    "prefer-spread": "error", // custom
    "prefer-template": "off",
    "quote-props": ["error", 'consistent'],
    "quotes": ["error", "single"],
    "radix": "error", // custom
    "require-await": "off",
    "require-jsdoc": "off",
    "require-yield": "error",
    "rest-spread-spacing": "error", // custom
    "semi": "error", // custom
    "semi-spacing": "error", // custom
    "sort-keys": "off",
    "sort-vars": "off",
    "space-before-blocks": "error", // custom
    "space-before-function-paren": ["error", "never"], // custom
    "space-in-parens": "error", // custom
    "space-infix-ops": "off",
    "space-unary-ops": "off",
    "spaced-comment": "error", // custom
    "strict": "off",
    "symbol-description": "off",
    "template-curly-spacing": "error", // custom
    "template-tag-spacing": "off",
    "unicode-bom": "off",
    "use-isnan": "error",
    "valid-jsdoc": ["error", {
      requireReturn: false,
      prefer: {returns: 'return'},
      requireParamDescription: false,
      requireReturnDescription: false,
    }], // custom
    "valid-typeof": "error",
    "vars-on-top": "off",
    "wrap-iife": "off",
    "wrap-regex": "off",
    "yield-star-spacing": "error", // custom
    "yoda": "error", // custom
  },
};
