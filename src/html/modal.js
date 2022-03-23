export default function appendModal() {
   const modal = document.createElement('div');

   modal.id = 'modal';
   modal.className = 'modal modal--hidden';
   modal.innerHTML = `
   <form id="modal-form" class="modal__form">
      <h1 id="modal__title" class="fs-2 fw-bold text-capitalize text-center mb-5"></h1>
      <div class="mb-5">
         <label for="title" class="modal__label">Title</label>
         <input type="text" name="title" id="title" class="modal__input" placeholder="Take out trash">
      </div>

      <div class="mb-5">
         <label for="description" class="modal__label">Description</label>
         <textarea type="text" name="description" id="description" class="modal__input modal__textarea"></textarea>
      </div>

      <div class="mb-5">
         <label for="priority" class="modal__label">Priority: </label>
         <select name="priority" id="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
      </select>
      </div>

      <div class="mb-5">
         <p class="modal__label">
            Reminder: 
            <button 
               type="button" 
               name="reminder" 
               value="off"
               id="reminder-button" 
               class="modal__button" 
               >
            OFF</button>
         </p>
         <div id="reminder-container" class="raminder--hidden">
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
      </div>

      <div class="text-center">
         <button type="submit" id="save-button" class="modal__button">save</button>
         <button type="button" id="cancel-button" class="modal__button">cancel</button>
      </div>
   </form>
   `;
   document.body.append(modal);
}