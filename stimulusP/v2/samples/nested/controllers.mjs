controllers.parent = root => ({
  handleChildClick: () => root.innerHTML =`I received the child click!`
})

controllers.child = root => ({
  handleClick: () => root.dispatchEvent(new CustomEvent('childClick'))
})