import { createVNode, createDOMNode } from './vdom';
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
const app = document.getElementById('app');
mount(createDOMNode(createVApp(state)), app);

setInterval(() => {
  state.count++;
  mount(createDOMNode(createVApp(state)), app);
}, 1000);
