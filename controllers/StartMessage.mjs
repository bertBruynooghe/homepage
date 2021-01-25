import '../control.mjs'

export const createController = rootElement => {
  console.log('connected')

  return {
    handleClick: () => rootElement.theTarget.remove()
  }
}
