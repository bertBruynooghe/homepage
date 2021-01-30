for (const el of document.querySelectorAll('[data-controller]')){
  const controllerName = el.getAttribute('data-controller')
  el.controller = controllers[controllerName](el)
}

const getRoot = 
  el => el.getAttribute('data-controller') ? el : getRoot(el.parentElement)
window.ctrl = 
  ([methodName]) => getRoot(window.event.currentTarget)
    .controller[methodName](window.event)