var foo = "bar";
let unused = 1
let obj = { foo: foo }
let name = "world"
let greeting = "hello " + name
const nothing = void 0

if (foo == "bar") {
  console.log(greeting)
}

function badIndent() {
    return 'wrong indent'
}

if (true)
{
  console.log('bad brace style')
}

// @stylistic/arrow-parens
const arrowFn = (x) => x * 2

console.log(obj, nothing, badIndent, arrowFn)
