'use strict';

import uniqid from 'uniqid';
import sanitizeText from '../utils/sanitizeText.js';

const storage = (function() {
   let _projects = [];
   let _folders = [];
   let _defaultFolder = 'projects';

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
      for (let i = 0; i < _projects.length; i++) {
         if (_projects[i].folder === name) _projects[i].folder = _defaultFolder;
      }

      _folders = _folders.filter(folder => folder !== name);
   };

   const getProjects = function() {
      let projectsCopy = [];

      _projects.forEach(project => {
         let { id, title, desc, priority, folder } = project;
         let copy = { id, title, desc, priority, folder, reminder: null, tasks: [] };

         if (project.reminder) copy.reminder = new Date(project.reminder);

         for (let i = 0; i < project.tasks.length; i++) {
            let projectTaskCopy = {...project.tasks[i]};
            copy.tasks.push(projectTaskCopy);
         }

         projectsCopy.push(copy);
      });

      return projectsCopy;
   };

   const addProject = function(projectObj, folderName) {
      folderName = sanitizeText(String(folderName));

      if (projectObj instanceof Object && folderName) {
         projectObj.folder = (_folders.includes(folderName)) ? folderName : _defaultFolder;
         projectObj.id = uniqid();
         _projects.push(projectObj);
      }
   };

   const removeProject = function(id) {
      _projects = _projects.filter(project => project.id !== id);
   };

   const editProject = function(id, opt) {
      if (opt instanceof Object) {
         let { title, desc, tasks, reminder, priority } = opt;
         let [ project ] = _projects.filter(project => project.id === id);
   
         if (title) project.title = sanitizeText(title);
         if (desc) project.desc = sanitizeText(desc);
         if (reminder instanceof Date || reminder === null) project.reminder = reminder;
         if (priority === 'low' || 
             priority === 'medium' || 
             priority === 'high') project.priority = priority;
         if (tasks && tasks.length > 0) {
            project.tasks = tasks;
         }
      }
   };

   const checkProjectTask = function(projectId = '', taskId = '') {
      if (!(projectId instanceof String) && projectId.length === 0) {
         throw new Error("projectId must be an string and it shouldn't be empty");
      }

      if (!(taskId instanceof String) && taskId.length === 0) {
         throw new Error("taskId must be an string and it shouldn't be empty");
      }

      let [ project ] = _projects.filter(project => project.id === projectId);

      project.tasks = project.tasks.map(task => {
         if (task.id === taskId) {
            task.finished = !task.finished;
         }

         return task;
      });
   };

   return {
      getFolders,
      addFolder,
      removeFolder,
      getProjects,
      addProject,
      removeProject,
      editProject,
      checkProjectTask,
   };
})();

export default storage;