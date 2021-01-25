import '../control.mjs'

export const createController = rootElement => {
  console.log('connected')

  return {
    greet: ({ output, name }) => output.textContent = `Hello, ${name.value}!`
  }
}