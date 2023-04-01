import Project from '../modules/project.js';
import storage from '../modules/storage.js';

function createGenericProjects() {
   let welcomeTodo = new Project(
      'Welcome 👋',
      `Welcome to To-do List a webapp for creating to-do lists, built with Javascript. 
      To start creating your own to-do lists follow the steps below 👇`,
      [
         'Click the "new folder" button and write a name for your new folder like "my projects", then click "create"', 
         'In the right side of your new folder there are two buttons: the minus sign deletes your folder, the plus sign creates a new project; create a new project by clicking it.',
      ],
      null,
      'low',
   );
   let workProject = new Project(
      'Work 🎯',
      '',
      [
         'Check my email inbox',
         'Research and write a proposal for a new project',
         'Organize new project\'s files and folders',
         'Review finances and set a budget',
      ],
      null,
      'low',
   );
   let dailyTasksProject = new Project(
      'Daily Tasks 🏠',
      '',
      [
         '🛒 Buy groceries for the week',
         '💰 Pay bills',
         '📞 Call the doctor and schedule an appointment',
         '👕 Organize closet and donate unwanted items to charity',
         '📝 Write a blog post for personal website',
         '🧘‍♀️ Attend a yoga class',
         '☕️ Meet with a friend for coffee',
         '🏖️ Book a vacation for the summer',
         '🧹 Clean the house and do laundry',
         '📖 Read a book for at least 30 minutes'
      ],
      null,
      'low',
   );
   let carrotCake = new Project(
      'Carrot Cake 🍰',
      '',
      [
         '📝 Preheat oven',
         '🧈 Mix ¾ cups of butter and 2 cups of sugar together in a bowl',
         '🍞 Add 5 eggs and 400g of flour and mix',
         '🥛 Gradually stir in milk to create a smooth batter',
         '🥕 Add 2 medium grated carrots',
         '🍶 Pour the batter into a greased cake tin',
         '🍪 Sprinkle a layer of crushed cookies over the top',
         '🕰️ Bake in the oven for 35-40 minutes',
         '🔪 Allow to cool for 10 minutes before slicing and serving',
         '😍 Eat'
      ],
      null,
      'low',
   );
   storage.addProject(welcomeTodo, 'projects');
   storage.addProject(workProject, 'projects');
   storage.addProject(dailyTasksProject, 'projects');
   storage.addProject(carrotCake, 'projects');
}

export default createGenericProjects;