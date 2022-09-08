import Todos from '../modules/todos';
import storage from '../modules/storage';

describe('STORAGE CHECKLIST', () => {
   test('it should generate clones of every checklist nested object', () => {
      let todoObj = new Todos('title', 'desc', ['make ramonas food', 'make lunch'], null, 'low');

      storage.addTodo(todoObj, 'thing');

      let first = storage.getTodos()[0].checklist[0];
      let second = storage.getTodos()[0].checklist[0];

      expect((first === second)).toBe(false);
   });

   test('It should edit a checklist item', () => {
      let todoObj = new Todos('item2', 'desc2', ['Eat food', 'drink coffee'], new Date(), 'high');
      storage.addTodo(todoObj, '123');

      let itemId = storage.getTodos()[0].id;
      let itemEditObj = {
         title: 'Today tasks',
         desc: 'Tasks I need to finish today :)',
         checklist: [
            ...storage.getTodos()[0].checklist,
         ],
         reminder: new Date(),
         priority: 'medium',
      };
      
      storage.editTodo(itemId, itemEditObj);
      expect(storage.getTodos()[0].title).toBe('Today tasks');
      expect(storage.getTodos()[0].desc).toBe('Tasks I need to finish today :)');
      expect(storage.getTodos()[0].checklist.length).toBe(2);
      expect(storage.getTodos()[0].reminder).toBeTruthy();
      expect(storage.getTodos()[0].priority).toBe('medium');
   });
});