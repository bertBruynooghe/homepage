controllers.hello = root => ({
  greet: event => {
    root.innerHTML  =`Hello`
    console.log(event)
  }
})