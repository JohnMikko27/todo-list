//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js
import { makeTodo, makeProject, showTasksInProject } from "./ui";
import { todo } from "./todo";



export const eventHandlers = () => {
    const addTask = document.querySelector('#add-task');
    const taskForm = document.querySelector('#task-form');
    const addProject = document.querySelector('#add-project-button');
    const projectForm = document.querySelector('#project-form');
    const cancelProjectButton = document.querySelector('#cancel-project-button');
    const submitProjectButton = document.querySelector('#submit-project-button')

    makeTodo();
    //maybe add these eventListeneres in ui.js
    //put them in a function
    addTask.addEventListener('click', () => taskForm.classList.toggle('hidden'));

    makeProject();
    addProject.addEventListener('click', () => {
        //console.log('hi')
        projectForm.classList.toggle('hidden');
    });
};
