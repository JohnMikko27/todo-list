//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js
import { getFormValues } from "./ui";
import { todo } from "./todo";

const addTask = document.querySelector('#add-task');

export const eventHandlers = () => {
    
    //show the form that will take title, description, and due date
    //then once it is submitted, take those values, 
    //and use it to create a new todo item from todo.js
    getFormValues();
    
    //then display that todo item using a display function from ui.js
    


};
