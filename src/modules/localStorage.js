import { todo, project } from "./todo";

/*
 * Do the local storage thing
 * for every todo and project created, add it to the local storage (maybe there will be a key for todo/project, respectively) 
 * and the value is an array that has all of the todos/projects, respectively
 * Then when the document is loaded (this is an eventListener) get all of the todos/project
 * 
 * 
 * this might not work ^^^
 * Every project has a task array that has all of the tasks in that project, so maybe we need
 * local storage for the futureTodos and todayTodos and allTodos also so that those buttons work and so that the todos
 * will be saved even if you reloaded
 */

// might also need to check if the browser has localStorage 
//there was a document that said that not all browsers support local storage so i need an error handler for that potentially


/*
 * 
 * When the document is loaded, get the data from the local storage
 * Get the projects with their tasks
 * Get all/today/future todos
 * Everytime I create a project, I have to add that project to the local storage
 * every time i create a to do in a project, i have to update that corresponding item/project in local storage
 * everytime I edit or add to all/today/future to do arrays, I have to update the local storage
 * 
 */

export const addProjectToLocalStorage = (project) => {
    //if it doesn't exist yet
    if (!(localStorage.getItem('projects'))) {
        localStorage.setItem('projects', JSON.stringify([]));
    }
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == project.projectName) {
            projectsArray.splice(i, 1)
        }
    }
    projectsArray.push(project);
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

export const deleteProjectFromLocalStorage = (name) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == name) {
            projectsArray.splice(i, 1);
        }
    }
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

export const addTaskToProjectInLocalStorage = (todoItem) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == project.getCurrentProject().projectName) {
            projectsArray[i].taskArr.push(todoItem);
        }
    }
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

export const deleteTaskInProjectInLocalStorage = (todoItem) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == project.getCurrentProject().projectName) {
            for (let j = 0; j < projectsArray[i].taskArr.length; j++) {
                if (projectsArray[i].taskArr[j].title == todoItem) {
                    projectsArray[i].taskArr.splice(j, 1);
                }
            }
        }
    }
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

/*
 * Everytiime something is added in all/today/future todos, add it to the corresponding item in local storage also
 * and everyrtime something is deleted/edited in all/today/future todos, delete/edit it in the local storage also
 */

// make the add/delete todos more efficient
//combine the addtodo functions and create one whole function that takes the todoItem 
//and the name of the array it uses and have conditional statements correspondingly
//same thing with the deleteTodo functions

export const addTodoToAllTodosInLocalStorage = (todoItem) => {
    //if it doesn't exist yet
    if (!(localStorage.getItem('allTodos'))) {
        localStorage.setItem('allTodos', JSON.stringify([]));
    }
    
    let allTodos = JSON.parse(localStorage.getItem('allTodos'));
    allTodos.push(todoItem);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
    
}

export const deleteTodoInAllTodosInLocalStorage = (name) => {
    if (localStorage.getItem('allTodos')) {
       let allTodos = JSON.parse(localStorage.getItem('allTodos'));

        for (let i = 0; i < allTodos.length; i++) {
            if (allTodos[i].title == name) {
                allTodos.splice(i, 1);
            }
        }
        localStorage.setItem('allTodos', JSON.stringify(allTodos));
    }
}

export const addTodoToTodayTodosInLocalStorage = (todoItem) => {
    //if it doesn't exist yet
    if (!(localStorage.getItem('todayTodos'))) {
        localStorage.setItem('todayTodos', JSON.stringify([]));
    }
    let placeholder = localStorage.getItem('todayTodos');
    let todayTodos = JSON.parse(placeholder);
    todayTodos.push(todoItem);
    localStorage.setItem('todayTodos', JSON.stringify(todayTodos));
}   

export const deleteTodayTodoInLocalStorage = (name) => {
    if (localStorage.getItem('todayTodos')) {
        let todayTodos = JSON.parse(localStorage.getItem('todayTodos'));
        for (let i = 0; i < todayTodos.length; i++) {
            if (todayTodos[i].title == name) {
                todayTodos.splice(i, 1);
            }
        }
        localStorage.setItem('todayTodos', JSON.stringify(todayTodos));
    }
}

export const addFutureTodoInLocalStorage = (todoItem) => {
    if (!(localStorage.getItem('futureTodos'))) {
        localStorage.setItem('futureTodos', JSON.stringify([]))
    }
    const futureTodos = JSON.parse(localStorage.getItem('futureTodos'));
    futureTodos.push(todoItem);
    localStorage.setItem('futureTodos', JSON.stringify(futureTodos));
}

export const deleteFutureTodoInLocalStorage = (name) => {
    const futureTodos = JSON.parse(localStorage.getItem('futureTodos'));
    for (let i = 0; i < futureTodos.length; i++) {
        if (futureTodos[i].title == name) {
            futureTodos.splice(i, 1);
        }
    }
    localStorage.setItem('futureTodos', JSON.stringify(futureTodos));
}

//if you delete a project, it doesn't delete the todos in that project that are in the local storage -- got to fix this
//first get the project that is about to be deleted
//loop through the taskArr of that project and compare it to allTodos/todayTodos/futureTodos
//if any of them match, then delete them

export const deleteTasksWhenProjectDeletedInLocalStorage = (name) => {
    const projects = JSON.parse(localStorage.getItem('projects'));
    let currentProject;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName == name) { 
            currentProject = projects[i];
            break;
        }
    }

    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    const todayTodos = JSON.parse(localStorage.getItem('todayTodos'));
    const futureTodos = JSON.parse(localStorage.getItem('futureTodos'));
    for (let i = 0; i < currentProject.taskArr.length; i++) {
        if (allTodos) {
            for (let j = 0; j < allTodos.length; j++) {
                if (currentProject.taskArr[i].title == allTodos[j].title) {
                    allTodos.splice(j, 1);
                    todo.getAllTodos().splice(j, 1);
                }
            }
        }
        if (todayTodos) {
            for (let k = 0; k < todayTodos.length; k++) {
                if (currentProject.taskArr[i].title == todayTodos[k].title) {
                    todayTodos.splice(k, 1);
                    todo.getTodayTodos().splice(k, 1);
                }
            }
        }
        if (futureTodos) {
            for (let l = 0; l < futureTodos.length; l++) {
                if (currentProject.taskArr[i].title == futureTodos[l].title) {
                    futureTodos.splice(l, 1);
                    todo.getFutureTodos().splice(l, 1);
                }
            }
        }
    }
    if (allTodos) localStorage.setItem('allTodos', JSON.stringify(allTodos));
    if (todayTodos) localStorage.setItem('todayTodos', JSON.stringify(todayTodos));
    if (futureTodos) localStorage.setItem('futureTodos', JSON.stringify(futureTodos));
    
}