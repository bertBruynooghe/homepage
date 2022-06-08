# Typeahead / autocomplete

On webpages with forms, one often needs the type of text inputs that require a dropdown with autocomplete suggestions. I have been using [Twitter's typeahead.js](https://twitter.github.io/typeahead.js/), [React Select](https://react-select.com/home), and some others for these cases. But it always felt a bit wrong, for various reasons:
* Most of the time, people introduce these solutions not being aware it leaves no-javascript users in the cold (or even break the website for them).
* These kind of libraries tend to clash with other libraries, especially when using a different CSS framework than was considered by the author.
* They usually behave differently from what you wanted, making you want to tweak them a little. Which turns out to be more difficult than you thought.
* Their usage seems often too complex for the simple problem you're trying to solve.
* How hard can it be to write it yourself?

So, let's see what are the alternatives...

## &lt;datalist&gt;

Let's take the example from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist):
<iframe src="./simpleDatalist.html"></iframe>

```html loadFrom: ./simpleDatalist.html
```

While this looks okay at first glance, there are several issues with this, which [Lea Verou](https://projects.verou.me/awesomplete/) already pointed out:
* it is hard to style this the way you want
* the behaviour is quite inconsistent over different browsers. (Safari on iOS doesn't even show a dropdown on the first click, it simply overrides the autocomplete options in the on screen keyboard. On second click, it displays the dropdown. But that might be what you want in some cases.)

That being said: it is an improvement in non-javascript environments over having a simple text input, so let's start from here to enhance this thing.

## simple dynamic &lt;datalist&gt;

The first improvement would be to create a dynamic version of this by dynamically fetching/filling in the datalist while typing. This is a solution that has been put forward by people like [Raymond Camden](https://www.raymondcamden.com/2012/06/14/example-of-a-dynamic-html5-datalist-control/), but unfortunately it doesn't work out as intended, even in the simplest usecases. 
It doesn't seem to work on all mainstream browsers: when opening the datalist dropdown, Safari seems to consider the contents of the datalist BEFORE processing the event, making the solution browser dependent. Furthermore, the solution also only works if you have datalist entries that [start exactly with the characters you typed](https://lea.verou.me/2015/02/awesomplete-2kb-autocomplete-with-zero-dependencies/).

<!-- So without further ado, let's continue to another solution: -->

<!-- ## pure server-side typeahead-like interface

The best solution seems to me to replace the datalist with a list of submit buttons, as this 

<iframe src="./simpleDatalist.html"></iframe>

```html loadFrom: ./simpleDatalist.html
```

Also note you could use the same mechanism with checkboxes in the generated HTML page if you want similar behaviour, but it will cost you page resfreshes... 

## dynamic datalist with forms alone
The previous solution has a number of drawbacks: if no styling is applied to render the radiobuttons panel to look like a regular dropdown, the enduser is left in the dark about the semantics of this radiobutton list. Furthermore, page layout changes like closing the dropdown are not what a user expects when clicking a radio button.
So let's replace the generated radiobuttons in the previous example with submit buttons, as this is where a user expects screen changes. For the sake of the example, the form handling will be done using javascript, but it would be more logical to handle the form at the backend server.

If you go for this solution, make sure you don't have other submits above the search submit, since the first submit in the form will triggered when hitting enter in the input field. Also, make sure no other textinputs are in the form, as hitting enter there wil trigger the search submit too. 

(If this is a problem to you, look forward to my article about creating a no-js forms wizard.)

## &lt;datalist&gt; to functionally styled checkbox list

Ideally this would have to look like some select on steroids, especially considering the behaviour of
safari in iOS , so let's crudely style the listbox solution, without breaking the look and feel in case there's no javascript: -->