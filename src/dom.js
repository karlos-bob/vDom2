export const mount = (node, target) => {
  if (!target.firstChild) {
    target.append(node);
  } else {
    target.firstChild.replaceWith(node);
  }
  return node;
};
