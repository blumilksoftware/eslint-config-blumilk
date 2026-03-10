var foo = "bar";
let unused = 1
let obj = { foo: foo }
let name = "world"
let greeting = "hello " + name
const nothing = void 0

if (foo == "bar") {
  console.log(greeting)
}

console.log(obj, nothing)
