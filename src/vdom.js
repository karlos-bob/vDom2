const { document } = window;

const patchProp = (node, key, value, nextValue) => {
  // Если новое значение не задано, то удаляем атрибут(проп)
  if (!nextValue) {
    node.removeAttribute(key);
    return;
  }

  // Устанавливаем новое значение атрибута
  node.setAttribute(key, nextValue);
};

const patchProps = (node, prevProps, nextProps) => {
  // Объект с общими свойствами
  const mergeProps = { ...prevProps, ...nextProps };

  // console.dir({
  //   node,
  //   prev: prevProps,
  //   next: nextProps,
  //   merged: mergeProps,
  // });

  Object.keys(mergeProps).forEach((key) => {
    // Если значение ИЗМЕНИЛОСЬ, то ДЕЛАЕМ ПАТЧ пропсов;
    // Если значение НЕ ИЗМЕНИЛОСЬ, то НИЧЕГО НЕ ОБНОВЛЯЕМ;
    if (prevProps[key] !== nextProps[key]) {
      patchProp(node, key, prevProps[key], nextProps[key]);
    }
  });
};

const patchChildren = (parentNode, prevVChildren, nextVChildren) => {
  parentNode.childNodes.forEach((childNode, i) => {
    patchNode(childNode, prevVChildren[i], nextVChildren[i]);
  });

  // С помощью slice мы получаем массив из дочерних нод,
  //  которые необходимо просто вставить в родительскую DOM-ноду
  nextVChildren.slice(prevVChildren.length).forEach((vChild) => {
    parentNode.append(createDOMNode(vChild));
  });
};

// патчим ноду
export const patchNode = (node, prevVNode, nextVNode) => {
  // Удаляем ноду, если значение "nextVNode" не задано
  if (nextVNode === undefined) {
    node.remove();
    return;
  }

  if (typeof prevVNode === 'string' || typeof nextVNode === 'string') {
    // Заменяем ноду на новую, если как минимум одно из значений равно строке
    // и эти значения не равны друг другу
    if (prevVNode !== nextVNode) {
      const nextNode = createDOMNode(nextVNode);
      node.replaceWith(nextNode);
    }

    // Если два значения - это строки и они равны,
    // просто возвращаем текущую ноду
    return node;
  }

  // Заменяем ноду на новую, если теги не равны
  if (prevVNode.tagName !== nextVNode.tagName) {
    const nextNode = createDOMNode(nextVNode);
    node.replaceWith(nextNode);
    return nextNode;
  }

  patchProps(node, prevVNode.props, nextVNode.props);

  patchChildren(node, prevVNode.children, nextVNode.children);

  // Возвращаем обновленный DOM-элемент
  return node;
};

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
  // Object.entries(props).forEach(([key, value]) => {
  //   node.setAttribute(key, value);
  // });
  patchProps(node, {}, props);

  // Recursively process child nodes
  children.forEach((child) => {
    node.append(createDOMNode(child));
  });

  return node;
};
