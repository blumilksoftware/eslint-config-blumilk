[![Version](https://img.shields.io/npm/v/%40blumilksoftware%2Feslint-config?style=for-the-badge)](https://www.npmjs.com/package/@blumilksoftware/eslint-config)
[![NPM version](https://img.shields.io/node/v/%40blumilksoftware%2Feslint-config?style=for-the-badge)](https://www.npmjs.com/package/@blumilksoftware/eslint-config)
[![Downloads](https://img.shields.io/npm/dt/%40blumilksoftware%2Feslint-config?style=for-the-badge)](https://www.npmjs.com/package/@blumilksoftware/eslint-config)

## eslint-config-blumilk

ESlint default preset for Blumilk projects. This package assumes that the project uses modern Laravel, Vue, TailwindCSS and TypeScript if you want. It focuses on enforcing code consistency and adds some basic styling rules. Ideally, it should be used together with Prettier.

This package uses the new [ESLint configuration format](https://eslint.org/docs/latest/use/configure/configuration-files-new) and requires ESLint 9 or above.

In general this package includes rules from:

- [vue/vue3-recommended](https://eslint.vuejs.org/rules/)
- [tailwindcss/recommended](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [promise/recommended](https://github.com/eslint-community/eslint-plugin-promise#rules)
- [n/recommended](https://github.com/eslint-community/eslint-plugin-n#-rules)
- [eslint.recommended](https://eslint.org/docs/latest/rules/)

On top of this we layer some overrides and typescript related preferences (mostly based on [standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript)).

### Usage

Install package in your project:

    npm install -D @blumilksoftware/eslint-config

Create `eslint.config.js` file in your project's root directory:

```js
import blumilkDefault from '@blumilksoftware/eslint-config'

export default [
    ...blumilkDefault,
]
```

Or with TypeScript:

```js
import blumilkDefault from '@blumilksoftware/eslint-config/typescript-config.js'

export default [
    ...blumilkDefault,
]
```

You can also add scripts to your `package.json`:

```js
{
  …
  "scripts": {
    "lint": "eslint .",
    "lintf": "eslint . --fix"
  }
  …
}
```

### Configuration

If you need to extend eslint settings, you can add the rules in your `eslint.config.js` file.

```js
import blumilkDefault from '@blumilksoftware/eslint-config'

export default [
  ...blumilkDefault,
  {
    rules: {
      'vue/multi-word-component-names': 'error',
    }
  }
]
```

To run the linter, use:

    npm run lint

To autmatically fix errors, use:

    npm run lintf

