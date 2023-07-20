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
export const displayAllTodos = () => {
    clearTaskContainer();
    const tasks = document.querySelector('#tasks')
    for (let i = 0; i < todo.getAllTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = todo.getAllTodos()[i].title;
        description.textContent = todo.getAllTodos()[i].description;
        dueDate.textContent = todo.getAllTodos()[i].dueDate;

        taskContainer.classList.add('task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}

/*
if all tasks button is clicked, display all of the tasks

task button is clicked, make the tasks container blank then display all the tasks
*/
export const allTasksClicked = () => {
    const allTasksButton = document.querySelector('#all-tasks');
    const projectNameHeader = document.querySelector('#project-name-header')
    allTasksButton.addEventListener('click', (e) => {
        displayAllTodos()
        projectNameHeader.textContent = 'All Tasks';
    });
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
       // clearTaskContainer();
        project.setCurrentProject(e.target.textContent);
        displayTasksInProject();
    }))
}
//have to add a delete tasks function that deletes the tasks on the page if the current project is the one that got deleted
//because it still shows the previous tasks even if that project got deleted
const displayTasksInProject = () => {
    clearTaskContainer();
    let tasks = document.querySelector('#tasks')
    for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');
        let btnCont = document.createElement('div')
        let important = document.createElement('img');
        let options = document.createElement('img');
        let container = document.createElement('div');
        let editButton = document.createElement('div');
        let deleteButton = document.createElement('div');

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
        btnCont.appendChild(options);
        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate);
        taskContainer.appendChild(btnCont);
        taskContainer.appendChild(container);
        tasks.appendChild(taskContainer);
    }
    taskOptionClicked();
   // editTaskInProject();
    //deleteTaskInProject();
}

export const clearTaskContainer = () => {
    const tasks = document.querySelector('#tasks');
    tasks.textContent = ' ';
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
      //  editTaskInProject();
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


//editing a task only works once, after u edit a task once, it breaks
/*
const editTaskInProject = () => {
    //for each editTask button clcicked, show the form with its current values then attach form eventListener
    
    const editButtons = document.querySelectorAll('.task-edit-button');
    editButtons.forEach(btn => btn.addEventListener('click', (e) => {
        console.log('hi')
        editTaskForm.classList.toggle('hidden');
        const editTaskForm = document.querySelector('#edit-task-form')
        let title = document.querySelector('#edit-title');
        let description = document.querySelector('#edit-description');
        let dueDate = document.querySelector('#edit-date');

        title.value = e.target.parentNode.parentNode.children.item(0).textContent;
        description.value = e.target.parentNode.parentNode.children.item(1).textContent;
        dueDate.value = e.target.parentNode.parentNode.children.item(2).textContent;

        let oldTitle = e.target.parentNode.parentNode.children.item(0).textContent;

        editTaskForm.addEventListener('submit', (e) => {
            console.log('submitted')
            e.preventDefault();

            let newTitle = document.querySelector('#edit-title').value;
            let newDescription = document.querySelector('#edit-description').value;
            let newDueDate = document.querySelector('#edit-date').value;

            todo.editTodo(oldTitle, newTitle, newDescription, newDueDate);

            

            editTaskForm.reset();
            editTaskForm.classList.toggle('hidden');
            displayTasksInProject();
        })
    }))

}
*/

const deleteTaskInProject = () => {
    const deleteButton = document.querySelectorAll('.task-delete-button');

    deleteButton.forEach(btn => btn.addEventListener('click', (e) => {
        console.log('task deleted')
        console.log(e.target.parentNode.parentNode.firstChild.textContent);
        console.log(project.getCurrentProject())
        todo.deleteTodo(e.target.parentNode.parentNode.firstChild.textContent);
        todo.deleteTodoInAllTodosArray(e.target.parentNode.parentNode.firstChild.textContent);
        displayTasksInProject();
    }))
}


/*
editing a task once works, but after correctly editing, when i try to edit a second time 
- even if the task is in a different project-it breaks 

It's because the eventListener for submitting the form run twice on the second time i try to submit a form (second time editing)
so it makes the task blank because it runs twice

Maybe learn about bubbling and propagation to hopefully fix this
*/