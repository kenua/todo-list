import appendModal from './modal.js';
import appendSidebar from './sidebar.js';
import appendTodo from './todo.js';
import storage from '../modules/storage.js';
import Todos from '../modules/todos.js';
import '../test/todoSamples.js';
import todoFolderButton from './markup/todoFolderButton.html';
import customFolderButton from './markup/customFolderButton.html';
import todoItemButton from './markup/todoItemButton.html';
import sanitizeText from '../utils/sanitizeText.js';

export default function appendMarkup() {
   document.addEventListener('DOMContentLoaded', e => {
      appendModal();
      appendSidebar();
      appendTodo();

      const newFolderBtn = document.querySelector('#new-folder-button');
      const sidebarInputContainer = document.querySelector('#sidebar-input-container');
      const folders = document.querySelector('#folders');
      const modal = document.querySelector('#modal');
      const modalForm = document.querySelector('#modal-form');
      const modalTitle = document.querySelector('#modal__title');
      const reminderBtn = document.querySelector('#reminder-button');
      const reminderContainer = document.querySelector('#reminder-container');
      const modalErrorMsg = document.querySelectorAll('.modal__error-msg');
      let submissionType = null;
      let newTodoFolder = null;
      let todoId = null;

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
         let today = new Date();

         submissionType = 'new';
         newTodoFolder = folder;
         modal.classList.remove('modal--hidden');
         modalTitle.textContent = `Create new todo in ${folder} folder`;
         modalForm.elements.day.value = today.getDate();
         modalForm.elements.month.value = today.getMonth() + 1;
         modalForm.elements.year.value = today.getFullYear();
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

      function closeModal() {
         modal.classList.add('modal--hidden');
         
         // reset modal field values
         modalForm.elements.title.value = '';
         modalForm.elements.description.value = '';
         modalForm.elements.priority.value = 'low';
         reminderBtn.value = 'off';
         reminderBtn.textContent = 'OFF';
         reminderContainer.classList.remove('reminder--show');
         reminderContainer.classList.add('reminder--hidden');
         modalForm.elements.day.value = '';
         modalForm.elements.month.value = '';
         modalForm.elements.year.value = '';
         [...modalErrorMsg].forEach(erroMsg => erroMsg.classList.remove('modal__error-msg--show'));
      }

      function toggleReminderContainer(e) {
         let target = e.target;

         if (target.value === 'off') {
            target.value = 'on';
            target.textContent = 'ON';
            reminderContainer.classList.remove('reminder--hidden');
            reminderContainer.classList.add('reminder--show');
         } else {
            target.value = 'off';
            target.textContent = 'OFF';
            reminderContainer.classList.remove('reminder--show');
            reminderContainer.classList.add('reminder--hidden');
         }
      }

      function validateSubmission() {
         let { title, description, priority, reminder, day, month, year } = modalForm.elements;
         let submitForm = true;

         if (sanitizeText(title.value).length === 0 || sanitizeText(title.value).length > 50) {
            title.nextElementSibling.classList.add('modal__error-msg--show');
            submitForm = false;
         } else {
            title.nextElementSibling.classList.remove('modal__error-msg--show');
         }

         if (sanitizeText(description.value).length === 0 || sanitizeText(description.value).length > 50) {
            description.nextElementSibling.classList.add('modal__error-msg--show');
            submitForm = false;
         } else {
            description.nextElementSibling.classList.remove('modal__error-msg--show');
         }

         if (priority.value !== 'low' && priority.value !== 'medium' && priority.value !== 'high') {
            submitForm = false;
         }

         if (reminder.value === 'on') {
            if ( (day.value < 1 || day.value > 32) || 
                 (month.value < 1 || month.value > 12) ||
                 year.value < 1970) {
               reminderContainer.lastElementChild.classList.add('modal__error-msg--show');
               submitForm = false;
            } else {
               reminderContainer.lastElementChild.classList.remove('modal__error-msg--show');   
            }
         } else {
            reminderContainer.lastElementChild.classList.remove('modal__error-msg--show');
         }

         return submitForm;
      }

      function handleSubmission(e) {
         e.preventDefault();

         if (validateSubmission()) {
            // create new todo
            if (submissionType === 'new') {
               let { title, description, priority, reminder, day, month, year } = modalForm.elements;
               let dueDate = (reminder.value === 'on') ? new Date(+year.value, +month.value, +day.value) : null;
               let newTodo = new Todos(
                  sanitizeText(title.value),
                  sanitizeText(description.value),
                  dueDate,
                  priority.value,
                  false
               );

               storage.addTodo(newTodo, newTodoFolder);
               printSidebarContent();
               closeModal();
            }

            // edit todo
            if (submissionType === 'edit') {
            }
         }
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

      modal.addEventListener('click', e => (e.target.id === 'modal' || e.target.id === 'cancel-button') ? closeModal() : null);
      reminderBtn.addEventListener('click', toggleReminderContainer);
      modalForm.addEventListener('submit', handleSubmission);
   });
}