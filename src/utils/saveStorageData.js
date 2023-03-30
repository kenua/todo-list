import storage from '../modules/storage.js';

function saveStorageData() {
   let folders = storage.getFolders();
   let projects = storage.getProjects();

   projects = projects.map(project => {
      if (project.reminder) {
         project.reminder = project.reminder.toDateString();
      }
      return project;
   });
   folders = JSON.stringify(folders);
   projects = JSON.stringify(projects);
   localStorage.setItem('folders', folders);
   localStorage.setItem('todos', projects);
}

export default saveStorageData;