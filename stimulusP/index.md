# StimulusP

## Stimulus: is it worth the 45kB?

Don’t get me wrong: I do like the idea of Stimulus, but I’m not sure if it’s worth the 45kB. And the syntax for actions: `data-action="change->start-message#close`: seriously?

Also, the class inheritance API seems so 2018… What if we keep the good 'convention over configuration' of Rails (Stimulus’ stepdad) and try to come up with a minimal implementation the feels more natural to HTML/JavaScript developers?

So here's my take on implementing [Stimulus](https://stimulus.hotwire.dev/handbook/introduction), only using browser technology (but nothing prevents you from using it in the build system of your choice).

### Let's get started

To start, we're going simply add the `data-controller` tag to an element of the HTML:

```html loadFrom: ./samples/simple/snippet.html
```

and in the script part we'll initialize the controllers const
```
  const controllers = {}
```

we'll register our new controller:
```js loadFrom: ./samples/simple/controller.mjs
```

and finally our controllers loader:
```js loadFrom: ./controllersLoader.mjs
```

<p>
  Which results in: <br />
  <iframe width="300" height="50" src="./samples/simple/index.html"></iframe>
</p>

### Time for some action

```html loadFrom: ./samples/hello/snippet.html
```

a new controller:
```js loadFrom: ./samples/hello/controller.mjs
```

and an extended controllers loader:
```js loadFrom: ./controllersLoaderWithEvents.mjs
```

<p>
  Which results in: <br />
  <iframe width="300" height="50" src="./samples/hello/index.html"></iframe>
</p>

Several things to mention here:
* the syntax for handling events is quite different compared to Stimulus: 
I didn't want complex parsing, and I fancy native inline event handlers.
(I know it's considered bad practice due to separation of concerns, but the DSL that Stimulus is proposing is no way better in that area.)
* feel free to change the function name `handleBy` in whatever your feel fits your taste best.
(It'd better be good, since it's a part of the root variables of the page.)
* contrary to Stimulus, the name of the controller isn't passed along in the HMTL.
  Actions are strictly scoped to the closest data-controller ancestor. (Also see the part on targets and nested elements for more explanation.)

### Everybody needs some target

```html loadFrom: ./samples/targetedHello/snippet.html
```

a new controller:
```js loadFrom: ./samples/targetedHello/controller.mjs
```

and an extended controllers loader:
```js loadFrom: ./controllersLoaderWithTargetedEvents.mjs
```

### ...and lists

```html loadFrom: ./samples/targetList/snippet.html
```

a new controller:
```js loadFrom: ./samples/targetList/controller.mjs
```

and an extended controllers loader:
```js loadFrom: ./controllersLoaderWithTargetListEvents.mjs
```