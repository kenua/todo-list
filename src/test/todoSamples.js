import storage from '../modules/storage.js';
import Todos from '../modules/todos.js';

storage.addFolder('tasks');

storage.addTodo(
   new Todos('Clean my room', 'My room is a mess, I should clean it!', new Date(), 'medium', true),
);
storage.addTodo(
   new Todos('Take out trash', 'The trash bag is full, better take it out.', null, 'high', false),
);
storage.addTodo(
   new Todos('Finish MadWorld', 'Fun game', null, 'low', false),
);

storage.addTodo(
   new Todos('Finish todo list project', 'Finish that project and continue the curriculum', new Date(2023, 11, 15), 'high', false),
   'tasks'
);

storage.addTodo(
   new Todos('Finish TheOdinProject corriculum', 'Finish it to become a web developer', new Date(2922, 1, 27), 'high', false),
   'tasks'
);

storage.editTodo(storage.getTodos()[0].id, {
   title: 'Clean room'

});