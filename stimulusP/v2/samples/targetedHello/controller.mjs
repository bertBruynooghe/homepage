controllers.hello = root => ({
  greet: (_, { name }) => {
    root.innerHTML  =`Hello, ${name.value}`
  }
})
