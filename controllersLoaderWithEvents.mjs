const wrapWithEvent = func => (...args) => func(window.event, ...args)
const wrapController = controller => Object.entries(controller)
  .reduce((acc, [k, func]) => ({ ...acc, [k]: wrapWithEvent(func) }), {})

for (const el of document.querySelectorAll('[data-controller]')){
  const controllerName = el.getAttribute('data-controller')
  const controller = controllers[controllerName](el)
  el.controller = wrapController(controller)
}

const getRoot = 
  el => el.getAttribute('data-controller') ? el : getRoot(el.parentElement)
window.ctrl = el => getRoot(el).controller
