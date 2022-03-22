import appendModal from './modal.js';
import appendSidebar from './sidebar.js';
import appendTodo from './todo.js';
import storage from '../modules/storage.js';
import Todos from '../modules/todos.js';
import '../test/todoSamples.js';
import todoFolderButton from './markup/todoFolderButton.html';
import customFolderButton from './markup/customFolderButton.html';
import todoItemButton from './markup/todoItemButton.html';

export default function appendMarkup() {
   document.addEventListener('DOMContentLoaded', e => {
      appendModal();
      appendSidebar();
      appendTodo();

      const newFolderBtn = document.querySelector('#new-folder-button');
      const sidebarInputContainer = document.querySelector('#sidebar-input-container');
      const folders = document.querySelector('#folders');

      function createTodoItems(folder) {
         let result = [];

         storage.getTodos().forEach(todo => {
            if (todo.folder === folder) {
               let li = document.createElement('li');
               let content = todoItemButton;
               let priorityColor = (todo.priority === 'low') ? 'blue' :
                                (todo.priority === 'medium') ? 'yellow' : 
                                (todo.priority === 'high') ? 'red' : 'dark';

               content = content.replace(/\[ID\]/g, todo.id);
               content = content.replace(/\[TITLE\]/g, todo.title);
               content = content.replace(/\[PRIORITY-COLOR\]/g, priorityColor);
               li.innerHTML = content;
               result.push(li);
            }
         });

         return result;
      }

      function printTodoFolder() {
         let todoFolder = document.createElement('li');
         let subList = document.createElement('ul');

         todoFolder.innerHTML = todoFolderButton;
         subList.className = 'sidebar__todos-list list-unstyled';
         subList.append( ...createTodoItems('todos') );
         todoFolder.append(subList);
         folders.append(todoFolder);
      }

      function printCustomFolders() {
         storage.getFolders().forEach(folder => {
            let folderButton = document.createElement('li');
            let subList = document.createElement('ul');

            folderButton.innerHTML = customFolderButton.replace(/\[FOLDER\]/g, folder);
            subList.className = 'sidebar__todos-list list-unstyled';
            subList.append( ...createTodoItems(folder) );
            folderButton.append(subList);
            folders.append(folderButton);
         });
      }

      function printSidebarContent() {
         folders.innerHTML = '';
         printTodoFolder();
         printCustomFolders();
      }

      printSidebarContent();

      newFolderBtn.addEventListener('click', e => {
         newFolderBtn.style.display = 'none';
         sidebarInputContainer.style.display = 'block';
         sidebarInputContainer.elements['folder-name'].focus();
      });

      sidebarInputContainer.addEventListener('submit', e => {
         let input = sidebarInputContainer.elements['folder-name'];
         let name = input.value;

         try {
            storage.addFolder(name);
            newFolderBtn.style.display = 'block';
            sidebarInputContainer.style.display = 'none';
            input.value = '';
            printSidebarContent();
            console.log(storage.getFolders());
         } catch (e) {
            alert('Your folder name is invalid or a duplicate');
         }

         e.preventDefault();
      });
   });
}