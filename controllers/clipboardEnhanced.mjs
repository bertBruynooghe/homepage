import '../control.mjs'

export const createController = root => {
  
  if (document.queryCommandSupported('copy')) {
    root.classList.add("clipboard--supported")
  }

  return {
    copy: ({ source }) => {
      window.event.preventDefault()
      source.select()
      document.execCommand("copy")
    } 
  }
}