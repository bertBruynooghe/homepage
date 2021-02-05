const ctrlAtt = 'data-controller'
const targetAtt = 'data-target'
const targetSelector = `[${targetAtt}], :not([${ctrlAtt}] *)[${targetAtt}]`

const ctrlName = el => el.getAttribute(ctrlAtt)
const getRoot = el => ctrlName(el) ? el : getRoot(el.parentElement)

const targetElementReducer = (acc, el) => 
  ({ ...acc, [el.getAttribute(targetAtt)] : el })

const getTargetsObject = el => 		
  [...el.querySelectorAll(targetSelector)].reduce(targetElementReducer, {})

window.handleBy = ([methodName]) => {
  const root = getRoot(window.event.currentTarget)
  root.controller[methodName](window.event, getTargetsObject(root))
}

for (const el of document.querySelectorAll(`[${ctrlAtt}]`))
  el.controller = controllers[ctrlName(el)](el)
