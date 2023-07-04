//change the dom
import { todo } from "./todo";

//able to get the form's values when it submits now
export const getFormValues = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const date = document.querySelector('#date');
        console.log(title, description, date)
        return { title, description, date };
    })
}

export const displayTodos = () => {
    
}

