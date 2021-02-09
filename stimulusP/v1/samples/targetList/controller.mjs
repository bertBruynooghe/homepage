controllers.slideshow = (root, { slide }) => {
  let index = 0

  const showSlide = () => {
    index = index % slide.length
    slide.forEach((element, i) => element.hidden = index !== i)
  }

  showSlide()

  return {
    next: () => showSlide(++index),
    previous:() => showSlide(--index)
  }
}
