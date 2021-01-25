# stimulus-minimal
pure javascript implementation of stimulus-like coding paradigm

## Stimulus: is it worth the 45kB?

Don’t get me wrong: I do like the idea of Stimulus, but I’m not sure if it’s worth the 45kB. And the syntax for actions: `data-action="change->start-message#close`: seriously?

Also, the class inheritance API seems so 2018… What if we keep the good 'convention over configuration' of Rails (Stimulus’ stepdad) and try to come up with a minimal implementation the feels more natural to HTML/JavaScript developers?

So here's my attempt, using following technologies/constraints:

* browser only, not build technologies involved
* HTML5 (to be able to access elements with `id="xxx"` directly as `window.xxx` or `xxx`)
* browser ESModule support


The first attempt is here: https://bertbruynooghe.github.io/stimulus-minimal/index.html

The demo as of https://stimulus.hotwire.dev is found [here](https://bertbruynooghe.github.io/stimulus-minimal/intro.html)
