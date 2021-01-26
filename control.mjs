const getTargetsObject = el => {
  const result = {}
  for (const targetElement of el.querySelectorAll(`[data-target$=": ${el.id}"]`))
    result[targetElement.getAttribute('data-target').split(':')[0]] = targetElement
  return result
}

window.ctrl = el =>
  import(el.src).then(({ createController: create }) => {
    const controller = create(el.parentElement)
    for (const name in controller) {
      if (el.parentElement[name]) throw new Error(`${name} already exists on the root element of the controller. Please rename your controller method.`)
      el.parentElement[name] = (...args) => {
        const result = controller[name](getTargetsObject(el.parentElement),...args)
        console.log({ result })
        return result
      }
    }
  })
