import { todo, project } from "./todo";
import star from '../icons/star-outline.svg'
import optionButton from '../icons/more-vertical-alt.svg'

export const makeTodo = () => {
    const taskForm = document.querySelector('#task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#date');

        todo.createTodo(title.value, description.value, dueDate.value);
       
      //  displayTodos();
        displayTasksInProject();

        taskForm.reset();
        taskForm.classList.toggle('hidden');
    })
}   

export const makeProject = () => {
    const projectForm = document.querySelector('#project-form');
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.querySelector('#project-name');

        project.createProject(projectName.value);
        displayProjects();

        projectForm.reset();
        projectForm.classList.toggle('hidden');
    })
}

//make this the display 'ALL TODOS' function when 'ALL TASKS' is clicked
export const displayTodos = () => {
    const tasks = document.querySelector('#tasks');

    //deletes all the currently displayed tasks
    tasks.textContent = ' ';
    //then displays them to avoid duplication of tasks being displayed
    for (let i = 0; i < todo.getTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = todo.getTodos()[i].title;
        description.textContent = todo.getTodos()[i].description;
        dueDate.textContent = todo.getTodos()[i].dueDate;

        taskContainer.classList.add('task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}


export const displayProjects = () => {
    const projectContainer = document.querySelector('#project-container');
    projectContainer.textContent = ' ';

    for (let i = 0; i < project.getProjects().length; i++) {
        const div = document.createElement('div');
        let options = document.createElement('img');

        div.textContent = project.getProjects()[i].projectName;
        options.src = optionButton;
        div.classList.add('project');
        options.classList.add('project-options');
        
        projectContainer.appendChild(div);
        projectContainer.appendChild(options);
    }
    deleteProject();
    showTasksInProject();
}

//when any of the projects are clicked
export const showTasksInProject = () => {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(item => item.addEventListener('click', (e) => {
        console.log('project clicked')
        clearTaskContainer();
        project.setCurrentProject(e.target.textContent);
        displayTasksInProject();
    }))
}

const displayTasksInProject = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
    
    for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');
        let important = document.createElement('img');
        let options = document.createElement('img');

        title.textContent = project.getCurrentProject().taskArr[i].title;
        description.textContent = project.getCurrentProject().taskArr[i].description;
        dueDate.textContent = project.getCurrentProject().taskArr[i].dueDate;
        important.src = star;
        options.src = optionButton;

        taskContainer.setAttribute('id', 'task-container');
        important.classList.add('important');
        options.classList.add('task-options');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate);
        taskContainer.appendChild(important);
        taskContainer.appendChild(options);

        tasks.appendChild(taskContainer);
    }
}

export const clearTaskContainer = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
}

export const displayDefaultProject = () => {
    project.createDefaultProject();
    displayProjects();
}

/*
 * Task1: create a delete function that deletes a project and/or tasks
First I need to add the 3 dots as an option to each task and project
When delete is clicked
Delete that project/task from its corresponding array and then call displayProjects/displayTasksInProject again
*/

export const deleteProject = () => {
    const projectOptions = document.querySelectorAll('.project-options');

    projectOptions.forEach(element => element.addEventListener('click', (e) => {
        console.log('option clicked');
        console.log(e.target.previousSibling.textContent);
        project.deleteProject(e.target.previousSibling.textContent);
        displayProjects();
    }))
}