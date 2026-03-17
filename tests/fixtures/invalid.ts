import { App } from 'not-installed-package'

// @stylistic/member-delimiter-style (multiline with semicolons — should be none)
interface Ref<T> {
  value: T;
}

const user_name: string = 'John'
const scores: Array<number> = [1, 2, 3]
const unused: number = 42

function getValue(ref: Ref<string>): string {
  return ref.value!
}

function getUser(): object {
  return { name: user_name, age: scores.length }
}

function identity<T extends any>(value: T): T {
  return value
}

const fn: Function = () => {}

interface Handler {
  handle(event: string): void
}

// @typescript-eslint/no-dynamic-delete
const obj: Record<string, unknown> = {}
delete obj[user_name]

// @typescript-eslint/no-empty-object-type
interface Empty {}

// @typescript-eslint/no-extra-non-null-assertion
function getExtra(ref: Ref<string | null>): string {
  return ref.value!!
}

// @typescript-eslint/no-misused-new
interface Creator {
  new (): Creator
}

// @typescript-eslint/no-namespace
namespace MyNamespace {
  export const value = 1
}

// @typescript-eslint/no-non-null-asserted-optional-chain
function getOptional(ref?: Ref<string>): string {
  return ref?.value!
}

// @typescript-eslint/no-require-imports
const required = require('node:path')

// @typescript-eslint/no-this-alias
class MyClass {
  method() {
    const self = this
    return self
  }
}

// @typescript-eslint/no-restricted-types
const str: String = 'hello'
const bool: Boolean = true
const num: Number = 42
const sym: Symbol = Symbol('test')
const big: BigInt = BigInt(1)

// eqeqeq
const eqCheck = str == 'test'

// no-var
var badVar = 'no-var'

// no-void (expression)
const voidExpr = void 0

// object-shorthand
const shorthandObj = { badVar: badVar }

// prefer-const
let neverReassigned = 'const'

// prefer-template
const tmpl = 'hello ' + user_name

// @stylistic/quotes
const dblQuoted = "double"

// @stylistic/semi
const withSemi = 1;

// @stylistic/indent
function badIndent() {
    return 'wrong'
}

// @stylistic/brace-style
if (true)
{
  badIndent()
}

// @stylistic/arrow-parens
const arrowFn = (x) => x * 2

export type { App, Handler, Empty, Creator }
export { getUser, getValue, identity, fn, getExtra, getOptional, required, MyClass, MyNamespace, str, bool, num, sym, big, eqCheck, badVar, voidExpr, shorthandObj, neverReassigned, tmpl, dblQuoted, withSemi, arrowFn }
