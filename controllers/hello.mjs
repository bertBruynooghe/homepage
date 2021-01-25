import '../control.mjs'

export const createController = () => ({
  greet: ({ name }) => console.log(`Hello, ${name.value}!`)
})