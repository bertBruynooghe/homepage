// TODO: how to cleanup objects

const getTargetsObject = el => {
  const targetElements = [...el.querySelectorAll(`[data-target$=": ${el.id}"]`)]
  return targetElements.reduce((acc, targetElement) => {
    const targetExpression = targetElement.getAttribute('data-target')
    const [targetName] = targetExpression.split(':')
    return { 
    ...acc,
    [targetName]: targetElement
  }}, {})
}

window.ctrl = el =>
  import(el.src).then(({ createController: create }) => {
    const controller = create(el.parentElement)
    const controllerMethods = 
      Object.entries(controller).reduce((acc, [name, method]) => ({
        ...acc,
        [name]: (...args) => method(getTargetsObject(el.parentElement),...args)
      }), {})
    // TODO: prevent naming clashes
    Object.assign(el.parentElement, { controllerName: el.src, ...controllerMethods })
  })
  