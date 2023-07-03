// can create to do item, delete, edit, etc. 

const todo = () => {
    let todos = [];
    
    const getTodos = () => todos;

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

    const deleteTodo = (todoItem) => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i] == todoItem)  {
                todos.splice(i, 1);
            }
        }
    }





    return { getTodos, createTodo, deleteTodo};
};

