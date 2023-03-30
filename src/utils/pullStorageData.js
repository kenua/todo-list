import storage from '../modules/storage.js';

function pullStorageData() {
   let folders = localStorage.getItem('folders');
   let projects = localStorage.getItem('todos');

   folders = JSON.parse(folders);
   folders.forEach( folder => storage.addFolder(folder) );
   projects = JSON.parse(projects);
   projects.forEach(project => {
      if (project.reminder) {
         project.reminder = new Date(project.reminder);
      }
      storage.addProject(project, project.folder);
   });
}

export default pullStorageData;