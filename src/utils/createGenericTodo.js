import Todos from '../modules/todos.js';
import storage from '../modules/storage.js';

function createGenericTodo() {
   let welcomeTodo = new Todos(
      'Welcome',
      'Create a new todo item using the "+" button',
      null,
      'low',
      false,
   );

   storage.addTodo(welcomeTodo);
}

export default createGenericTodo;