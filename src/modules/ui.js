//change the dom
import { todo } from "./todo";

//able to get the form's values when it submits now
export const makeTodo = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#date');

        //console.log(title.value, description.value, date.value);
        todo.createTodo(title.value, description.value, dueDate.value);
        //console.log(todo.getTodos());
        displayTodos();

        form.reset();
        form.classList.toggle('hidden');
    })
}   

export const displayTodos = () => {
    const tasks = document.querySelector('#tasks');

    //deletes all the currently displayed tasks
    //then displays them to avoid duplication of tasks being displayed
    tasks.textContent = ' ';
    
    for (let i = 0; i < todo.getTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = todo.getTodos()[i].title;
        description.textContent = todo.getTodos()[i].description;
        dueDate.textContent = todo.getTodos()[i].dueDate;

        taskContainer.setAttribute('id', 'task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}



