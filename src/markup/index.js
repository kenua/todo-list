import appendModal from './modal.js';
import appendSidebar from './sidebar.js';
import appendTodo from './todo.js';

export default function appendMarkup() {
   document.addEventListener('DOMContentLoaded', e => {
      appendModal();
      appendSidebar();
      appendTodo();
   });
}