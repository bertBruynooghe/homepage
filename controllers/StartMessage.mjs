import '../control.mjs'

export const createController = rootElement => {
  console.log('connected')

  return {
    handleClick: ({ theTarget }) => theTarget.remove(),
    // getAttribute: () => console.log('test')
  }
}
