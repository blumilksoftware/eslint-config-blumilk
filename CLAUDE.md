# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this

`@blumilksoftware/eslint-config` — a shared ESLint flat config preset for Blumilk projects. Targets Laravel + Vue + TailwindCSS stacks with optional TypeScript support. Published to npm as a scoped package.

## Commands

```bash
npm install          # install dependencies (no package-lock — see .npmrc)
npm test             # run all tests (node:test runner)
npm run lint         # lint the package itself (excludes tests/)
```

Run a single test file:
```bash
node --test tests/eslint-config.test.js
node --test tests/typescript-config.test.js
```

## Architecture

The package exports two entry points (ESM, flat config arrays):

- **`eslint.config.js`** — base config (JS + Vue): eslint:recommended, @stylistic, tailwindcss, n, vue/recommended. Includes a custom progress-display plugin.
- **`typescript-config.js`** — extends the same base with `@typescript-eslint` parser/plugin and TS-specific rules. Also ignores `*.js` files.

**`eslint-progress-display.js`** — custom ESLint rule that renders an ora spinner showing which file is being processed.

### Tests

Tests use Node.js built-in test runner (`node:test`) with `node:assert/strict`. Each test file creates an `ESLint` instance pointing at the respective config and lints fixture files in `tests/fixtures/`. Fixtures are minimal files that should either pass cleanly or trigger specific rule violations.

## Key details

- ESM only (`"type": "module"` in package.json)
- No lock file by design (`.npmrc` has `package-lock=false`)
- Requires Node.js ^20.19.0 || ^22.13.0 || >=24, ESLint ^10, TypeScript ^5.9 (peer deps)
- `"files"` in package.json controls what gets published: `eslint.config.js`, `typescript-config.js`, `eslint-progress-display.js`, `licence.md`, `readme.md`
- CI runs lint + tests on PRs to main (Node 24, GitHub Actions)
- Default ignores in the configs: `public/`, `vendor/` (Laravel conventions)
