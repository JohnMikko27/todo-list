//change the dom
import { todo, project } from "./todo";

//able to get the form's values when it submits now
export const makeTodo = () => {
    const taskForm = document.querySelector('#task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#date');

        //console.log(title.value, description.value, date.value);
        todo.createTodo(title.value, description.value, dueDate.value);
        //console.log(todo.getTodos());
        displayTodos();

        taskForm.reset();
        taskForm.classList.toggle('hidden');
    })
}   

export const makeProject = () => {
// on the click of the add project button
// show a modal that asks for the project name with  'add' and 'cancel' buttons
// if 'add' is clicked create a new project from todo.js and push it into 'projects' array
    const projectForm = document.querySelector('#project-form');
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.querySelector('#project-name');

        project.createProject(projectName.value);
        displayProjects();

        projectForm.reset();
        projectForm.classList.toggle('hidden');
    })
// and then create a function to display all projects

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

export const displayProjects = () => {
    const projectContainer = document.querySelector('#project-container');
    projectContainer.textContent = ' ';
    for (let i = 0; i < project.getProjects().length; i++) {
        const div = document.createElement('div');
        div.textContent = project.getProjects()[i].projectName;
        div.classList.add('project');
        projectContainer.appendChild(div);
    }
}

//when any of the projects are clicked
export const showTasksInProject = () => {
    console.log('hi')
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => project.addEventListener('click', (e) => {
        //make the right side content's tasks-container blank, but leave the 'add-task' button
        clearTaskContainer();
        console.log('hi im a project')
    }))
}

export const clearTaskContainer = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
}
//get the tasks that are in that project and display them
//to do this ^^^ maybe have an array in each project item that contains all the tasks in that project
//and also have a function called get current project/directory to set the current project everytime a project is clicked
//so that when we display the project, we can get the correct tasks

//big question for this, how are we going to track every task in a project or how are we going to know which
// is the current project so that we can display the correct tasks

//another idea: have an array in each projectItem object and a function that adds tasks to that project 
//(which is why current project function is needed)

