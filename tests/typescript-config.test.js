import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { ESLint } from 'eslint'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixturesDir = path.join(__dirname, 'fixtures')

const createEslint = () => new ESLint({
  overrideConfigFile: path.join(__dirname, '..', 'typescript-config.js'),
})

const lintFixture = async (filename) => {
  const eslint = createEslint()
  const results = await eslint.lintFiles(path.join(fixturesDir, filename))

  return results[0]
}

const getRuleIds = (result) => [...new Set(result.messages.map(m => m.ruleId))]

const assertRuleViolation = async (fixture, ruleId) => {
  const result = await lintFixture(fixture)

  assert.ok(getRuleIds(result).includes(ruleId), `Expected rule "${ruleId}" to be violated`)
}

const assertNoRuleViolation = async (fixture, ruleId) => {
  const result = await lintFixture(fixture)

  assert.ok(!getRuleIds(result).includes(ruleId), `Expected rule "${ruleId}" to not be violated`)
}

describe('typescript-config.js', () => {
  it('should export a valid config array', async () => {
    const config = await import('../typescript-config.js')

    assert.ok(Array.isArray(config.default))
    assert.ok(config.default.length > 0)
  })

  describe('valid TypeScript', () => {
    it('should pass without errors', async () => {
      const result = await lintFixture('valid.ts')
      const errors = result.messages.filter(m => m.ruleId !== 'eslintProgressDisplay/showProgress')

      assert.equal(errors.length, 0, `Unexpected errors: ${JSON.stringify(errors, null, 2)}`)
    })

    it('should allow == null with eqeqeq smart mode', () => assertNoRuleViolation('valid.ts', 'eqeqeq'))
    it('should allow void as statement', () => assertNoRuleViolation('valid.ts', 'no-void'))
  })

  describe('invalid TypeScript — base rules', () => {
    it('should catch eqeqeq violations', () => assertRuleViolation('invalid.ts', 'eqeqeq'))
    it('should catch no-var violations', () => assertRuleViolation('invalid.ts', 'no-var'))
    it('should catch no-void expression violations', () => assertRuleViolation('invalid.ts', 'no-void'))
    it('should catch prefer-const violations', () => assertRuleViolation('invalid.ts', 'prefer-const'))
    it('should catch prefer-template violations', () => assertRuleViolation('invalid.ts', 'prefer-template'))
    it('should catch object-shorthand violations', () => assertRuleViolation('invalid.ts', 'object-shorthand'))
  })

  describe('invalid TypeScript — stylistic rules', () => {
    it('should catch @stylistic/quotes violations', () => assertRuleViolation('invalid.ts', '@stylistic/quotes'))
    it('should catch @stylistic/semi violations', () => assertRuleViolation('invalid.ts', '@stylistic/semi'))
    it('should catch @stylistic/indent violations', () => assertRuleViolation('invalid.ts', '@stylistic/indent'))
    it('should catch @stylistic/brace-style violations', () => assertRuleViolation('invalid.ts', '@stylistic/brace-style'))
    it('should catch @stylistic/member-delimiter-style violations', () => assertRuleViolation('invalid.ts', '@stylistic/member-delimiter-style'))
    it('should catch @stylistic/arrow-parens violations', () => assertRuleViolation('invalid.ts', '@stylistic/arrow-parens'))
  })

  describe('invalid TypeScript — @typescript-eslint rules', () => {
    it('should catch @typescript-eslint/array-type violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/array-type'))
    it('should catch @typescript-eslint/consistent-type-imports violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/consistent-type-imports'))
    it('should catch @typescript-eslint/method-signature-style violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/method-signature-style'))
    it('should catch @typescript-eslint/naming-convention violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/naming-convention'))
    it('should catch @typescript-eslint/no-inferrable-types violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-inferrable-types'))
    it('should catch @typescript-eslint/no-non-null-assertion violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-non-null-assertion'))
    it('should catch @typescript-eslint/no-unnecessary-type-constraint violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-unnecessary-type-constraint'))
    it('should catch @typescript-eslint/no-unsafe-function-type violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-unsafe-function-type'))
    it('should catch @typescript-eslint/no-unused-vars violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-unused-vars'))
    it('should catch @typescript-eslint/no-dynamic-delete violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-dynamic-delete'))
    it('should catch @typescript-eslint/no-empty-object-type violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-empty-object-type'))
    it('should catch @typescript-eslint/no-extra-non-null-assertion violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-extra-non-null-assertion'))
    it('should catch @typescript-eslint/no-misused-new violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-misused-new'))
    it('should catch @typescript-eslint/no-namespace violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-namespace'))
    it('should catch @typescript-eslint/no-non-null-asserted-optional-chain violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-non-null-asserted-optional-chain'))
    it('should catch @typescript-eslint/no-require-imports violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-require-imports'))
    it('should catch @typescript-eslint/no-this-alias violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-this-alias'))
    it('should catch @typescript-eslint/no-restricted-types violations', () => assertRuleViolation('invalid.ts', '@typescript-eslint/no-restricted-types'))
  })

  describe('valid Vue with TypeScript', () => {
    it('should pass without errors for JS Vue', async () => {
      const result = await lintFixture('valid.vue')
      const errors = result.messages.filter(m => m.ruleId !== 'eslintProgressDisplay/showProgress')

      assert.equal(errors.length, 0, `Unexpected errors: ${JSON.stringify(errors, null, 2)}`)
    })

    it('should pass without errors for TS Vue', async () => {
      const result = await lintFixture('valid-ts.vue')
      const errors = result.messages.filter(m => m.ruleId !== 'eslintProgressDisplay/showProgress')

      assert.equal(errors.length, 0, `Unexpected errors: ${JSON.stringify(errors, null, 2)}`)
    })
  })

  describe('invalid Vue', () => {
    it('should catch vue/block-order violations', () => assertRuleViolation('invalid.vue', 'vue/block-order'))
    it('should catch vue/padding-line-between-blocks violations', () => assertRuleViolation('invalid.vue', 'vue/padding-line-between-blocks'))
    it('should catch @stylistic/member-delimiter-style violations in Vue', () => assertRuleViolation('invalid-ts.vue', '@stylistic/member-delimiter-style'))
    it('should catch @typescript-eslint/consistent-type-imports violations in Vue', () => assertRuleViolation('invalid-ts.vue', '@typescript-eslint/consistent-type-imports'))
  })

  describe('ignore patterns', () => {
    it('should ignore root .js files', async () => {
      const eslint = createEslint()

      assert.ok(await eslint.isPathIgnored(path.join(fixturesDir, '..', '..', 'some-file.js')))
    })

    it('should ignore files in public/', async () => {
      const eslint = createEslint()

      assert.ok(await eslint.isPathIgnored(path.join(fixturesDir, '..', '..', 'public', 'app.ts')))
    })

    it('should ignore files in vendor/', async () => {
      const eslint = createEslint()

      assert.ok(await eslint.isPathIgnored(path.join(fixturesDir, '..', '..', 'vendor', 'lib.ts')))
    })
  })
})
