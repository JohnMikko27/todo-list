// can create to do item, delete, edit, etc. 

export const todo = (() => {
    let todos = [];
    
    const getTodos = () => todos;

    const createTodo = (title, description, dueDate) => {
        const todoItem = {
            title, 
            description, 
            dueDate, 
        };
        
        todos.push(todoItem);
      //  if(project.getCurrentProject()===undefined) return;
        project.getCurrentProject().taskArr.push(todoItem);
        // return todoItem ??? is this necessary???
    }

    const deleteTodo = (todoItem) => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i] == todoItem)  {
                todos.splice(i, 1);
            }
        }
    }

    /*const editTodo = (todoItem) => { not sure how to implement this
    }*/

    return { getTodos, createTodo, deleteTodo};
})();

export const project = (() => {
    let projects = []
    //need to set a default one to not create bugs      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let currentProject;

    const getProjects = () => projects;

    const createProject = (projectName) => {
        const projectItem = {
            projectName, 
            taskArr: [],
        }
        projects.push(projectItem);
    }

    const getCurrentProject = () => currentProject;

    const setCurrentProject = (name) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName == name) {
                currentProject = projects[i];
            }
        }
    }
   /*
    * create a default project function that creates a default project
    * it then pushes that project to the projects array
    * then we call that and then display projects from ui.js to controller.js
    */

    const createDefaultProject = () => {
        createProject('default');
    }
    return { createProject, getProjects, getCurrentProject, setCurrentProject, createDefaultProject }
})()

//get the tasks that are in that project and display them
    //to do this ^^^ maybe have an array in each project item that contains all the tasks in that project
    //and also have a function called get current project/directory to set the current project everytime a project is clicked
    //so that when we display the project, we can get the correct tasks

    //big question for this, how are we going to track every task in a project or how are we going to know which
    // is the current project so that we can display the correct tasks

    //another idea: have an array in each projectItem object and a function that adds tasks to that project 
    //(which is why current project function is needed)
