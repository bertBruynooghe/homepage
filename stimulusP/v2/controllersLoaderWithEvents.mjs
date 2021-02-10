const [ctrlAtt, actionAtt] = ['data-controller', 'data-action']
const actionSelector = `:scope > [${actionAtt}], :not([${ctrlAtt}] *)[${actionAtt}]`
  
const ctrlName = root => root.getAttribute(ctrlAtt)

const tuplesStrings = actionable => actionable.getAttribute(actionAtt).split(',')
const eventHandlerTuples = actionable =>
  tuplesStrings(actionable).map(s => s.split(':').map(s => s.trim()))

const parseController = (root, controller) => {
  for (const actionable of root.querySelectorAll(actionSelector))
    for (const [k,v] of eventHandlerTuples(actionable))
      actionable.addEventListener(k, controller[v])
}
const initController = root =>
  parseController(root, controllers[ctrlName(root)](root))

for (const el of document.querySelectorAll(`[${ctrlAtt}]`)) initController(el)

