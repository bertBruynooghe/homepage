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
    for (const name in controller) {
      if (el.parentElement[name]) throw new Error(`${name} already exists on the root element of the controller. Please rename your controller method.`)
      el.parentElement[name] = (...args) => controller[name](getTargetsObject(el.parentElement),...args)
    }
  })
