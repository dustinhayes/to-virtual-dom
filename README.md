# to-virtual-dom

[![Build Status](https://travis-ci.org/dustinhayes/to-virtual-dom.svg?branch=master)](https://travis-ci.org/dustinhayes/to-virtual-dom)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/dh--to-virtual-dom.svg)](https://saucelabs.com/u/dh--to-virtual-dom)

> Convert an html string into a virtual dom instance

# Install

from `npm`

```
npm install --save to-virtual-dom
```

# API

# `tovdom(html, [callback])`

Pass an html string to be parsed and converted into a virtual dom instance. The optional callback will be passed the virtual dom instance, which will also be returned by `tovdom`.

```javascript
var tovdom = require('to-virtual-dom');

var html = '<div id="yay"><span>smelly cat</span></div>';
var vdom = tovdom(html);

vdom.properties.id; // => yay
vdom.children[0].text; // => smelly cat
```

# License

MIT
