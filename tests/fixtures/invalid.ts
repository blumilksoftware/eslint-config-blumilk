import { App } from 'not-installed-package'

interface Ref<T> {
  value: T
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

export type { App, Handler }
export { getUser, getValue, identity, fn }
