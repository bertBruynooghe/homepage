# Count indicator in menu

A common pattern in webapps is a count indicator appearing in the navigation bar (for unread items, items to process, ...). 

In the textbook example of the Bulma documentation, it looks like it's preferable to have it aligned flush right to the burger menu (mobile), or immediately in form of the menubar.
Unfortunately, it is a bit less straightforward then expected.
Here is my solution, and some explanation where it diverts from the Bulma textbook examples:

* the `navbar-item` to contain the indicator needs to expand up to the burger, and the item in it should be positioned on the right.
* By default, the `navbar-menu` takes priority over the `navbar-brand` as to growing, which makes the menu to align flush to the brand, iso. to other way around. So we had to change the grow weights of both elements. (Not completely comforatble with this, as we don't understand why it is done this way by Bulma.)

```html loadFrom: ./code.html
```

<iframe src="./code.html"></iframe>
