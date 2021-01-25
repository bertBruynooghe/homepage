# stimulus-minimal
pure javascript implementation of stimulus-like coding paradigm

## Stimulus: is it worth the 45kB?

Don’t get me wrong: I do like the idea of Stimulus, but I’m not sure if it’s worth the 45kB. And the syntax for actions: `data-action="change->start-message#close`: seriously?

Also, the class inheritance API seems so 2018… What if we keep the good 'convention over configuration' of Rails (Stimulus’ stepdad) and try to come up with a minimal implementation the feels more natural to HTML/JavaScript developers?

So here's my take on implementing [Stimulus](https://stimulus.hotwire.dev/handbook/introduction),using following technologies/constraints:

* browser only, not build technologies involved
* HTML5 (to be able to access elements with `id="xxx"` directly as `window.xxx` or `xxx`)
* browser ESModule support

### Hello, Stimulus
(after [this](https://stimulus.hotwire.dev/handbook/hello-stimulus))

```
<div id="test">
  <script
    src="./controllers/hello.mjs"
    type="module" 
    onLoad="ctrl(this)"></script>

  <input data-target="name: test" type="text">
  <button onClick="test.greet()">Greet</button>
</div>
```

```
import '../control.mjs'

export const createController = () => ({
  greet: ({ name }) => console.log(`Hello, ${name.value}!`)
})
```

Some differences to spot here:

* binding the controller to the root element is a bit more verbose, since it requires
  assigning an `id` to it, and adding the script tags somewhere in the body of the root element. `type="module"` for the script is necessary, as the script itself loads a module, and it has the extra advantage that you can add it many times without the code being reloaded.
  Also remark that no central registering of the controllers needs to happen.
* instead of `data-xxx-action=...`, I chose for the regular inline event handling syntax.
  What good is it to extract javascript from the HTML simply to replace it with other code
  in a syntax no JavaScript/HTML developer will be comfortable with? I also decided to explicitly reference the root element in here (I could probably have relied on the fact in being inside the container), but this was a simpler implementation, and it solves issues
  with nested controllers. (Mmm, maybe I'll revisit that one later, though, since it allows cross-linking between components, and that feels nasty.)
* no freakin' classes for the controllers, just plain simple closures. `control.mjs` is   
  imported here for 'registering' the controller... (more on this file further on)
