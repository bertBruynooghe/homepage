for (const el of document.querySelectorAll('[data-controller]'))
  controllers[el.getAttribute('data-controller')](el)
