## blumilksoftware/eslint-config-blumilk
ESlint config for all Blumilk projects.

### Usage
Add package to our project:
```shell
npm install -D eslint typescript
npm install @blumilksoftware/eslint-config
```

Create `.gitignore` file in your project's root directory:
```shell
touch .gitignore
```

Create `.eslintrc.js` file in your project's root directory:
```js
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: "@blumilksoftware/eslint-config",
  parserOptions: {
    project: ['tsconfig.json'], //Path to your tsconfig file. 
  },
}
```

You can add two scripts to your package.json to lint and/or fix:
```js
"scripts": {
  "lint": "eslint src --ext .vue,.js,.ts --ignore-path .gitignore",
  "lintf": "eslint src --ext .vue,.js,.ts --fix"
}
```

### Configuration
If you'd like to overwrite eslint settings, you can add the rules in your `.eslintrc` file. The [ESLint rules](https://eslint.org/docs/rules/) go directly under `rules`.

```js
{
  extends: "@blumilksoftware/eslint-config",
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

### Recomended Prettier
If you want to use prettier:
```shell
npm install prettier
npm install eslint-config-prettier
```

Add to your`.eslintrc` file:
```js
{
  extends: ['@vue/eslint-config-prettier']
}
```

And then recommended to create a `.prettierrc` file in your root directory like so:
```js
{
  "trailingComma": "all",
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 120
}
```