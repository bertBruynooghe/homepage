# StimulusP

## Stimulus: is it worth the 45kB?

Don’t get me wrong: I do like the idea of Stimulus, but I’m not sure if it’s worth the 45kB. And the syntax for actions: `data-action="change->start-message#close`: seriously?

Also, the class inheritance API seems so 2018… What if we keep the good 'convention over configuration' of Rails (Stimulus’ stepdad) and try to come up with a minimal implementation the feels more natural to HTML/JavaScript developers?

So here's my second take on implementing [Stimulus](https://stimulus.hotwire.dev/handbook/introduction), only using browser technology (but nothing prevents you from using it in the build system of your choice). (If you're interested: here's my [previous attempt](../v1/index.html) along with the description why it failed.)

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
I didn't want complex parsing, so I depend on `Function` to get it working.  
(I do fancy native inline event handlers, but they're not supporting the custom
events we'll need later. I'm deliberately breaking the convention not to use
`Function`; if you insist, you can write you own version using JSON in `data-action` instead and parse it using `JSON.stringify`, but I found that too ugly.)
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

<p>
  Which results in: <br />
  <iframe width="300" height="50" src="./samples/targetedHello/index.html"></iframe>
</p>

### ...and lists

```html loadFrom: ./samples/targetList/snippet.html
```

a new controller:
```js loadFrom: ./samples/targetList/controller.mjs
```

and an extended controllers loader:
```js loadFrom: ./controllersLoaderWithTargetListEvents.mjs
```

<p>
  Which results in: <br />
  <iframe width="300" height="100" src="./samples/targetList/index.html"></iframe>
</p>

### Nested 'components'

This is the area where Stimulus falls short/is fuzzy: what if you have two nested instances of the same controller? To solve this problem, I scoped the targets and
actions of the controller to the non-overlapping zones. So if you want to propagate
an action from the inner controller to the outer, you have to dispatch a custom event
in the child, and add an action to it in the parent. That away, it resembles the
strict closed nature of most component frameworks, and it also allows to create
clean isolated components using template engines. (I know this digresses from
the goal of Stimulus: 'the JavaScript framework for the HTML you already have',
but it is something I need often.)

```html loadFrom: ./samples/nested/snippet.html
```

the controllers:
```js loadFrom: ./samples/nested/controller.mjs
```

<p>
  Which results in: <br />
  <iframe width="300" height="100" src="./samples/nested/index.html"></iframe>
</p>

### Lifecycle management

Except from the `connect` behavior of Stimulus, I didn't implement any lifecycle management yet since I didn't need it yet. Also, the code as it is now only works on the initial loaded HTML, not on items that have been added dynamically.
I plan to add that later...
