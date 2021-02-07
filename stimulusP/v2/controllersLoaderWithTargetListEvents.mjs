const [ctrlAtt, actionAtt, targetAtt] = 
  ['data-controller', 'data-action', 'data-target']
const actionSelector = `:scope > [${actionAtt}], :not([${ctrlAtt}] *)[${actionAtt}]`
const targetSelector = `:scope > [${targetAtt}], :not([${ctrlAtt}] *)[${targetAtt}]`
  
const ctrlName = root => root.getAttribute(ctrlAtt)
const controller = root => controllers[ctrlName(root)](root, targets(root))
const tupleReducer = (object, [k,v]) => 
  ({ ...object, [k]: object[k] ? [].concat(object[k], v) : v })
const targetElementReducer = (targets, target) =>
  tupleReducer(targets, [target.getAttribute(targetAtt), target])
const targets = root => 		
  [...root.querySelectorAll(targetSelector)].reduce(targetElementReducer, {})
const eventHandlers = (root, actionable) => {
  const handlerTuplesString = actionable.getAttribute(actionAtt)
  const expr = `with(arguments[0]){ return { ${handlerTuplesString} } }`
  return (Function(expr))(controller(root, targets(root)))
}

for (const root of document.querySelectorAll(`[${ctrlAtt}]`))
  for (const actionable of root.querySelectorAll(actionSelector))
    for (const [k,v] of Object.entries(eventHandlers(root, actionable)))
      actionable.addEventListener(k, e => v(e, targets(root)))
