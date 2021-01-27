# StimulusP

## Stimulus: is it worth the 45kB?

Don’t get me wrong: I do like the idea of Stimulus, but I’m not sure if it’s worth the 45kB. And the syntax for actions: `data-action="change->start-message#close`: seriously?

Also, the class inheritance API seems so 2018… What if we keep the good 'convention over configuration' of Rails (Stimulus’ stepdad) and try to come up with a minimal implementation the feels more natural to HTML/JavaScript developers?

So here's my take on implementing [Stimulus](https://stimulus.hotwire.dev/handbook/introduction), only using browser technology (but nothing prevents you from using it in the build system of your choice).

### Let's get started

To start, we're going simply add the `data-controller` tag to an element of the HTML:

```
  <div data-controller='simple'></div>
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
  <iframe
    width="300"
    height="50"
    src="./simple.html">
  </iframe>
</p>