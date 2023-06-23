## blumilksoftware/eslint-config-blumilk
ESlint config for all Blumilk projects.

### Usage
Add package to our project:
```shell
npm install -D eslint typescript
npm install git+https://github.com/blumilksoftware/eslint-config-blumilk.git
```

Create `eslintrc.js` file in your project's root directory:
```js
module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: ['blumilk'],
}
```

You can add two scripts to your package.json to lint and/or fix:
```js
"scripts": {
  "lint": "eslint src --ext .vue,.js,.ts --ignore-path .gitignore",
  "lint:fix": "eslint src --ext .vue,.js,.ts --fix"
}
```

### Configuration
If you'd like to overwrite eslint settings, you can add the rules in your `.eslintrc` file. The [ESLint rules](https://eslint.org/docs/rules/) go directly under `rules`.

```js
{
  extends: ['blumilk'],
  rules: {
    ...
  }
}
```

Then run following command to lint your code:
```shell
npm run lint
```

or following to fix found errors:
```shell
npm run lintf
```
