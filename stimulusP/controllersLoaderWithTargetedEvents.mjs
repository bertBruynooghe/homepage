const ctrlAtt = 'data-controller'
const targetAtt = 'data-target'
const targetSelector = `[${targetAtt}], :not([${ctrlAtt}] *)[${targetAtt}]`

const getRoot = 
  el => el.getAttribute(ctrlAtt) ? el : getRoot(el.parentElement)

const getTargetsObject = el => 		
  el.querySelectorAll(targetSelector).reduce(targetElementReducer, {})

const targetElementReducer = (acc, el) => 
  ({ ...acc, [el.getAttribute(targetAtt)] : el })

window.handleBy = ([methodName]) => {
  const root = getRoot(window.event.currentTarget)
  root.controller[methodName](window.event, getTargetsObject(root))
}

for (const el of document.querySelectorAll(`[${ctrlAtt}]`))
  el.controller = controllers[el.getAttribute(ctrlAtt)](el)
