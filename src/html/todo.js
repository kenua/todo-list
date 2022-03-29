export default function appendTodo() {
   const todo = document.createElement('section');

   todo.className = 'todo container-fuild p-3 p-lg-6';
   todo.id = 'todo';
   todo.innerHTML = `
   <div class="pb-5 border-bottom border-primary mb-5">
      <ul class="list-unstyled d-flex align-items-center m-0 pb-3">
         <li class="me-auto">
            <span id="todo-reminder"></span>
         </li>
         <li class="me-2">
            <button id="edit-todo" class="options__button" title="Edit todo">
               <i class="fa-solid fa-pen-to-square"></i>
            </button>
         </li>
         <li>
            <button id="delete-todo" class="options__button" title="Delete todo">
               <i class="fa-solid fa-trash-can"></i></i>
            </button>
         </li>
      </ul>
      <h1 class="fs-1 fw-bold">
         <button id="checkmark" class="options__button options__button--check" title="Mark todo">
            <i id="checkmark-symbol" class=""></i>
         </button>
         <span id="todo-title"></span>
      </h1>
   </div>
   
   <div id="todo-content"></div>
   `;
   document.querySelector('#content').append(todo);
}