import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintProgressDisplay from './eslint-progress-display.js'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eslintrc = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...eslintrc.extends('plugin:tailwindcss/recommended'),
  ...eslintrc.extends('plugin:promise/recommended'),
  ...eslintrc.extends('plugin:n/recommended'),
  ...pluginVue.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  js.configs.recommended,
  {
    ignores: ['public/**/*.*', 'vendor/**/*.*'],
  },
  {
    plugins: {
      'eslintProgressDisplay': {
        rules: { showProgress: eslintProgressDisplay }
      }
    },
    rules: {
      'eslintProgressDisplay/showProgress': 1,
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
      'import/namespace': 0,
      'import/default': 0,
      'import/no-unresolved': 'error',
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': [
        'error',
        {
          'newlines-between': 'never',
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object'
          ]
        }
      ],
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
