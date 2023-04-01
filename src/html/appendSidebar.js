export default function appendSidebar() {
   const sidebar = document.createElement('section');

   sidebar.className = 'sidebar container-fluid p-0 pb-5';
   sidebar.id = 'sidebar';
   sidebar.innerHTML = `
   <button type="button" id="new-folder-button" class="sidebar__item sidebar__item--hover border-bottom border-secondary">
   <svg 
      class="sidebar__folder-icon"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
         <path d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/>
   </svg>
      new folder
   </button>

   <form id="new-folder-form">
      <div class="sidebar__item d-flex align-items-center">
         <svg 
            class="sidebar__folder-icon"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
               <path d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/>
         </svg>
         <input type="text" name="folder-name" class="sidebar__input sidebar__item--hover text-white" placeholder="Folder name">
      </div>
      <button type="submit" class="sidebar__create-button sidebar__item sidebar__item--hover">Create</button>
   </form>

   <ul id="folders" class="list-unstyled m-0"></ul>
   `;
   document.querySelector('#content').append(sidebar);
}