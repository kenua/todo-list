'use strict';

function Todos(title = '', desc = '', dueDate = null, priority = 'low', finished = false) {
   let weirdChars = /[\<\>\/\\]/ig;

   title = title.replace(weirdChars, '');
   desc = desc.replace(weirdChars, '');

   if (title.trim().length > 0 && title.trim().length <= 50) this.title = title;
   else throw new Error('title must be a string with a maximum length of 50 characters');

   if (desc.trim().length > 0 && desc.trim().length <= 500) this.desc = desc;
   else throw new Error('desc must be a string with a maximum length of 500 characters');

   if ((dueDate instanceof Date)) this.dueDate = dueDate;
   else this.dueDate = null;

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