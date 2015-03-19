'use strict';

var htmlparser = require('htmlparser2');
var h = require('virtual-dom/h');

var attrsMapper = {
  'data-': function (attrs, key, value) {
    (attrs.dataset = attrs.dataset || {})[key.slice(5)] = value;
    
    return attrs;
  },
  'style': function (attrs, key, value) {
    attrs.style = value.split(/;\s?/)
      .filter(function (x) { return x; })
      .reduce(function (styles, decl) {
        var kv = decl.split(/:(.+)/);
        styles[kv[0]] = kv[1].trim();
        
        return styles;
      }, {});
    
    return attrs;
  },
  'class': function (attrs, key, value) {
    attrs.className = value;
    
    return attrs;
  },
  'for': function (attrs, key, value) {
    attrs.htmlFor = value;
    
    return attrs;
  }
};

function vdomFrom(node) {
  if (node.type === 'text') { return node.data; }
  
  var attributes = Object.keys(node.attribs).reduce(function (attrs, key) {
      var value = node.attribs[key];
      var mapkey = key.slice(0, 5);
      return mapkey in attrsMapper
        ? attrsMapper[mapkey](attrs, key, value)
        : (attrs[key] = value, attrs);
  }, {});
  var children = node.children.map(vdomFrom);
  
  return h(node.name, attributes, children);
}

module.exports = function (html, callback) {
  callback = callback || function (error) {
    if (error) {
      throw error;
    }
  };
  
  var vdom;
  var parser = new htmlparser.Parser(new htmlparser.DomHandler(
    function (error, nodelist) {
      if (error) {
        callback(error);
      }

      if (nodelist.length > 1) {
        callback(new Error(
          'Parse Error: You must have only one top level elemet'
        ));
      }

      callback(undefined, (vdom = vdomFrom(nodelist[0])));
    }
  ));
  
  parser.write(html.replace(/\n|\s\s/g, ''));
  parser.done();
  
  return vdom;
};
