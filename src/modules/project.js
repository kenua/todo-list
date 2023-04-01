'use strict';

import uniqid from 'uniqid';
import sanitizeText from '../utils/sanitizeText.js';

function Project(title = '', desc = '', tasks = [], reminder = null, priority = 'low') {
   title = sanitizeText(title);
   desc = sanitizeText(desc);

   if (title.length > 0 && title.length <= 50) this.title = title;
   else throw new Error('title must be a string with a maximum length of 50 characters');

   if (desc.length <= 500) this.desc = desc;
   else throw new Error('maximum length of desc is 500 characters');

   if ((reminder instanceof Date)) this.reminder = reminder;
   else this.reminder = null;

   switch (priority) {
      case 'low':
      case 'medium':
      case 'high':
         this.priority = priority;
         break;
      default:
         throw new Error('priority is not valid');
   }

   if (tasks instanceof Array) {
      for (let i = 0; i < tasks.length; i++) {
         let taskObj = {
            id: uniqid(),
            taskName: tasks[i],
            finished: false,
         };

         tasks[i] = taskObj;
      }
      this.tasks = tasks;
   } else {
      throw new Error('tasks must be an array');
   }
}

export default Project;