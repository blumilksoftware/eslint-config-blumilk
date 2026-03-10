interface User {
  name: string
  age: number
}

interface Ref<T> {
  value: T
}

interface Handler {
  handle: (event: string) => void
}

const userName = 'John'
const scores: number[] = [1, 2, 3]

function getUser(): User {
  return { name: userName, age: scores.length }
}

function useRef(ref: Ref<string>): string {
  return ref.value
}

function identity<T>(value: T): T {
  return value
}

export type { Handler }
export { getUser, useRef, identity }
