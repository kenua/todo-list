'use strict';

import uniqid from 'uniqid';
import sanitizeText from '../utils/sanitizeText.js';

const storage = (function() {
   let _todos = [];
   let _folders = [];
   let _defaultFolder = 'todos';

   const getFolders = function() {
      return [..._folders];
   };

   const addFolder = function(name) {
      let newFolderName = name;

      newFolderName = sanitizeText(String(newFolderName));

      if (newFolderName && !_folders.includes(newFolderName) && newFolderName !== _defaultFolder) {
         _folders.push(newFolderName);
      } else {
         throw new Error('Folder name is invalid');
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

      _todos.forEach(todo => {
         let { id, title, desc, priority, folder } = todo;
         let copy = { id, title, desc, priority, folder, reminder: null, checklist: [] };

         if (todo.reminder) copy.reminder = new Date(todo.reminder);

         for (let i = 0; i < todo.checklist.length; i++) {
            let checklistItemCopy = {...todo.checklist[i]};
            copy.checklist.push(checklistItemCopy);
         }

         todosCopy.push(copy);
      });

      return todosCopy;
   };

   const addTodo = function(todoObj, folderName) {
      folderName = sanitizeText(String(folderName));

      if (todoObj instanceof Object && folderName) {
         todoObj.folder = (_folders.includes(folderName)) ? folderName : _defaultFolder;
         todoObj.id = uniqid();
         _todos.push(todoObj);
      }
   };

   const removeTodo = function(id) {
      _todos = _todos.filter(todo => todo.id !== id);
   };

   const editTodo = function(id, opt) {
      if (opt instanceof Object) {
         let { title, desc, checklist, reminder, priority } = opt;
         let [ todo ] = _todos.filter(todo => todo.id === id);
   
         if (title) todo.title = sanitizeText(title);
         if (desc) todo.desc = sanitizeText(desc);
         if (reminder instanceof Date || reminder === null) todo.reminder = reminder;
         if (priority === 'low' || 
             priority === 'medium' || 
             priority === 'high') todo.priority = priority;
         if (checklist && checklist.length > 0) {
            todo.checklist = checklist;
         }
      }
   };

   return {
      getFolders,
      addFolder,
      removeFolder,
      getTodos,
      addTodo,
      removeTodo,
      editTodo,
   };
})();

export default storage;