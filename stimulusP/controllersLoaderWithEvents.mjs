const ctrlAtt = 'data-controller'

const getRoot = 
  el => el.getAttribute(ctrlAtt) ? el : getRoot(el.parentElement)

window.handleBy = 
  ([methodName]) => getRoot(window.event.currentTarget)
    .controller[methodName](window.event)

for (const el of document.querySelectorAll(`[${ctrlAtt}]`))
  el.controller = controllers[el.getAttribute(ctrlAtt)](el)