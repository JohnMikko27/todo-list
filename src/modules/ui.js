import { todo, project } from "./todo";
import star from '../icons/star-outline.svg'
import close from '../icons/close.png'
import option from '../icons/more-vertical-alt.svg'

//attaches eventListener for when taskForm is submitted
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

//attaches eventListener for when projectForm is submitted
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


//should change it so that the image and the textContent both go in a single container instead of being in different ones
//change this first !!!!!!!!! ^^^^^^^^^^ both the text and options img should go in the div.project as children
export const displayProjects = () => {
    const projectContainer = document.querySelector('#project-container');
    projectContainer.textContent = ' ';

    for (let i = 0; i < project.getProjects().length; i++) {
        let container = document.createElement('div');
        let div = document.createElement('div');
        let options = document.createElement('img');

        div.textContent = project.getProjects()[i].projectName;
        options.src = close;
        container.classList.add('project');
        options.classList.add('project-options');
        
        container.appendChild(div);
        container.appendChild(options);
        projectContainer.appendChild(container);
    }
    deleteProject();
    showTasksInProject();
}
//rename this function later
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
//have to add a delete tasks function that deletes the tasks on the page if the current project is the one that got deleted
//because it still shows the previous tasks even if that project got deleted
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
        options.src = option;

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



//when you delete a project, it still shows the current tasks in that project (if you clicked it before deleting)
export const deleteProject = () => {
    const projectOptions = document.querySelectorAll('.project-options');

    projectOptions.forEach(element => element.addEventListener('click', function event(e) {
        console.log('option clicked');
        console.log(e.target.previousSibling.textContent);

        project.deleteProject(e.target.previousSibling.textContent);
        displayProjects();
        
    }))
}

//shows hidden task form
export const addTask = () => {
    const addTask = document.querySelector('#add-task');
    const taskForm = document.querySelector('#task-form');
    addTask.addEventListener('click', () => taskForm.classList.toggle('hidden'));
    makeTodo();
}

//shows hidden project form
export const addProject = () => {
    const addProject = document.querySelector('#add-project-button');
    const projectForm = document.querySelector('#project-form');
    addProject.addEventListener('click', () => projectForm.classList.toggle('hidden'));
    makeProject();
}