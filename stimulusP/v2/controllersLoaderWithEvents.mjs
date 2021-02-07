const [ctrlAtt, actionAtt] = ['data-controller', 'data-action']
const actionSelector = `:scope > [${actionAtt}], :not([${ctrlAtt}] *)[${actionAtt}]`

const ctrlName = root => root.getAttribute(ctrlAtt)
const controller = root => controllers[ctrlName(root)](root)
const eventHandlers = (root, actionable) => {
  const handlerTuplesString = actionable.getAttribute(actionAtt)
  const expr = `with(arguments[0]){ return { ${handlerTuplesString} } }`
  return (Function(expr))(controller(root))
}

for (const root of document.querySelectorAll(`[${ctrlAtt}]`))
  for (const actionable of root.querySelectorAll(actionSelector))
    for (const [k,v] of Object.entries(eventHandlers(root, actionable)))
      actionable.addEventListener(k, v)
