import '../control.mjs'

export const createController = (root, { slide }) => {  
  let index = 0

  const showCurrentSlide = index  =>
    slide.forEach((element, i) => (element.hidden = i !== index % slide.length))
  
  showCurrentSlide(index)

  return {
    next: () => showCurrentSlide(++index),
    previous: () => this.showCurrentSlide(--index)
  }
}