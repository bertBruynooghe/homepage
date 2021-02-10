controllers.nested = root => ({
  handleChildClick: () => root.innerHTML =`I received the child click!`,
  handleClick: () => root.dispatchEvent(new CustomEvent('childClick'))
})
