export default function appendSidebar() {
   const sidebar = document.createElement('section');

   sidebar.className = 'sidebar container-fluid p-0 pb-5';
   sidebar.id = 'sidebar';
   sidebar.innerHTML = `
   <button type="button" id="new-folder-button" class="sidebar__item sidebar__item--hover border-bottom border-secondary">
      <i class="fa-solid fa-folder-plus"></i>
      new folder
   </button>

   <form id="sidebar-input-container">
      <div class="sidebar__item d-flex align-items-center">
         <i class="fa-solid fa-folder-plus"></i>
         <input type="text" name="folder-name" class="sidebar__input sidebar__item--hover text-white" placeholder="Folder name">
      </div>
      <button type="submit" class="sidebar__create-button sidebar__item sidebar__item--hover">Create</button>
   </form>

   <ul id="folders" class="list-unstyled m-0">
   <!--
      <li>
         <div class="sidebar__item sidebar__item--flex border-bottom border-dark-gray">
            <p class="fs-6 m-0">  <i class="fa-solid fa-folder"></i> Todos </p>

            <button 
               type="button" 
               class="sidebar__button" 
               data-button-type="add" 
               data-folder="todos"
               title="Add new todo"
            >
               <i class="fa-solid fa-plus"></i>
            </button>
         </div>

         <ul class="sidebar__todos-list list-unstyled">
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-blue"></i> 
                     Make the bed 
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-red"></i> 
                     Finish this project 
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Plublish it on github pages
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
         </ul>
      </li>
      -->
      <!--
      <li>
         <div class="sidebar__item sidebar__item--flex border-bottom border-dark-gray">
            <p class="fs-6 m-0">  <i class="fa-solid fa-folder"></i> tasks </p>

            <div class="sidebar__button-container">
               <button 
                  type="button" 
                  class="sidebar__button" 
                  data-button-type="delete" 
                  data-folder="todos"
                  title="Delete folder"
               >
                  <i class="fa-solid fa-minus"></i>
               </button>
               <button 
                  type="button" 
                  class="sidebar__button" 
                  data-button-type="add" 
                  data-folder="todos"
                  title="Add new todo"
               >
                  <i class="fa-solid fa-plus"></i>
               </button>
            </div>
         </div>

         <ul class="sidebar__todos-list list-unstyled">
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-yellow"></i> 
                     Make Ramona's food
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-red"></i> 
                     Clean your nose 
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
            <li>
               <a href="#{id}" class="sidebar__anchor sidebar__item sidebar__item--flex sidebar__item--hover">
                  <p class="fs-6 m-0"> 
                     <i class="fa-solid fa-circle text-blue"></i> 
                     Return the stolen statue
                  </p>
                  <span class="sidebar__button">
                     <i class="fa-solid fa-chevron-right"></i>
                  </span>
               </a>
            </li>
         </ul>
      </li>
      -->
   </ul>
   `;
   document.querySelector('#content').append(sidebar);
}