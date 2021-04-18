export const mount = (node, target) => {
  target.appendChild(node);
  // target.replaceWith(node);
  return node;
};
