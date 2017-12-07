'use strict';

function createElement(node) {
  if (typeof(node) === 'string') {
    return node
  } else {
    const element = document.createElement(node.name);
    for (var key in node.props) {
      element.setAttribute(key, node.props[key]);
    }
    if (node.childs) {
      node.childs.map(el => {
        if (typeof(el) === 'string') {
          element.textContent = element.textContent + el;
        } else {
          var elChild = createElement(el);
          element.appendChild(elChild);
        }
      })
    }
    return element;
  }
}