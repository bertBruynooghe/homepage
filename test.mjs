const startMessageRoots = []

const findRootElement = el => {
  if (!el || startMessageRoots.includes(el)) return el
  return findRootElement(el.parentElement)
}

window.StartMessage = arg => { 
  startMessageRoots.push(arg instanceof HTMLScriptElement ? arg.parentElement: arg)
  alert('connect')

  const clickHandler = e => {
    const myRoot = findRootElement(e.target)
    // TODO: ignore the targets of nested controllers
    // can probably partly be mitigated by looking for [data-target="theTarget: StartMessage"],
    // but that doesn't solve nesting of same things
    // so we probably should ignore duplicate entries from a deeper layer.
    // (not: first one wins) 
    const targets = [...myRoot.querySelectorAll('[data-target]')]
      .reduce((acc, el) => ({ ...acc, [el.getAttribute('data-target')]: el}), {})

    // what we want the programmer to write
    targets.theTarget.remove()
  } 
  
  Object.assign(window.StartMessage, { clickHandler })
  return window.StartMessage
}
