import Todos from '../modules/todos.js';
import storage from '../modules/storage.js';

function createGenericTodo() {
   let welcomeTodo = new Todos(
      'Welcome',
      'Start creating new todos using the "+" button next to a folder. To create new folders just click the "new folder" button and give it a name.',
      null,
      'low',
      false,
   );

   storage.addTodo(welcomeTodo);
}

export default createGenericTodo;