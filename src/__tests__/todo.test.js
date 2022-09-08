import Todos from '../modules/todos';

describe('TODO FILE IMPORTED', () => {
   test('Todo constructor exists', () => {
      expect(Todos).toBeDefined();
   });
});

describe('TODO CHECKLIST', () => {
   let todo1 = new Todos(
      'title', 
      'desc',
      ['Take out trash', 'Clean the kitchen'],
   );

   test('it should generate an object for every checklist element', () => {   
      expect(todo1.checklist[0].taskName).toBe('Take out trash');
      expect(todo1.checklist[0].finished).toBe(false);

      expect(todo1.checklist[1].taskName).toBe('Clean the kitchen');
      expect(todo1.checklist[1].finished).toBe(false);
   });

   test('It should update a checklist object "finished" prop', () => {
      let firstId = todo1.checklist[0].id;
      expect(todo1.check(firstId)).toEqual({
         id: firstId,
         taskName: 'Take out trash',
         finished: true,
      });

      let secondId = todo1.checklist[1].id;
      todo1.checklist[1].finished = true;
      expect(todo1.check(secondId)).toEqual({
         id: secondId,
         taskName: 'Clean the kitchen',
         finished: false,
      });

      expect(() => todo1.check()).toThrow("id must be an string and it shouldn't be empty");
      expect(() => todo1.check('')).toThrow("id must be an string and it shouldn't be empty");
      expect(todo1.check('invalidId')).toBeUndefined();
   });
});

describe('TODO ERROR', () => {
   test('It should throw error when checklist is not an array ', () => {
      expect(() => new Todos('title', 'desc', {}, null, 'high')).toThrow('checklist must be an array');
   });
});
