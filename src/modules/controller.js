//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js
import { displayDefaultProject, addTask, allTasksClicked, todayTasksClicked, futureTodosClicked } from "./ui";
import { addProject, displayProjects, clearProjectHeader } from "./projectUI"
import { onload } from "./localStorageUI";



export const eventHandlers = () => {
    //clearProjectHeader();
    //displayDefaultProject();
    onload();
    displayProjects();
    addTask();
    addProject();
    allTasksClicked();
    todayTasksClicked();
    futureTodosClicked();
};
