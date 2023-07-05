//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js
import { makeTodo } from "./ui";
import { todo } from "./todo";



export const eventHandlers = () => {
    const addTask = document.querySelector('#add-task');
    const form = document.querySelector('form');
    //show the form that will take title, description, and due date
    //then once it is submitted, take those values, 
    //and use it to create a new todo item from todo.js
    //then display that todo item using a display function from ui.js
    makeTodo();
    
    addTask.addEventListener('click', () => form.classList.toggle('hidden'))

};
