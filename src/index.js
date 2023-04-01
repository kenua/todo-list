import './sass/styles.scss';
import uniqid from 'uniqid';
import storage from './modules/storage.js';
import Project from './modules/project.js';
import sanitizeText from './utils/sanitizeText.js';
import appendModal from './html/appendModal.js';
import appendSidebar from './html/appendSidebar.js';
import appendProject from './html/appendProject.js';
import todoTaskItem from './html/markup/todoTaskItem.html';
import projectsFolderButton from './html/markup/projectsFolderButton.html';
import customFolderButton from './html/markup/customFolderButton.html';
import projectItemButton from './html/markup/projectItemButton.html';
import modalTaskItem from './html/markup/modalTaskItem.html';
import saveStorageData from './utils/saveStorageData.js';
import pullStorageData from './utils/pullStorageData.js';
import createGenericProjects from './utils/createGenericProjects.js';

document.addEventListener('DOMContentLoaded', () => {
   appendModal();
   appendSidebar();
   appendProject();

   const newFolderBtn = document.querySelector('#new-folder-button');
   const newFolderForm = document.querySelector('#new-folder-form');
   const folders = document.querySelector('#folders');
   const modal = document.querySelector('#modal');
   const modalForm = document.querySelector('#modal-form');
   const { 
      title: titleField, 
      description: descField, 
      'tasks-text': taskField,
      priority: priorityField,
      day: dayField, 
      month: monthField, 
      year: yearField,
   } = modalForm.elements;
   const modalTitle = document.querySelector('#modal__title');
   const modalTasksContainer = document.querySelector('#tasks-container');
   const modalAddTaskBtn = document.querySelector('#tasks-add-button');
   const reminderBtn = document.querySelector('#reminder-button');
   const reminderContainer = document.querySelector('#reminder-container');
   const modalErrorMsg = document.querySelectorAll('.modal__error-msg');
   const projectContainer = document.querySelector('#project');
   const projectTitle = document.querySelector('#project-title');
   const projectReminder = document.querySelector('#project-reminder');
   const projectDesc = document.querySelector('#project-desc');
   const projectTasks = document.querySelector('#project-tasks');
   const editProjectBtn = document.querySelector('#edit-project');
   const deleteProjectBtn = document.querySelector('#delete-project');
   let submissionType = null;
   let newProjectFolder = null;
   let currentProjectId = null;
   let selectedProject = null;
   let tasksItems = [];

   function createProjectLiNodes(folder) {
      let result = [];

      storage.getProjects().forEach(project => {
         if (project.folder === folder) {
            let li = document.createElement('li');
            let content = projectItemButton;
            let priorityColor = (project.priority === 'low') ? 'blue' :
                                (project.priority === 'medium') ? 'yellow' : 
                                (project.priority === 'high') ? 'red' : 'dark';

            content = content.replace(/\[ID\]/g, project.id);
            content = content.replace(/\[TITLE\]/g, project.title);
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

   function printProject(projectObj) {
      let priorityColor = (projectObj.priority === 'low') ? 'blue' :
                          (projectObj.priority === 'medium') ? 'yellow' : 
                          (projectObj.priority === 'high') ? 'red' : 'dark';

      projectTitle.textContent = projectObj.title;

      if (projectObj.reminder) {
         projectReminder.textContent = `${projectObj.reminder.getDate()}/${projectObj.reminder.getMonth() + 1}/${projectObj.reminder.getFullYear()}`;
         projectReminder.className = `project__reminder text-${priorityColor}`;
      } else {
         projectReminder.textContent = '';
         projectReminder.className = '';
      }

      if (projectObj.desc.length === 0) projectDesc.style.display = 'none';
      else projectDesc.style.display = 'block';

      projectDesc.textContent = projectObj.desc;

      if (projectObj.tasks.length > 0) {
         let checklistContent = '';

         projectObj.tasks.forEach(task => {
            let taskLi = todoTaskItem;
   
            taskLi = taskLi.replace(/\[TODOID\]/g, projectObj.id);
            taskLi = taskLi.replace(/\[TASKID\]/g, task.id);
            taskLi = taskLi.replace(/\[CHECKED\]/g, (task.finished) ? 'checked' : '');
            taskLi = taskLi.replace(/\[TASKNAME\]/g, task.taskName);
            checklistContent += taskLi;
         });
         projectTasks.innerHTML = checklistContent;
      } else {
         projectTasks.innerHTML = '';
      }
   }

   function selectProject(e) {
      e.preventDefault();

      let anchor = e.target.closest('a.sidebar__anchor');

      if (anchor) {
         let [ project ] = storage.getProjects().filter(project => project.id === anchor.getAttribute('href'));
         if (selectedProject) selectedProject.classList.remove('sidebar__item--selected');
         anchor.classList.add('sidebar__item--selected');
         selectedProject = anchor;
         projectContainer.style.display = 'block';
         currentProjectId = project.id;
         printProject(project);
      }
   }

   function openModal(folder, type) {
      // open modal to create a new project
      if (type === 'new') {
         let today = new Date();

         submissionType = 'new';
         newProjectFolder = folder;
         modal.classList.remove('modal--hidden');
         modalTitle.textContent = `New project in ${folder} folder`;
         dayField.value = today.getDate();
         monthField.value = today.getMonth() + 1;
         yearField.value = today.getFullYear();
      }
      // open model to edit a project
      if (type === 'edit') {
         let [ project ] = storage.getProjects().filter(project => project.id === currentProjectId);

         submissionType = 'edit';
         modal.classList.remove('modal--hidden');
         modal.classList.add('modal--edit');
         modalTitle.textContent = `Edit`;
         titleField.value = project.title;
         descField.value = project.desc;
         tasksItems = project.tasks;
         printModalTasks();
         priorityField.value = project.priority;

         if (project.reminder) {
            toggleReminderContainer();
            dayField.value = project.reminder.getDate();
            monthField.value = project.reminder.getMonth() + 1;
            yearField.value = project.reminder.getFullYear();
         } else {
            let today = new Date();
            dayField.value = today.getDate();
            monthField.value = today.getMonth() + 1;
            yearField.value = today.getFullYear();
         }
      }
      
      titleField.focus();
   }

   function printProjectFolder() {
      let projectsFolder = document.createElement('li');
      let createBtn = document.createElement('button');
      let subList = document.createElement('ul');

      projectsFolder.innerHTML = projectsFolderButton;

      createBtn.type = 'button';
      createBtn.className = 'sign-button';
      createBtn.title = "Add new project";
      createBtn.innerHTML = '<svg class="sidebar__sign-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>';
      createBtn.addEventListener('click', openModal.bind(null, 'projects', 'new'));

      subList.className = 'list-unstyled';
      subList.append( ...createProjectLiNodes('projects') );
      subList.addEventListener('click', selectProject);

      projectsFolder.firstElementChild.append(createBtn);
      projectsFolder.append(subList);
      folders.append(projectsFolder);
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
         deleteBtn.innerHTML = '<svg class="sidebar__sign-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>';
         deleteBtn.addEventListener('click', () => deleteFolder(folder));

         createBtn.type = 'button';
         createBtn.className = 'sign-button';
         createBtn.title = "Add new project";
         createBtn.innerHTML = '<svg class="sidebar__sign-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>';
         createBtn.addEventListener('click', () => openModal(folder, 'new'));

         subList.className = 'list-unstyled';
         subList.append( ...createProjectLiNodes(folder) );
         subList.addEventListener('click', selectProject);

         folderButton.firstElementChild.lastElementChild.append(deleteBtn, createBtn);
         folderButton.append(subList);
         folders.append(folderButton);
      });
   }

   function printSidebarContent() {
      folders.innerHTML = '';
      printProjectFolder();
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
      taskField.value = '';
      modalTasksContainer.innerHTML = '';
      tasksItems = [];
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

      if (sanitizeText(descField.value).length > 500) {
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
         // create new project
         if (submissionType === 'new') {
            let reminder = (reminderBtn.value === 'on') ? 
                          new Date(+yearField.value, +monthField.value - 1, +dayField.value) :
                          null;
            let newTodo = new Project(
               sanitizeText(titleField.value),
               sanitizeText(descField.value),
               tasksItems.map(item => item.taskName),
               reminder,
               priorityField.value,
            );

            storage.addProject(newTodo, newProjectFolder);
            printSidebarContent();
            closeModal();
            saveStorageData();
            tasksItems = [];
         }
         // edit project
         if (submissionType === 'edit') {
            let reminder = (reminderBtn.value === 'on') ? 
                          new Date(+yearField.value, +monthField.value - 1, +dayField.value) :
                          null;

            storage.editProject(currentProjectId, {
               title: sanitizeText(titleField.value),
               desc: sanitizeText(descField.value),
               tasks: tasksItems,
               priority: priorityField.value,
               reminder,
            });
            tasksItems = [];
            printSidebarContent();
            printProject(...storage.getProjects().filter(project => project.id === currentProjectId));
            closeModal();
            saveStorageData();
         }
      }
   }

   function checkTodo() {
      let [ todo ] = storage.getTodos().filter(todo => todo.id === currentProjectId);
      let priorityColor = (todo.priority === 'low') ? 'blue' :
                          (todo.priority === 'medium') ? 'yellow' : 
                          (todo.priority === 'high') ? 'red' : 'dark';

      storage.editTodo(currentProjectId, { finished: !todo.finished });
      printProject(...storage.getTodos().filter(todo => todo.id === currentProjectId));

      let circle = (!todo.finished) ? 'fa-solid fa-circle' : 'fa-regular fa-circle';
      selectedProject.firstElementChild.firstElementChild.className = `${circle} text-${priorityColor}`;
      saveStorageData();
   }

   function deleteTodo() {
      if ( confirm(`Do you want ot delete this todo?`) ) {
         storage.removeProject(currentProjectId);
         saveStorageData();
         printSidebarContent();
         currentProjectId = null;
         projectContainer.style.display = 'none';
      }
   }

   function printModalTasks() {
      modalTasksContainer.innerHTML = '';
      tasksItems.forEach(item => {
         const taskItem = document.createElement('li');
         let content = modalTaskItem;
         let checkedAttribute = (item.finished) ? 'checked' : '';

         content = content.replace(/\[TASKNAME\]/g, item.taskName);
         content = content.replace(/\[CHECKED\]/g, checkedAttribute);
         content = content.replace(/\[ID\]/g, item.id);
         taskItem.className = 'modal__task-item';
         taskItem.innerHTML = content;
         modalTasksContainer.appendChild(taskItem);
      });
   }

   function addTaskItem() {
      let taskName = sanitizeText(taskField.value);

      if (taskName.length > 0) {
         tasksItems.push({
            id: uniqid(),
            taskName: taskName,
            finished: false,
         });
         printModalTasks();
         taskField.value = '';
         taskField.focus();
      }
   }

   function handlechecklistButtons(e) {
      let target = e.target;

      // check or uncheck task
      if (target.type && target.type === 'checkbox') {
         let id = target.dataset.id;

         tasksItems = tasksItems.map(task => {
            if (task.id === id) {
               task.finished = !task.finished;
            }

            return task;
         });
      
      // remove task
      } else {
         let button = e.target.closest('button.sign-button');
         
         if (button && button.dataset.id) {
            tasksItems = tasksItems.filter(item => item.id !== button.dataset.id);
            printModalTasks();
         }
      }
   }

   function checkTask(e) {
      let target = e.target;

      if (target.type && target.type === 'checkbox') {
         let { todoId, taskId } = target.dataset;

         storage.checkProjectTask(todoId, taskId);
         saveStorageData();
      }
   }

   // print projects and/or folders from localStorage
   if (localStorage.todos && JSON.parse(localStorage.todos).length > 0 || 
       localStorage.folders && JSON.parse(localStorage.folders).length > 0) {
      pullStorageData();
      printSidebarContent();
   } else {
      createGenericProjects();
      printSidebarContent();
   }

   newFolderBtn.addEventListener('click', () => {
      newFolderBtn.style.display = 'none';
      newFolderForm.style.display = 'block';
      newFolderForm.elements['folder-name'].focus();
   });

   newFolderForm.addEventListener('submit', createNewFolder);
   modal.addEventListener('mousedown', e => (e.target.id === 'modal' || e.target.id === 'cancel-button') ? closeModal() : null);
   modalAddTaskBtn.addEventListener('click', addTaskItem);
   modalTasksContainer.addEventListener('click', handlechecklistButtons);
   projectTasks.addEventListener('click', checkTask);
   reminderBtn.addEventListener('click', () => toggleReminderContainer());
   modalForm.addEventListener('submit', handleSubmission);
   editProjectBtn.addEventListener('click', () => openModal(null, 'edit'));
   deleteProjectBtn.addEventListener('click', deleteTodo);
});