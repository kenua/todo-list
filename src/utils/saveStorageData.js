import storage from '../modules/storage.js';

function saveStorageData() {
   let folders = storage.getFolders();
   let todos = storage.getTodos();

   todos = todos.map(todo => {
      if (todo.reminder) {
         todo.reminder = todo.reminder.toDateString();
      }
      return todo;
   });
   folders = JSON.stringify(folders);
   todos = JSON.stringify(todos);
   localStorage.setItem('folders', folders);
   localStorage.setItem('todos', todos);
}

export default saveStorageData;