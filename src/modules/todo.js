import { addFutureTodoInLocalStorage, addProjectToLocalStorage, addTaskToProjectInLocalStorage, addTodoToAllTodosInLocalStorage, addTodoToTodayTodosInLocalStorage, deleteFutureTodoInLocalStorage, deleteProjectFromLocalStorage, deleteTaskInProjectInLocalStorage, deleteTasksWhenProjectDeletedInLocalStorage, deleteTodayTodoInLocalStorage, deleteTodoInAllTodosInLocalStorage } from "./localStorage";

export const todo = (() => {
    let allTodos = [];
    let todayTodos = [];
    let futureTodos = [];
    
    const getAllTodos = () => allTodos;
    const getTodayTodos = () => todayTodos;
    const getFutureTodos = () => futureTodos;

    const createTodo = (title, description, dueDate) => {
        const todoItem = {
            title, 
            description, 
            dueDate, 
        };

        addTodayTodo(todoItem);
        addFutureTodos(todoItem);
        allTodos.push(todoItem);
        addTodoToAllTodosInLocalStorage(todoItem);
        project.getCurrentProject().taskArr.push(todoItem);
        addTaskToProjectInLocalStorage(todoItem);
    }

    //deletes todo in the current project
    const deleteTodo = (todoItem) => {
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == todoItem)  {
                project.getCurrentProject().taskArr.splice(i, 1);
                deleteTaskInProjectInLocalStorage(todoItem);
            }
        }
    }

    const deleteTodoInAllTodosArray = (todoItem) => {
        for (let i = 0; i < getAllTodos().length; i++) {
            if (getAllTodos()[i].title == todoItem) {
                getAllTodos().splice(i,1);
                deleteTodoInAllTodosInLocalStorage(todoItem);
            }
        }
    }
    
    const editTodo = (oldTitle, newTitle, newDescription, newDueDate) => {
        let todoItem;
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == oldTitle) {
                let curr = project.getCurrentProject().taskArr;
                project.getCurrentProject().taskArr[i].title = newTitle;
                project.getCurrentProject().taskArr[i].description = newDescription;
                project.getCurrentProject().taskArr[i].dueDate = newDueDate;
                todoItem = project.getCurrentProject().taskArr[i];
            }
        }
        //updates today/future todo array
        deleteTodayTodo(oldTitle);
        deleteFutureTodo(oldTitle);
        addTodayTodo(todoItem);
        addFutureTodos(todoItem);

        deleteTaskInProjectInLocalStorage(oldTitle);
        addTaskToProjectInLocalStorage(todoItem);
        deleteTodoInAllTodosArray(oldTitle);
        allTodos.push(todoItem);
        addTodoToAllTodosInLocalStorage(todoItem);
    }

    const addTodayTodo = (todoItem) => {
        let currentDate = new Date();
        let todoItemDate = new Date(todoItem.dueDate);
        todoItemDate.setDate(todoItemDate.getDate()+1);

        if (todoItemDate.getDate() == currentDate.getDate() 
        && todoItemDate.getMonth() == currentDate.getMonth() 
        && todoItemDate.getFullYear() == currentDate.getFullYear()) {
            todayTodos.push(todoItem)
            addTodoToTodayTodosInLocalStorage(todoItem);
        }
    }

    const deleteTodayTodo = (todoItem) => {
        for (let i = 0; i < getTodayTodos().length; i++) {
            if (getTodayTodos()[i].title == todoItem) {
                getTodayTodos().splice(i,1);
                deleteTodayTodoInLocalStorage(todoItem);
            }
        }
    }

    const addFutureTodos = (todoItem) => {
        let currentDate = new Date()
        let todoItemDate = new Date(todoItem.dueDate);
        let future = new Date(currentDate);

        todoItemDate.setDate(todoItemDate.getDate()+1)
        future.setDate(currentDate.getDate() + 1);
    
        if (todoItemDate >= future) {
            futureTodos.push(todoItem);
            addFutureTodoInLocalStorage(todoItem);
        }
    }

    const deleteFutureTodo = (todoItem) => {
        for (let i = 0; i < getFutureTodos().length; i++) {
            if (getFutureTodos()[i].title == todoItem) {
                getFutureTodos().splice(i,1);
                deleteFutureTodoInLocalStorage(todoItem);
            }
        }
    }

    return { getAllTodos, createTodo, deleteTodo, editTodo, deleteTodoInAllTodosArray, 
             getTodayTodos, deleteTodayTodo, getFutureTodos, deleteFutureTodo };
})();

export const project = (() => {
    let projects = []
    let currentProject;
    let previousProject;

    const getProjects = () => projects;

    const createProject = (projectName) => {
        const projectItem = {
            projectName, 
            taskArr: [],
        }
        projects.push(projectItem);
        addProjectToLocalStorage(projectItem);
    }

    const getCurrentProject = () => currentProject;

    const setCurrentProject = (name) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName == name) {
                currentProject = projects[i];
            }
        }
    }

    const createDefaultProject = () => {
        createProject('Home');
        setCurrentProject('Home');
    }

    const deleteProject = (name) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName == name) {
                projects.splice(i, 1);
                deleteTasksWhenProjectDeletedInLocalStorage(name);
                deleteProjectFromLocalStorage(name);
            }
        }
    }

    return { createProject, getProjects, getCurrentProject, setCurrentProject, createDefaultProject, deleteProject }
})()
