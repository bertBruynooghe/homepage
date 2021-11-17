controllers.markdown = async root => {
  console.log('test')
  const result = await fetch(root.getAttribute('data-url'))
  console.log(result)
  const text = await result.text()
  const lines = text.split("\n")
  let newText = ''
  for (const line of lines) {
    newText = `${newText}\n${line}`
    const url = line.match(/```.*\sloadFrom:(\s)*((\S)*)/)?.[2]
    if (url) {
      const inclusion = await (await fetch(url)).text()
      newText = `${newText}\n${inclusion}`
    }
  }
  root.innerHTML = marked(newText)
}
