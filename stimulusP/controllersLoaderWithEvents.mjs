const ctrlAtt = 'data-controller'

const ctrlName = el => el.getAttribute(ctrlAtt)
const getRoot = el => ctrlName(el) ? el : getRoot(el.parentElement)

window.handleBy = 
  ([methodName]) => getRoot(window.event.currentTarget)
    .controller[methodName](window.event)

for (const el of document.querySelectorAll(`[${ctrlAtt}]`))
  el.controller = controllers[ctrlName(el)](el)
