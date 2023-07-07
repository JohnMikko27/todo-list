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
    const getProjects = () => projects;

    const createProject = (projectName) => {
        const projectItem = {
            projectName
        }
        projects.push(projectItem);
    }

    return { createProject, getProjects }
})()

