export default function appendModal() {
   const modal = document.createElement('div');

   modal.id = 'modal';
   modal.className = 'modal modal--hidden';
   modal.innerHTML = `
   <form id="modal-form" class="modal__form" novalidate>
      <h1 id="modal__title" class="fs-3 fw-bold text-capitalize text-center mb-5"></h1>
      <div class="mb-4">
         <label for="title" class="modal__label">Title</label>
         <input type="text" name="title" id="title" class="modal__input">
         <p class="modal__error-msg">
            <i class="fa-solid fa-circle-exclamation"></i> 
            This field is required, it should be less than 50 characters long
         </p>
      </div>

      <div class="mb-4">
         <label for="description" class="modal__label">Description</label>
         <textarea type="text" name="description" id="description" class="modal__input modal__textarea"></textarea>
         <p class="modal__error-msg">
            <i class="fa-solid fa-circle-exclamation"></i> 
            This field is required, it must be less than 500 characters long
         </p>
      </div>

      <div class="mb-4">
         <label for="checklist" class="modal__label">Tasks</label>
         <div class="d-flex">
            <input 
               type="text" 
               name="checklist-name" 
               id="checklist" class="modal__input me-3" 
               placeholder="Take out trash"
            >
            <button type="button" id="checklist-add-button" class="modal__button">Add</button>
         </div>
         <p class="modal__error-msg">
            <i class="fa-solid fa-circle-exclamation"></i> 
            This field is required, it must be less than 250 characters long
         </p>

         <ul id="checklist-container" class="modal__checklist-container"></ul>
      </div>

      <div class="mb-4">
         <label for="priority" class="modal__label me-2">Priority: </label>
         <select name="priority" id="priority" class="modal__input modal__priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
      </select>
      </div>

      <div class="mb-4">
         <p class="modal__label">
            Reminder: 
            <button 
               type="button" 
               name="reminder" 
               value="off"
               id="reminder-button" 
               class="modal__button fs-6 ms-2" 
               >
            OFF</button>
         </p>
         <div id="reminder-container" class="reminder--hidden">
            <div class="d-flex">
               <div class="flex-grow-1 me-2">
                  <label for="day" class="modal__label d-block">Day</label>
                  <input type="number" name="day" id="day" class="modal__input" max="31" min="1" placeholder="DD">
               </div>

               <div class="flex-grow-1 me-2">
                  <label for="month" class="modal__label d-block">Month</label>
                  <input type="number" name="month" id="month" class="modal__input" max="12" min="1" placeholder="MM">
               </div>

               <div class="flex-grow-1">
                  <label for="year" class="modal__label d-block">Year</label>
                  <input type="number" name="year" id="year" class="modal__input" max="99999" min="1970" placeholder="YY">
               </div>
            </div>
            <p class="modal__error-msg">
               <i class="fa-solid fa-circle-exclamation"></i> 
               Day, Month, and Year are required
            </p>
         </div>
      </div>

      <div class="text-center">
         <button type="submit" id="save-button" class="modal__button">save</button>
         <button type="button" id="cancel-button" class="modal__button">cancel</button>
      </div>
   </form>
   `;
   document.body.append(modal);
}