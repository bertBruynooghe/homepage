const ctrlAtt = 'data-controller'

const ctrlName = el => el.getAttribute(ctrlAtt)
const getRoot =
  ({ parentElement: el }) => ctrlName(el) ? el : getRoot(el.parentElement)

window.handleBy = 
  ([methodName]) => {
    console.log({ methodName })
    getRoot(window.event.currentTarget)
    .controller[methodName](window.event)
  }

for (const el of document.querySelectorAll(`[${ctrlAtt}]`)){
  console.log('loaded controller', ctrlName(el))
  el.controller = controllers[ctrlName(el)](el)
}
