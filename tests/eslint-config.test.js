import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { ESLint } from 'eslint'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixturesDir = path.join(__dirname, 'fixtures')

const createEslint = () => new ESLint({
  overrideConfigFile: path.join(__dirname, '..', 'eslint.config.js'),
})

const lintFixture = async (filename) => {
  const eslint = createEslint()
  const results = await eslint.lintFiles(path.join(fixturesDir, filename))

  return results[0]
}

const getRuleIds = (result) => [...new Set(result.messages.map(m => m.ruleId))]

const assertRuleViolation = async (fixture, ruleId) => {
  const result = await lintFixture(fixture)

  assert.ok(
    getRuleIds(result).includes(ruleId),
    `Expected rule "${ruleId}" to be violated`,
  )
}

describe('eslint.config.js', () => {
  it('should export a valid config array', async () => {
    const config = await import('../eslint.config.js')

    assert.ok(Array.isArray(config.default))
    assert.ok(config.default.length > 0)
  })

  describe('valid JavaScript', () => {
    it('should pass without errors', async () => {
      const result = await lintFixture('valid.js')
      const errors = result.messages.filter(m => m.ruleId !== 'eslintProgressDisplay/showProgress')

      assert.equal(errors.length, 0, `Unexpected errors: ${JSON.stringify(errors, null, 2)}`)
    })

    it('should allow == null with eqeqeq smart mode', async () => {
      const result = await lintFixture('valid.js')
      const eqeqeq = result.messages.filter(m => m.ruleId === 'eqeqeq')

      assert.equal(eqeqeq.length, 0, 'eqeqeq should allow == null in smart mode')
    })

    it('should allow void as statement', async () => {
      const result = await lintFixture('valid.js')
      const noVoid = result.messages.filter(m => m.ruleId === 'no-void')

      assert.equal(noVoid.length, 0, 'no-void should allow void as statement')
    })
  })

  describe('invalid JavaScript', () => {
    it('should catch eqeqeq violations', () => assertRuleViolation('invalid.js', 'eqeqeq'))
    it('should catch no-var violations', () => assertRuleViolation('invalid.js', 'no-var'))
    it('should catch no-void expression violations', () => assertRuleViolation('invalid.js', 'no-void'))
    it('should catch prefer-const violations', () => assertRuleViolation('invalid.js', 'prefer-const'))
    it('should catch prefer-template violations', () => assertRuleViolation('invalid.js', 'prefer-template'))
    it('should catch object-shorthand violations', () => assertRuleViolation('invalid.js', 'object-shorthand'))
    it('should catch @stylistic/quotes violations', () => assertRuleViolation('invalid.js', '@stylistic/quotes'))
    it('should catch @stylistic/semi violations', () => assertRuleViolation('invalid.js', '@stylistic/semi'))
  })

  describe('valid Vue', () => {
    it('should pass without errors', async () => {
      const result = await lintFixture('valid.vue')
      const errors = result.messages.filter(m => m.ruleId !== 'eslintProgressDisplay/showProgress')

      assert.equal(errors.length, 0, `Unexpected errors: ${JSON.stringify(errors, null, 2)}`)
    })
  })

  describe('invalid Vue', () => {
    it('should catch vue/block-order violations', () => assertRuleViolation('invalid.vue', 'vue/block-order'))
    it('should catch vue/padding-line-between-blocks violations', () => assertRuleViolation('invalid.vue', 'vue/padding-line-between-blocks'))
  })

  describe('ignore patterns', () => {
    it('should ignore files in public/', async () => {
      const eslint = createEslint()

      assert.ok(await eslint.isPathIgnored(path.join(fixturesDir, '..', '..', 'public', 'app.js')))
    })

    it('should ignore files in vendor/', async () => {
      const eslint = createEslint()

      assert.ok(await eslint.isPathIgnored(path.join(fixturesDir, '..', '..', 'vendor', 'lib.js')))
    })
  })
})
