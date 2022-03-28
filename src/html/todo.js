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

<!--
   <div class="todo__top">
      <h1 class="todo__title text-center mb-4 mb-lg-0">
         <span id="todo-title" class="fs-1 fw-bold text-capitalize"></span>
         <span id="todo-reminder" class="fs-4 fw-light text-uppercase"></span>
      </h1>

      <ul class="list-unstyled todo__options  d-flex align-items-center m-0">
         <li class="me-2">
            <button id="mark-todo" class="options__button" title="Mark todo">
               <!--<i class="fa-solid fa-circle"></i></i>->
               <i id="mark-symbol" class="fa-regular fa-circle"></i>
            </button>
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
   </div>
   -->
   <div id="todo-content">
   <!--
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magni aliquid enim officia culpa veniam laboriosam. Ab, fugiat eaque aut sapiente labore repudiandae iste veniam tempora quod ipsa qui delectus perspiciatis dicta tenetur amet quasi illum, doloremque dolorum culpa. Similique, minima numquam. Esse voluptate reiciendis omnis deserunt! Consectetur, reiciendis debitis?</p>
   -->
   </div>
   `;
   document.querySelector('#content').append(todo);
}