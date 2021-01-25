const decorateWithTargets = el => {
  const targetElements = el.querySelectorAll(`[data-target$=": ${el.id}"]`)
  for (const targetElement of targetElements) {
    const targetExpression = targetElement.getAttribute('data-target')
    const [targetName] = targetExpression.split(':')
    // TODO: prevent naming clashes
    el[targetName] = targetElement
  }
}

window.ctrl = el =>
  import(el.src).then(({ createController: create }) => {
    const controller = create(el.parentElement)
    const controllerMethods = 
      Object.entries(controller).reduce((acc, [name, method]) => ({
        ...acc,
        [name]: (...args) => {
          decorateWithTargets(el.parentElement)
          return method(...args)
        } 
      }), {})
    // TODO: prevent naming clashes
    Object.assign(el.parentElement, { controllerName: el.src, ...controllerMethods })
  })