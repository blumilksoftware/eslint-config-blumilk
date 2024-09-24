import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintProgressRule from './eslint-progress-rule.js'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eslintrc = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...eslintrc.extends('plugin:vue/vue3-recommended'),
  ...eslintrc.extends('plugin:tailwindcss/recommended'),
  ...eslintrc.extends('plugin:promise/recommended'),
  ...eslintrc.extends('plugin:n/recommended'),
  js.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': ['error', 'always'],
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    ignores: ['public/**/*.*', 'vendor/**/*.*'],
  },
  {
    plugins: {
      'eslintProgressRule': {
        rules: { showProgress: eslintProgressRule }
      }
    },
    rules: {
      'eslintProgressRule/showProgress': 1,
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': 'off',
      'no-undef': 'off',
      'no-void': ['error', { allowAsStatement: true }],
      'no-unused-vars': 'off',
      'no-return-await': 'off',
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
      'vue/multi-word-component-names': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/padding-line-between-blocks': ['error', 'always'],
    }
  },
]
