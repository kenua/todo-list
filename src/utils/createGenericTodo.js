import Todos from '../modules/todos.js';
import storage from '../modules/storage.js';

function createGenericTodo() {
   let welcomeTodo = new Todos(
      'Welcome',
      'Create a new todo item using the "+" button',
      [],
      null,
      'low',
   );
   let test2 = new Todos(
      'test2',
      'This todo is for checking the finished prop of a checklist item',
      ['thing', 'thing2', 'thing3'],
      null,
      'high',
   );
   /*
   let welcomeTodo = new Todos(
      'Welcome',
      'Create a new todo item using the "+" button',
      null,
      'low',
      false,
   );
   */
   storage.addTodo(welcomeTodo, 'todos');
   storage.addTodo(test2, 'todos');

   let todoId = storage.getTodos()[1].id;
   let taskId = storage.getTodos()[1].checklist[0].id;

   storage.checkTask(todoId, taskId);
}

export default createGenericTodo;