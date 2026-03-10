import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import eslintProgressDisplay from './eslint-progress-display.js'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'
import pluginN from 'eslint-plugin-n'

export default [
  js.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
  }),
  ...pluginTailwindcss.configs['flat/recommended'],
  pluginN.configs['flat/recommended'],
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['public/**/*.*', 'vendor/**/*.*'],
  },
  {
    plugins: {
      eslintProgressDisplay: {
        rules: { showProgress: eslintProgressDisplay },
      },
    },
    rules: {
      'eslintProgressDisplay/showProgress': 1,
      'eqeqeq': ['error', 'smart'],
      'no-return-await': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      'prefer-template': 'error',
      'n/no-extraneous-import': 'off',
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: globals.node,
      },
    },
    rules: {
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
]
