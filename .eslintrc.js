module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'tailwindcss',
    'import',
    'promise'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'block-spacing': ['error', 'always'],
    'keyword-spacing': ['error'],
    'eol-last': ['error', 'always'],
    'tailwindcss/no-custom-classname': 0,
    'tailwindcss/classnames-order': 0,
    'vue/multi-word-component-names': 0,
    'vue/first-attribute-linebreak': 0,
    'vue/max-attributes-per-line': 0,
    'vue/padding-line-between-blocks': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return', 'block-like'],
      },
    ],
  },
}
