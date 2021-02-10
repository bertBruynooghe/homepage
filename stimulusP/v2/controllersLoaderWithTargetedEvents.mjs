const [ctrlAtt, actionAtt, targetAtt] = 
  ['data-controller', 'data-action', 'data-target']
const actionSelector = `:scope > [${actionAtt}], :not([${ctrlAtt}] *)[${actionAtt}]`
const targetSelector = `:scope > [${targetAtt}], :not([${ctrlAtt}] *)[${targetAtt}]`
  
const ctrlName = root => root.getAttribute(ctrlAtt)
const targetElementReducer = (targets, target) => 
  ({ ...targets, [target.getAttribute(targetAtt)] : target })
const targets = root => 		
  [...root.querySelectorAll(targetSelector)].reduce(targetElementReducer, {})

const tuplesStrings = actionable => actionable.getAttribute(actionAtt).split(',')
const eventHandlerTuples = actionable =>
  tuplesStrings(actionable).map(s => s.split(':').map(s => s.trim()))

const parseController = (root, controller, targets) => {
  for (const actionable of root.querySelectorAll(actionSelector))
    for (const [k,v] of eventHandlerTuples(actionable))
      actionable.addEventListener(k, e => controller[v](e, targets))
}
const initControllerWithTargets = (root, targets) =>
  parseController(root, controllers[ctrlName(root)](root, targets), targets)
const initController = root => initControllerWithTargets(root, targets(root))

for (const el of document.querySelectorAll(`[${ctrlAtt}]`)) initController(el)
