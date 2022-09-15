export default function appendTodo() {
   const todo = document.createElement('section');

   todo.className = 'todo container-fuild p-6';
   todo.id = 'todo';
   todo.innerHTML = `
   <div class="pb-5 border-bottom border-dark-gray mb-3">
      <ul class="list-unstyled d-flex align-items-center m-0 pb-3">
         <li class="me-auto">
            <span id="todo-reminder"></span>
         </li>
         <li class="me-4">
            <button id="edit-todo" class="todo__button" title="Edit todo">
               <i class="fa-solid fa-pen-to-square"></i>
            </button>
         </li>
         <li>
            <button id="delete-todo" class="todo__button" title="Delete todo">
               <i class="fa-solid fa-trash-can"></i></i>
            </button>
         </li>
      </ul>
      <h1 class="fs-1 fw-bold m-0">
         <i id="checkmark-symbol" class=""></i>
         <span id="todo-title"></span>
      </h1>
   </div>
   
   <p id="todo-desc" class="mb-5"></p>
   <h2 id="checklist-heading" class="fs-3 fw-bold mb-3 pb-3 border-bottom border-dark-gray">Checklist:</h2>
   <ul id="todo-checklist" class="list-unstyled ps-5"></ul>
   `;
   document.querySelector('#content').append(todo);
}