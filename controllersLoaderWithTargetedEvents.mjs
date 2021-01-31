const ctrlAtt = 'data-controller'
const targetAtt = 'data-target'
for (const el of document.querySelectorAll(`[${ctrlAtt}]`))
  el.controller = controllers[el.getAttribute(ctrlAtt)](el)

const getRoot = 
  el => el.getAttribute(ctrlAtt) ? el : getRoot(el.parentElement)

const getTargetsObject = el => {		
  const targetElements = el.querySelectorAll(`[${targetAtt}], :not([${ctrlAtt}] *)[${targetAtt}]`)
  console.log({ targetElements })
  const result = {}		
  for (const targetElement of targetElements)		
    result[targetElement.getAttribute(targetAtt)	] = targetElement			
  return result		
}

window.handleBy = ([methodName]) => {
  const root = getRoot(window.event.currentTarget)
  root.controller[methodName](window.event, getTargetsObject(root))
}
