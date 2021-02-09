controllers.parent = (root, { child }) =>
  child.addEventListener('childClicked', () => (root.innerHTML =`I received the child click!`))

controllers.child = root => ({
  clicked: () => root.dispatchEvent(new CustomEvent('childClicked')) 
})