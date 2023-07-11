//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js
import { makeTodo, makeProject, showTasksInProject, displayDefaultProject, deleteProject, addProject, addTask } from "./ui";
import { todo } from "./todo";



export const eventHandlers = () => {
    
    displayDefaultProject();
    addTask();
    addProject();
   
    
    
};