// can create to do item, delete, edit, etc. 

const todo = () => {
    let todos = [];

    let title;
    let description;
    let dueDate;
    let priority;

    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;

    const createTodo = (title, description, dueDate, priority) => {
        const todoItem = {
            title, 
            description, 
            dueDate, 
            priority
        };
        todos.push(todoItem);
        // return todoItem ??? is this necessary???
    }





    return { createTodo, getTitle, getDescription, getDueDate, getPriority};
};

