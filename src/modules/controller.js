//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js
import { makeTodo, makeProject, showTasksInProject, displayDefaultProject, deleteProject, addProject, addTask } from "./ui";
import { todo } from "./todo";



export const eventHandlers = () => {
    

 
    const cancelProjectButton = document.querySelector('#cancel-project-button');
    const submitProjectButton = document.querySelector('#submit-project-button')

    displayDefaultProject();
    makeTodo();
    addTask();
    addProject();
    makeProject();
    
    deleteProject()
};
