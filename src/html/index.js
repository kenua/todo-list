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
      const modal = document.querySelector('#modal');
      const modalTitle = document.querySelector('#modal__title');

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

      function openModal(folder) {
         modal.classList.remove('modal--hidden');
         modalTitle.textContent = `Create new todo in ${folder} folder`;
      }

      function deleteFolder() {
         if ( confirm(`Do you want to delete "${this.dataset.folder}" folder?`) ) {
            storage.removeFolder(this.dataset.folder);
            printSidebarContent();
         }
      }

      function printTodoFolder() {
         let todoFolder = document.createElement('li');
         let createBtn = document.createElement('button');
         let subList = document.createElement('ul');

         todoFolder.innerHTML = todoFolderButton;

         createBtn.type = 'button';
         createBtn.className = 'sidebar__button';
         createBtn.dataset.folder = "todos";
         createBtn.title = "Add new todo";
         createBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
         createBtn.addEventListener('click', openModal.bind(null, 'todos'));

         subList.className = 'sidebar__todos-list list-unstyled';
         subList.append( ...createTodoItems('todos') );

         todoFolder.firstElementChild.append(createBtn);
         todoFolder.append(subList);
         folders.append(todoFolder);
      }

      function printCustomFolders() {
         storage.getFolders().forEach(folder => {
            let folderButton = document.createElement('li');
            let createBtn = document.createElement('button');
            let deleteBtn = document.createElement('button');
            let subList = document.createElement('ul');

            folderButton.innerHTML = customFolderButton.replace(/\[FOLDER\]/g, folder);

            deleteBtn.type = 'button';
            deleteBtn.className = 'sidebar__button';
            deleteBtn.dataset.folder = folder;
            deleteBtn.title = "Delete folder";
            deleteBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
            deleteBtn.addEventListener('click', deleteFolder.bind(deleteBtn));

            createBtn.type = 'button';
            createBtn.className = 'sidebar__button';
            createBtn.dataset.folder = folder;
            createBtn.title = "Add new todo";
            createBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            createBtn.addEventListener('click', openModal.bind(null, folder));

            subList.className = 'sidebar__todos-list list-unstyled';
            subList.append( ...createTodoItems(folder) );

            folderButton.firstElementChild.lastElementChild.append(deleteBtn, createBtn);
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