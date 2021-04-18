import { createVNode, createDOMNode, patchNode } from './vdom';
import { mount } from './dom';

const createVApp = (state) => {
  const { count } = state;

  return createVNode('div', { class: 'container', 'data-count': count }, [
    createVNode('h1', {}, ['This message is from virtual DOM']),
    createVNode('img', {
      src: 'https://miro.medium.com/max/1000/1*jrOT6pHt9ujEEHETrlYCxA.jpeg',
    }),
    createVNode('h1', {}, [`Count: ${count}`]),
  ]);
};

const state = { count: 0 };
let vApp = createVApp(state);
let app = mount(createDOMNode(vApp), document.getElementById('app'));

setInterval(() => {
  state.count++;

  // создаем vDom с новым состоянием счетчика
  const nextVApp = createVApp(state);

  app = patchNode(app, vApp, nextVApp);
  vApp = nextVApp;
}, 1000);
