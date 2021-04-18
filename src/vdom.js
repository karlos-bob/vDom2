const { document } = window;

export const createVNode = (tagName, props = {}, children = []) => {
  return { tagName, props, children };
};

export const createDOMNode = (vNode) => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  const { tagName, props, children } = vNode;

  // create REAL DOM node
  const node = document.createElement(tagName);

  // Add attributes to DOM node
  Object.entries(props).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });

  // Recursively process child nodes
  children.forEach((child) => {
    node.append(createDOMNode(child));
  });

  return node;
};
