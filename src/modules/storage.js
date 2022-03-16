'use strict';

import uniqid from 'uniqid';

const storage = (function() {
   let _todos = [];
   let _folders = [];
   let _defaultFolder = 'todos';

   const getFolders = function() {
      return [..._folders];
   };

   const addFolder = function(name) {
      let newFolderName = name;

      newFolderName = String(newFolderName).trim().replace(/[\<\>\/\\]/ig, '');

      if (newFolderName && !_folders.includes(newFolderName) && newFolderName !== _defaultFolder) {
         _folders.push(newFolderName);
      }
   };

   const removeFolder = function(name) {
      for (let i = 0; i < _todos.length; i++) {
         if (_todos[i].folder === name) _todos[i].folder = _defaultFolder;
      }

      _folders = _folders.filter(folder => folder !== name);
   };

   const getTodos = function() {
      let todosCopy = [];

      _todos.forEach(todo => todosCopy.push( Object.assign({}, todo) ));
      return todosCopy;
   };

   const addTodo = function(todoObj, folderName) {
      folderName = String(folderName).trim().replace(/[\<\>\/\\]/ig, '');

      if (todoObj instanceof Object && folderName) {
         todoObj.folder = (_folders.includes(folderName)) ? folderName : _defaultFolder;
         todoObj.id = uniqid();
         _todos.push(todoObj);
      }
   };

   const removeTodo = function(id) {
      _todos = _todos.filter(todo => todo.id !== id);
   };

   return {
      getFolders,
      addFolder,
      removeFolder,
      getTodos,
      addTodo,
      removeTodo,
   };
})();

export default storage;