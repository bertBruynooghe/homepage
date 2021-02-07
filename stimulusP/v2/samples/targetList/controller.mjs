controllers.slideshow = (_, { slide }) => {
  let index = 0
  const showSlide = () => {
    index = index % [].concat(slide).length;
    [].concat(slide).forEach((element, i) => element.hidden = index !== i)
  }

  showSlide()

  return {
    next: () => showSlide(++index),
    previous:() => showSlide(--index)
  }
}
