export default function appendSidebar() {
   const sidebar = document.createElement('section');

   sidebar.className = 'sidebar container-fluid p-0 pb-5';
   sidebar.id = 'sidebar';
   sidebar.innerHTML = `
   <button type="button" id="new-folder-button" class="sidebar__item sidebar__item--hover border-bottom border-secondary">
      <i class="fa-solid fa-folder-plus"></i>
      new folder
   </button>

   <form id="new-folder-form">
      <div class="sidebar__item d-flex align-items-center">
         <i class="fa-solid fa-folder-plus"></i>
         <input type="text" name="folder-name" class="sidebar__input sidebar__item--hover text-white" placeholder="Folder name">
      </div>
      <button type="submit" class="sidebar__create-button sidebar__item sidebar__item--hover">Create</button>
   </form>

   <ul id="folders" class="list-unstyled m-0"></ul>
   `;
   document.querySelector('#content').append(sidebar);
}