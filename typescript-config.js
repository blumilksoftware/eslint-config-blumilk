import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintProgressDisplay from './eslint-progress-display.js'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import globals from 'globals'
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
  js.configs.recommended,
  {
    ignores: ['public/**/*.*', 'vendor/**/*.*', '*.js'],
  },
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
      '@typescript-eslint': tsPlugin,
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
      'n/no-unsupported-features/node-builtins': 'off',
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
        parser: tsParser,
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
  {
    files: ['**/*.vue', '**/*.ts'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: globals.node,
      },
    },
    rules: {
      '@stylistic/ts/member-delimiter-style': ['error',{
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'comma', requireLast: false },
      }],
      '@typescript-eslint/no-invalid-void-type': 0,
      '@typescript-eslint/consistent-type-assertions': 0,
      '@typescript-eslint/no-extraneous-class': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
      }],
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': ['error', {
        selector: 'variableLike',
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      }],
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-restricted-types': ['error', {
        types: {
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          Boolean: {
            message: 'Use boolean instead',
            fixWith: 'boolean',
          },
          Number: {
            message: 'Use number instead',
            fixWith: 'number',
          },
          Symbol: {
            message: 'Use symbol instead',
            fixWith: 'symbol',
          },
          BigInt: {
            message: 'Use bigint instead',
            fixWith: 'bigint',
          },
        }
      }]
    }
  },
]
