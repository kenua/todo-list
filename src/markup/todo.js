export default function appendTodo() {
   const todo = document.createElement('section');

   todo.className = 'todo container-fuild p-3 p-lg-5';
   todo.id = 'todo';
   todo.innerHTML = `
   <div class="todo__top">
      <h1 class="todo__title text-center mb-4 mb-lg-0">
         <span id="todo-title" class="fs-1 fw-bold text-capitalize">[TODO_TITLE]</span>
         <span id="todo-dueDate" class="fs-4 fw-light text-uppercase">[TODO_DUEDATE]</span>
      </h1>

      <ul class="list-unstyled todo__options  d-flex align-items-center m-0">
         <li class="me-2">
            <button id="mark-todo" class="options__button" title="Mark todo">
               <!--<i class="fa-solid fa-circle"></i></i>-->
               <i class="fa-regular fa-circle"></i>
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

   <div id="todo-content">
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
   </div>
   `;
   document.querySelector('#content').append(todo);
}