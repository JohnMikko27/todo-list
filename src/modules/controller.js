//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js
import { makeTodo, makeProject } from "./ui";
import { todo } from "./todo";



export const eventHandlers = () => {
    const addTask = document.querySelector('#add-task');
    const taskForm = document.querySelector('#task-form');
    const addProject = document.querySelector('#add-project-button');
    const projectForm = document.querySelector('#project-form');
    const cancelProjectButton = document.querySelector('#cancel-project-button');
    const submitProjectButton = document.querySelector('#submit-project-button')

    makeTodo();
    addTask.addEventListener('click', () => taskForm.classList.toggle('hidden'));

    // on the click of the add project button !
    // show a modal that asks for the project name with  'add' and 'cancel' buttons !
    // if 'cancel' clicked, hide the modal again and reset it
    // if 'add' is clicked create a new project from todo.js and push it into 'projects' array
    // and then create a function to display all projects
    addProject.addEventListener('click', () => {
        //console.log('hi')
        projectForm.classList.remove('hidden');
        makeProject();
    });

};
