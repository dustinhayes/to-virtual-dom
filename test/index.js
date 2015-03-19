'use strict';

var test = require('tape');
var tovdom = require('../src/');

test('should return virtual dom instance', function (assert) {
  var html =
    '<div id="target">' +
      '<span>Hi</span>' +
      '<img src="img.png" alt="">' +
      '<ul>' +
        '<li>' +
          '<span style="background-image: url(http://bg.png);"></span>' +
        '</li>' +
      '</ul>' +
    '</div>';
  var vdom = tovdom(html);

  assert.equal(vdom.tagName, 'DIV');
  assert.equal(vdom.children[2].children[0].children[0]
    .properties.style['background-image'], 'url(http://bg.png)');

  assert.end();
});

test('should throw with two top level elements', function (assert) {
  var html = '<div></div><div></div>';

  assert.throws(tovdom.bind(null, html));

  assert.end();
});
