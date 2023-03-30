import Project from '../modules/project.js';
import storage from '../modules/storage.js';

function createGenericProjects() {
   let welcomeTodo = new Project(
      'Guide',
      'Welcome to Todo List a webapp where you can create and manage to-do lists. You can create new tasks by clicking the ➕ icon on the right side of a folder. To create new folders click the "New Folder" on the sidebar and write a name for it. To delete a folder click the ➖ icon.',
      [],
      null,
      'low',
   );
   let carrotCake = new Project(
      'Carrot Cake 🍰',
      'These are the engredients needed for a carrot cake:',
      [
         '400g of flour',
         '4 eggs 🥚',
         '2 cups of salt and sugar',
         '4 cups of grated carrots 🥕',
         '¾ cup butter 🧈',
      ],
      null,
      'medium',
   );
   storage.addProject(welcomeTodo, 'projects');
   storage.addProject(carrotCake, 'projects');
}

export default createGenericProjects;