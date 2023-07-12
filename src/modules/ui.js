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

export const displayProjects = () => {
    const projectContainer = document.querySelector('#project-container');
    projectContainer.textContent = ' ';

    for (let i = 0; i < project.getProjects().length; i++) {
       
        let div = document.createElement('div');
        let options = document.createElement('img');

        div.textContent = project.getProjects()[i].projectName;
        options.src = close;
        div.classList.add('project');
        options.classList.add('project-options');
        //options.classList.add('hidden');

        div.appendChild(options);
        projectContainer.appendChild(div);
    }
    deleteProject();
    showTasksInProject();
    
}
//rename this function later
//when any of the projects are clicked
export const showTasksInProject = () => {
    const projects = document.querySelectorAll('.project');
    const projectNameHeader = document.querySelector('#project-name-header')

    projects.forEach(item => item.addEventListener('click', (e) => {
        projectNameHeader.textContent = `${e.target.textContent}`
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
        let btnCont = document.createElement('div')
        let important = document.createElement('img');
        let options = document.createElement('img');
        const container = document.createElement('div');
        const editButton = document.createElement('div');
        const deleteButton = document.createElement('div');

        title.textContent = project.getCurrentProject().taskArr[i].title;
        description.textContent = project.getCurrentProject().taskArr[i].description;
        dueDate.textContent = project.getCurrentProject().taskArr[i].dueDate;
        important.src = star;
        options.src = option;

        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';
        container.classList.add('optional-buttons')
        container.classList.add('hidden');
        taskContainer.classList.add('task-container')
        important.classList.add('important');
        options.classList.add('task-options');
        editButton.classList.add('task-edit-button');
        deleteButton.classList.add('task-delete-button');

        container.appendChild(editButton);
        container.appendChild(deleteButton);
        btnCont.appendChild(important);
        btnCont.appendChild(options)
        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate);
        taskContainer.appendChild(btnCont);
        taskContainer.appendChild(container);
    
        tasks.appendChild(taskContainer);
    }
    taskOptionClicked();
    //deleteTaskInProject();
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

    projectOptions.forEach(element => element.addEventListener('click', (e) => {
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

//show close button when hover over project later
/*
const showCloseButton = () => {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => project.addEventListener('mouseover', (e) => {
        console.log(e.target)
        e.target.lastChild.classList.toggle('hidden');
    }))
}*/


export const taskOptionClicked = () => {
    
    const taskOptions = document.querySelectorAll('.task-options')

    taskOptions.forEach(element => element.addEventListener('click', (e) => {

        e.target.parentNode.parentNode.lastChild.classList.toggle('hidden');
        deleteTaskInProject();
        editTaskInProject();
        /* 
         * 
         * if clicked outside of the element, then make it hidden/or delete it
         * do this so that the user can exit the optionsButtons if they click somewhere else
         * 
         */
    }))
}


/*
 * When each task-options is clicked, show an edit/delete button which allows you to either edit the task or delete the task
 * Edit: 
 * When edit button is clicked, 
 * show a pop up form with the inputs (title, description, dueDate) being the value of that current task
 * make this into a form that shows over everything else
 * when the form is submitted, change that task's title, description, dueDate, etc. 
 * Do this ^^^ by going through the currentProject's taskArr and then change the corresponding task's title, description, dueDate
 * then displayTasksInProject again
 */

const editTaskInProject = () => {

    //for each editTask button clcicked, show the form with its current values then attach form eventListener
    const editTaskForm = document.querySelector('#edit-task-form')
    const editButtons = document.querySelectorAll('.task-edit-button');
    editButtons.forEach(btn => btn.addEventListener('click', (e) => {
        
        // e.target.parentNode.parentNode.appendChild(form);
        editTaskForm.classList.toggle('hidden');    

        document.querySelector('#edit-title').value = e.target.parentNode.parentNode.firstChild.textContent;
        document.querySelector('#edit-description').value = e.target.parentNode.parentNode.children.item(1).textContent;
        document.querySelector('#edit-date').value = e.target.parentNode.parentNode.children.item(2).textContent;

        const title = document.querySelector('#edit-title');
        const description = document.querySelector('#edit-description');
        const dueDate = document.querySelector('#edit-date');
        console.log(title)
        console.log(e.target.parentNode.parentNode.children.item(1))
        console.log(e.target.parentNode.parentNode.children.item(2))

        title.textContent = e.target.parentNode.parentNode.firstChild.textContent;
        description.textContent = e.target.parentNode.parentNode.children.item(1).textContent;
        dueDate.textContent = e.target.parentNode.parentNode.children.item(2).textContent;

        editTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.querySelector('#edit-title').value;
            const description = document.querySelector('#edit-description').value;
            const dueDate = document.querySelector('#edit-dueDate').value;

            for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
                if (project.getCurrentProject().taskArr[i].title == title) {
                    project.getCurrentProject().taskArr[i].title = title;
                    project.getCurrentProject().taskArr[i].description = description;
                    project.getCurrentProject().taskArr[i].dueDate = dueDate;
                }
            }
        
            editTaskForm.reset();
            editTaskForm.classList.toggle('hidden');
            
            displayTasksInProject();
            
           })
    }))

}
/*
const createEditTaskForm = () => {
    const form = document.createElement('form');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');
    const dueDateLabel = document.createElement('label');
    const dueDateInput = document.createElement('input');
    const button = document.createElement('button');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');

    titleLabel.textContent = 'Title';
    descriptionLabel.textContent = 'Description';
    dueDateLabel.textContent = 'Due Date';
    button.textContent = 'Submit';

    form.setAttribute('id', 'edit-task-form');
    titleLabel.setAttribute('for', 'edit-title');
    titleInput.setAttribute('id', 'edit-title');
    descriptionLabel.setAttribute('for', 'edit-description');
    descriptionInput.setAttribute('id', 'edit-description')
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('id', 'edit-dueDate');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'edit-task-button');

    div1.appendChild(titleLabel);
    div1.appendChild(titleInput);
    div2.appendChild(descriptionLabel);
    div2.appendChild(descriptionInput);
    div3.appendChild(dueDateLabel);
    div3.appendChild(dueDateInput);
    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(div3);
    form.appendChild(button);

    return form;
}*/

const deleteTaskInProject = () => {
    const deleteButton = document.querySelectorAll('.task-delete-button');

    deleteButton.forEach(btn => btn.addEventListener('click', (e) => {
        console.log('task deleted')
        console.log(e.target.parentNode.parentNode.firstChild.textContent);
        console.log(project.getCurrentProject())
        todo.deleteTodo(e.target.parentNode.parentNode.firstChild.textContent);
        displayTasksInProject();
    }))
}