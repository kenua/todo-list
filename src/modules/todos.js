'use strict';

import uniqid from 'uniqid';
import sanitizeText from '../utils/sanitizeText.js';

function Todos(title = '', desc = '', checklist = [], reminder = null, priority = 'low') {
   title = sanitizeText(title);
   desc = sanitizeText(desc);

   if (title.length > 0 && title.length <= 50) this.title = title;
   else throw new Error('title must be a string with a maximum length of 50 characters');

   if (desc.length > 0 && desc.length <= 500) this.desc = desc;
   else throw new Error('desc must be a string with a maximum length of 500 characters');

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

   if (checklist instanceof Array) {
      for (let i = 0; i < checklist.length; i++) {
         let checklistObj = {
            id: uniqid(),
            taskName: checklist[i],
            finished: false,
         };

         checklist[i] = checklistObj;
      }
      this.checklist = checklist;
   } else {
      throw new Error('checklist must be an array');
   }
}

Todos.prototype.check = function(id = '') {
   if (!(id instanceof String) && id.length === 0) {
      throw new Error("id must be an string and it shouldn't be empty");
   }

   let result;

   this.checklist = this.checklist.map(item => {
      if (id === item.id) {
         item.finished = !item.finished;
         result = item;
      }
      return item;
   });

   return result;
}

export default Todos;