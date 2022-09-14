import './sass/styles.scss';
import uniqid from 'uniqid';
import storage from './modules/storage.js';
import Todos from './modules/todos.js';
import sanitizeText from './utils/sanitizeText.js';
import appendModal from './html/modal.js';
import appendSidebar from './html/sidebar.js';
import appendTodo from './html/todo.js';
import todoTaskItem from './html/markup/todoTaskItem.html';
import todoFolderButton from './html/markup/todoFolderButton.html';
import customFolderButton from './html/markup/customFolderButton.html';
import todoItemButton from './html/markup/todoItemButton.html';
import modalTaskItem from './html/markup/modalTaskItem.html';
import saveStorageData from './utils/saveStorageData.js';
import pullStorageData from './utils/pullStorageData.js';
import createGenericTodo from './utils/createGenericTodo.js';

document.addEventListener('DOMContentLoaded', () => {
   appendModal();
   appendSidebar();
   appendTodo();

   const newFolderBtn = document.querySelector('#new-folder-button');
   const newFolderForm = document.querySelector('#new-folder-form');
   const folders = document.querySelector('#folders');
   const modal = document.querySelector('#modal');
   const modalForm = document.querySelector('#modal-form');
   const { 
      title: titleField, 
      description: descField, 
      'checklist-name': checklistNameField,
      priority: priorityField,
      day: dayField, 
      month: monthField, 
      year: yearField,
   } = modalForm.elements;
   const modalTitle = document.querySelector('#modal__title');
   const modalChecklistContainer = document.querySelector('#checklist-container');
   const modalAddTaskBtn = document.querySelector('#checklist-add-button');
   const reminderBtn = document.querySelector('#reminder-button');
   const reminderContainer = document.querySelector('#reminder-container');
   const modalErrorMsg = document.querySelectorAll('.modal__error-msg');
   const todoContainer = document.querySelector('#todo');
   const todoTitle = document.querySelector('#todo-title');
   const todoReminder = document.querySelector('#todo-reminder');
   const todoDesc = document.querySelector('#todo-desc');
   const todoChecklistHeading = document.querySelector('#checklist-heading');
   const todoChecklist = document.querySelector('#todo-checklist');
   const checkmarkSymbol = document.querySelector('#checkmark-symbol');
   const editTodoBtn = document.querySelector('#edit-todo');
   const deleteTodoBtn = document.querySelector('#delete-todo');
   let submissionType = null;
   let newTodoFolder = null;
   let currentTodoId = null;
   let selectedTodo = null;
   let checklistItems = [];

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

   function deleteFolder(folder) {
      if ( confirm(`Do you want to delete "${folder}" folder?`) ) {
         storage.removeFolder(folder);
         printSidebarContent();
         saveStorageData();
      }
   }

   function printTodo(todoObj) {
      let priorityColor = (todoObj.priority === 'low') ? 'blue' :
                          (todoObj.priority === 'medium') ? 'yellow' : 
                          (todoObj.priority === 'high') ? 'red' : 'dark';

      todoTitle.textContent = todoObj.title;

      if (todoObj.reminder) {
         todoReminder.textContent = `${todoObj.reminder.getDate()}/${todoObj.reminder.getMonth() + 1}/${todoObj.reminder.getFullYear()}`;
         todoReminder.className = `todo__reminder text-${priorityColor}`;
      } else {
         todoReminder.textContent = '';
         todoReminder.className = '';
      }

      todoDesc.textContent = todoObj.desc;

      if (todoObj.checklist.length > 0) {
         let checklistContent = '';

         todoObj.checklist.forEach(task => {
            let taskLi = todoTaskItem;
   
            taskLi = taskLi.replace(/\[TODOID\]/g, todoObj.id);
            taskLi = taskLi.replace(/\[TASKID\]/g, task.id);
            taskLi = taskLi.replace(/\[CHECKED\]/g, (task.finished) ? 'checked' : '');
            taskLi = taskLi.replace(/\[TASKNAME\]/g, task.taskName);
            checklistContent += taskLi;
         });
         todoChecklist.innerHTML = checklistContent;
         todoChecklistHeading.style.display = 'block';
      } else {
         todoChecklist.innerHTML = '';
         todoChecklistHeading.style.display = 'none';
      }

      checkmarkSymbol.className = `todo__priority-circle fa-solid fa-circle text-${priorityColor}`;
   }

   function selectTodo(e) {
      e.preventDefault();

      let anchor = e.target.closest('a.sidebar__anchor');

      if (anchor) {
         let [ todo ] = storage.getTodos().filter(todo => todo.id === anchor.getAttribute('href'));
         if (selectedTodo) selectedTodo.classList.remove('sidebar__item--selected');
         anchor.classList.add('sidebar__item--selected');
         selectedTodo = anchor;
         todoContainer.style.display = 'block';
         currentTodoId = todo.id;
         printTodo(todo);
      }
   }

   function openModal(folder, type) {
      // open modal to create a new todo
      if (type === 'new') {
         let today = new Date();

         submissionType = 'new';
         newTodoFolder = folder;
         modal.classList.remove('modal--hidden');
         modalTitle.textContent = `Create new todo in ${folder} folder`;
         dayField.value = today.getDate();
         monthField.value = today.getMonth() + 1;
         yearField.value = today.getFullYear();
      }
      // open model to edit a todo
      if (type === 'edit') {
         let [ todo ] = storage.getTodos().filter(todo => todo.id === currentTodoId);

         submissionType = 'edit';
         modal.classList.remove('modal--hidden');
         modal.classList.add('modal--edit');
         modalTitle.textContent = `Edit Todo`;
         titleField.value = todo.title;
         descField.value = todo.desc;
         checklistItems = todo.checklist;
         printChecklistItems();
         priorityField.value = todo.priority;

         if (todo.reminder) {
            toggleReminderContainer();
            dayField.value = todo.reminder.getDate();
            monthField.value = todo.reminder.getMonth() + 1;
            yearField.value = todo.reminder.getFullYear();
         } else {
            let today = new Date();
            dayField.value = today.getDate();
            monthField.value = today.getMonth() + 1;
            yearField.value = today.getFullYear();
         }
      }
      
      titleField.focus();
   }

   function printTodoFolder() {
      let todoFolder = document.createElement('li');
      let createBtn = document.createElement('button');
      let subList = document.createElement('ul');

      todoFolder.innerHTML = todoFolderButton;

      createBtn.type = 'button';
      createBtn.className = 'sign-button';
      createBtn.title = "Add new todo";
      createBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
      createBtn.addEventListener('click', openModal.bind(null, 'todos', 'new'));

      subList.className = 'sidebar__todos-list list-unstyled';
      subList.append( ...createTodoItems('todos') );
      subList.addEventListener('click', selectTodo);

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
         deleteBtn.className = 'sign-button';
         deleteBtn.title = "Delete folder";
         deleteBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
         deleteBtn.addEventListener('click', () => deleteFolder(folder));

         createBtn.type = 'button';
         createBtn.className = 'sign-button';
         createBtn.title = "Add new todo";
         createBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
         createBtn.addEventListener('click', () => openModal(folder, 'new'));

         subList.className = 'sidebar__todos-list list-unstyled';
         subList.append( ...createTodoItems(folder) );
         subList.addEventListener('click', selectTodo);

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

   function createNewFolder(e) {
      let input = newFolderForm.elements['folder-name'];
      let name = input.value;

      try {
         storage.addFolder(name);
         newFolderBtn.style.display = 'block';
         newFolderForm.style.display = 'none';
         input.value = '';
         printSidebarContent();
         saveStorageData();
      } catch (e) {
         alert('Your folder name is invalid or a duplicate');
      }

      e.preventDefault();
   }

   function toggleReminderContainer() {
      if (reminderBtn.value === 'off') {
         reminderBtn.value = 'on';
         reminderBtn.textContent = 'ON';
         reminderContainer.classList.remove('reminder--hidden');
         reminderContainer.classList.add('reminder--show');
      } else {
         reminderBtn.value = 'off';
         reminderBtn.textContent = 'OFF';
         reminderContainer.classList.remove('reminder--show');
         reminderContainer.classList.add('reminder--hidden');
      }
   }

   function closeModal() {
      modal.className = 'modal modal--hidden'; 
      // reset fields value of modal
      titleField.value = '';
      descField.value = '';
      checklistNameField.value = '';
      modalChecklistContainer.innerHTML = '';
      checklistItems = [];
      priorityField.value = 'low';
      reminderBtn.value = 'off';
      reminderBtn.textContent = 'OFF';
      reminderContainer.classList.remove('reminder--show');
      reminderContainer.classList.add('reminder--hidden');
      dayField.value = '';
      monthField.value = '';
      yearField.value = '';
      [...modalErrorMsg].forEach(erroMsg => erroMsg.classList.remove('modal__error-msg--show'));
   }

   function validateSubmission() {
      let submitForm = true;

      if (sanitizeText(titleField.value).length === 0 || 
          sanitizeText(titleField.value).length > 50) {
         titleField.nextElementSibling.classList.add('modal__error-msg--show');
         submitForm = false;
      } else titleField.nextElementSibling.classList.remove('modal__error-msg--show');

      if (sanitizeText(descField.value).length === 0 || 
          sanitizeText(descField.value).length > 500) {
         descField.nextElementSibling.classList.add('modal__error-msg--show');
         submitForm = false;
      } else descField.nextElementSibling.classList.remove('modal__error-msg--show');

      if (priorityField.value !== 'low' && 
          priorityField.value !== 'medium' && 
          priorityField.value !== 'high') {
         submitForm = false;
      }

      if (reminderBtn.value === 'on') {
         if ( (dayField.value < 1 || dayField.value > 32) || 
              (monthField.value < 1 || monthField.value > 12) ||
              yearField.value < 1970) {
            reminderContainer.lastElementChild.classList.add('modal__error-msg--show');
            submitForm = false;
         } else reminderContainer.lastElementChild.classList.remove('modal__error-msg--show');   
      } else reminderContainer.lastElementChild.classList.remove('modal__error-msg--show');

      return submitForm;
   }

   function handleSubmission(e) {
      e.preventDefault();

      if (validateSubmission()) {
         // create new todo
         if (submissionType === 'new') {
            let reminder = (reminderBtn.value === 'on') ? 
                          new Date(+yearField.value, +monthField.value - 1, +dayField.value) :
                          null;
            let newTodo = new Todos(
               sanitizeText(titleField.value),
               sanitizeText(descField.value),
               checklistItems.map(item => item.taskName),
               reminder,
               priorityField.value,
            );

            storage.addTodo(newTodo, newTodoFolder);
            printSidebarContent();
            closeModal();
            saveStorageData();
            checklistItems = [];
         }
         // edit todo
         if (submissionType === 'edit') {
            let reminder = (reminderBtn.value === 'on') ? 
                          new Date(+yearField.value, +monthField.value - 1, +dayField.value) :
                          null;

            storage.editTodo(currentTodoId, {
               title: sanitizeText(titleField.value),
               desc: sanitizeText(descField.value),
               checklist: checklistItems,
               priority: priorityField.value,
               reminder,
            });
            checklistItems = [];
            printSidebarContent();
            printTodo(...storage.getTodos().filter(todo => todo.id === currentTodoId));
            closeModal();
            saveStorageData();
         }
      }
   }

   function checkTodo() {
      let [ todo ] = storage.getTodos().filter(todo => todo.id === currentTodoId);
      let priorityColor = (todo.priority === 'low') ? 'blue' :
                          (todo.priority === 'medium') ? 'yellow' : 
                          (todo.priority === 'high') ? 'red' : 'dark';

      storage.editTodo(currentTodoId, { finished: !todo.finished });
      printTodo(...storage.getTodos().filter(todo => todo.id === currentTodoId));

      let circle = (!todo.finished) ? 'fa-solid fa-circle' : 'fa-regular fa-circle';
      selectedTodo.firstElementChild.firstElementChild.className = `${circle} text-${priorityColor}`;
      saveStorageData();
   }

   function deleteTodo() {
      if ( confirm(`Do you want ot delete this todo?`) ) {
         storage.removeTodo(currentTodoId);
         saveStorageData();
         printSidebarContent();
         currentTodoId = null;
         todoContainer.style.display = 'none';
      }
   }

   function printChecklistItems() {
      modalChecklistContainer.innerHTML = '';
      checklistItems.forEach(item => {
         const taskItem = document.createElement('li');
         let content = modalTaskItem;
         let checkedAttribute = (item.finished) ? 'checked' : '';

         content = content.replace(/\[TASKNAME\]/g, item.taskName);
         content = content.replace(/\[CHECKED\]/g, checkedAttribute);
         content = content.replace(/\[ID\]/g, item.id);
         taskItem.className = 'modal__checklist-item';
         taskItem.innerHTML = content;
         modalChecklistContainer.appendChild(taskItem);
      });
   }

   function addChecklistItem() {
      let taskName = sanitizeText(checklistNameField.value);

      if (taskName.length > 0) {
         checklistItems.push({
            id: uniqid(),
            taskName: taskName,
            finished: false,
         });
         printChecklistItems();
         checklistNameField.value = '';
         checklistNameField.focus();
      }
   }

   function handlechecklistButtons(e) {
      let target = e.target;

      // check or uncheck task
      if (target.type && target.type === 'checkbox') {
         let id = target.dataset.id;

         checklistItems = checklistItems.map(task => {
            if (task.id === id) {
               task.finished = !task.finished;
            }

            return task;
         });
      
      // remove task
      } else {
         let button = e.target.closest('button.sign-button');
         
         if (button && button.dataset.id) {
            checklistItems = checklistItems.filter(item => item.id !== button.dataset.id);
            printChecklistItems();
         }
      }
   }

   function checkTask(e) {
      let target = e.target;

      if (target.type && target.type === 'checkbox') {
         let { todoId, taskId } = target.dataset;

         storage.checkTask(todoId, taskId);
         saveStorageData();
      }
   }

   // print todos and/or folders from localStorage
   if (localStorage.todos && JSON.parse(localStorage.todos).length > 0 || 
       localStorage.folders && JSON.parse(localStorage.folders).length > 0) {
      pullStorageData();
      printSidebarContent();
   } else {
      createGenericTodo();
      printSidebarContent();
   }

   newFolderBtn.addEventListener('click', () => {
      newFolderBtn.style.display = 'none';
      newFolderForm.style.display = 'block';
      newFolderForm.elements['folder-name'].focus();
   });

   newFolderForm.addEventListener('submit', createNewFolder);
   modal.addEventListener('mousedown', e => (e.target.id === 'modal' || e.target.id === 'cancel-button') ? closeModal() : null);
   modalAddTaskBtn.addEventListener('click', addChecklistItem);
   modalChecklistContainer.addEventListener('click', handlechecklistButtons);
   todoChecklist.addEventListener('click', checkTask);
   reminderBtn.addEventListener('click', () => toggleReminderContainer());
   modalForm.addEventListener('submit', handleSubmission);
   editTodoBtn.addEventListener('click', () => openModal(null, 'edit'));
   deleteTodoBtn.addEventListener('click', deleteTodo);
});