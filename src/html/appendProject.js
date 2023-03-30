export default function appendProject() {
   const project = document.createElement('section');

   project.className = 'project container-fuild p-6';
   project.id = 'project';
   project.innerHTML = `
   <div class="pb-5 border-bottom border-dark-gray mb-3">
      <ul class="list-unstyled d-flex align-items-center m-0 pb-3">
         <li class="me-auto">
            <span id="project-reminder"></span>
         </li>
         <li class="me-4">
            <button id="edit-project" class="project__button" title="Edit project">
               <i class="fa-solid fa-pen-to-square"></i>
            </button>
         </li>
         <li>
            <button id="delete-project" class="project__button" title="Delete project">
               <i class="fa-solid fa-trash-can"></i></i>
            </button>
         </li>
      </ul>
      <h1 class="fs-1 fw-bold m-0">
         <i id="checkmark-symbol" class=""></i>
         <span id="project-title"></span>
      </h1>
   </div>
   
   <p id="project-desc" class="mb-5"></p>
   <h2 id="tasks-heading" class="fs-3 fw-bold mb-3 pb-3 border-bottom border-dark-gray">Tasks:</h2>
   <ul id="project-checklist" class="list-unstyled ps-5"></ul>
   `;
   document.querySelector('#content').append(project);
}