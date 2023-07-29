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
export const onDomLoad = () => {
    localStorage.setItem('projects', [])
    localStorage.setItem('allTodos', [])
    localStorage.setItem('todayTodos', [])
    localStorage.setItem('futureTodos', [])

}


export const addProjectToLocalStorage = (project) => {
    // if it exists already
    if (!(localStorage.getItem('projects'))) {
        localStorage.setItem('projects', JSON.stringify([]));
    }
    if (localStorage.getItem('projects')) {
        let placeHolder = localStorage.getItem('projects');
        let projectsArray = JSON.parse(placeHolder);

        for (let i = 0; i < projectsArray.length; i++) {
            if (projectsArray[i].projectName == project.projectName) {
                projectsArray.splice(i, 1)
            }
        }
        projectsArray.push(project);
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }
}