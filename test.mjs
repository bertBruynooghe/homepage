const startMessageRoots = []

const findRootElement = el => {
  if (!el || startMessageRoots.includes(el)) return el
  return findRootElement(el.parentElement)
}

window.startMessage = rootElement => { 
  startMessageRoots.push(rootElement || event.target.parentElement)
  alert('connect')

  const clickHandler = () => {
    const myRoot = findRootElement(event.target)
    // TODO: ignore the targets of nested controllers
    // can probably partly be mitigated by looking for [data-target="theTarget: startMessage"],
    // but that doesn't solve nesting of same things
    // so we probably should ignore duplicate entries from a deeper layer.
    // (not: first one wins) 
    const targets = [...myRoot.querySelectorAll('[data-target]')]
      .reduce((acc, el) => ({ ...acc, [el.getAttribute('data-target')]: el}), {})

    // what we want the programmer to write
    targets.theTarget.remove()
  } 
  
  Object.assign(window.startMessage, { clickHandler })
  return window.startMessage
}

// the controller
const StartMessageController = rootElement => {
  alert('connected')
  return {
    clickHandler: (targets, e) => targets.theTarget.remove
  }
}
