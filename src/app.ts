import * as fromStore from './store';

import { renderTodos } from './utils';
import { AddTodo } from './store';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer
};

// const store = new fromStore.Store(reducers);
// console.log(store.value);

const store = new fromStore.Store(reducers);

console.log('This is from app.ts(store value)', store.value);


button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };
    console.log('payload from app.ts(click event)', payload);

    store.dispatch(new fromStore.AddTodo(payload));

    // store.dispatch({
    //   type: fromStore.ADD_TODO,
    //   payload
    // });
    console.log('from app.ts -> inside click fn()',store.value);

    input.value = '';
  },
  false
);


const unsubscribe = store.subscribe(state => {
  renderTodos(state.todos.data);
});


destroy.addEventListener('click', unsubscribe);


todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    console.log(target);
    const todo = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new fromStore.RemoveTodo(todo));
  }
});


store.subscribe(state => console.log('STATE:::', state));
