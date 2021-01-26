import '../control.mjs'

export const createController = () => ({
  copy: ({ source }) => {
    window.event.preventDefault()
    source.select()
    document.execCommand("copy")
  }
})

