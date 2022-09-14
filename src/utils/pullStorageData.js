import storage from '../modules/storage.js';

function pullStorageData() {
   let folders = localStorage.getItem('folders');
   let todos = localStorage.getItem('todos');

   folders = JSON.parse(folders);
   folders.forEach( folder => storage.addFolder(folder) );
   todos = JSON.parse(todos);
   todos.forEach(todo => {
      if (todo.reminder) {
         todo.reminder = new Date(todo.reminder);
      }
      storage.addTodo(todo, todo.folder);
   });
}

export default pullStorageData;