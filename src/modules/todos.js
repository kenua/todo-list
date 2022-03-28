'use strict';

import sanitizeText from '../utils/sanitizeText.js';

function Todos(title = '', desc = '', reminder = null, priority = 'low', finished = false) {
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

   if (!!finished || !(!!finished)) this.finished = !!finished;
   else throw new Error('finished is not valid');
}

export default Todos;