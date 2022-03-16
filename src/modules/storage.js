'use strict';

import uniqid from 'uniqid';

const storage = {
   todos: [],
   folders: [],
   defaultFolder: 'todos',

   addFolder(name) {
      let newFolderName = name;

      newFolderName = String(newFolderName).trim().replace(/[\<\>\/\\]/ig, '');

      if (newFolderName && !this.folders.includes(newFolderName) && newFolderName !== 'todos') {
         this.folders.push(newFolderName);
      }
   },

   removeFolder(name) {
      for (let i = 0; i < this.todos.length; i++) {
         if (this.todos[i].folder === name) this.todos[i].folder = 'todos';
      }

      this.folders = this.folders.filter(folder => folder !== name);
   },

   addTodo(todoObj, folderName) {
      folderName = String(folderName).trim().replace(/[\<\>\/\\]/ig, '');

      if (todoObj instanceof Object && folderName) {
         todoObj.folder = (this.folders.includes(folderName)) ? folderName : 'todos';
         todoObj.id = uniqid();
         this.todos.push(todoObj);
      }
   },

   removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
   },
};

export default storage;