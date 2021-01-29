# StimulusP

## Stimulus: is it worth the 45kB?

Don’t get me wrong: I do like the idea of Stimulus, but I’m not sure if it’s worth the 45kB. And the syntax for actions: `data-action="change->start-message#close`: seriously?

Also, the class inheritance API seems so 2018… What if we keep the good 'convention over configuration' of Rails (Stimulus’ stepdad) and try to come up with a minimal implementation the feels more natural to HTML/JavaScript developers?

So here's my take on implementing [Stimulus](https://stimulus.hotwire.dev/handbook/introduction), only using browser technology (but nothing prevents you from using it in the build system of your choice).

### Let's get started

To start, we're going simply add the `data-controller` tag to an element of the HTML:

```html loadFrom: ./html-snippets/hello.html
```

and in the script part we'll initialize the controllers const
```
  const controllers = {}
```

we'll register our new controller:
```js loadFrom: ./controllers/simple.mjs
```

and finally our controllers loader:
```js loadFrom: ./controllersLoader.mjs
```

<p>
  Which results in: <br />
  <iframe width="300" height="50" src="./simple.html"></iframe>
</p>

### Time for some action

```html loadFrom: ./html-snippets/hello.html
```

a new controller:
```js loadFrom: ./controllers/hello.mjs
```

and an extended controllers loader:
```js loadFrom: ./controllersLoaderWithEvents.mjs
```

<p>
  Which results in: <br />
  <iframe width="300" height="50" src="./hello.html"></iframe>
</p>

Remark that the syntax for handling events is quite different than Stimulus; 
I didn't want complex parsing, and fancy native inline event handlers.
(I know it's considered bad practice, due to separation of concerns, but the DSL than Stimulus is proposing is no way better in separation of concerns.)