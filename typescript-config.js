import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import eslintProgressDisplay from './eslint-progress-display.js'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
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
    ignores: ['public/**/*.*', 'vendor/**/*.*', '*.js'],
  },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      'eslintProgressDisplay': {
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
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'semi', requireLast: false },
      }],
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
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
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/singleline-html-element-content-newline': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/consistent-type-assertions': 0,
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'separate-type-imports',
      }],
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': ['error', {
        selector: 'variableLike',
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      }],
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-extraneous-class': 0,
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-invalid-void-type': 0,
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
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
        },
      }],
    },
  },
]
