/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/controller.js":
/*!***********************************!*\
  !*** ./src/modules/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventHandlers: () => (/* binding */ eventHandlers)
/* harmony export */ });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/modules/ui.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");
//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js





const eventHandlers = () => {
    
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.displayDefaultProject)();
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.addTask)();
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.addProject)();
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.allTasksClicked)();
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.todayTasksClicked)();
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.futureTodosClicked)();
    
};


/***/ }),

/***/ "./src/modules/localStorage.js":
/*!*************************************!*\
  !*** ./src/modules/localStorage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProjectToLocalStorage: () => (/* binding */ addProjectToLocalStorage),
/* harmony export */   addTaskToProject: () => (/* binding */ addTaskToProject),
/* harmony export */   onDomLoad: () => (/* binding */ onDomLoad)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");


/*
 * Do the local storage thing
 * for every todo and project created, add it to the local storage (maybe there will be a key for todo/project, respectively) 
 * and the value is an array that has all of the todos/projects, respectively
 * Then when the document is loaded (this is an eventListener) get all of the todos/project
 * 
 * 
 * this might not work ^^^
 * Every project has a task array that has all of the tasks in that project, so maybe we need
 * local storage for the futureTodos and todayTodos and allTodos also so that those buttons work and so that the todos
 * will be saved even if you reloaded
 */

// might also need to check if the browser has localStorage 
//there was a document that said that not all browsers support local storage so i need an error handler for that potentially


/*
 * 
 * When the document is loaded, get the data from the local storage
 * Get the projects with their tasks
 * Get all/today/future todos
 * Everytime I create a project, I have to add that project to the local storage
 * every time i create a to do in a project, i have to update that corresponding item/project in local storage
 * everytime I edit or add to all/today/future to do arrays, I have to update the local storage
 * 
 */
const onDomLoad = () => {
    localStorage.setItem('projects', [])
    localStorage.setItem('allTodos', [])
    localStorage.setItem('todayTodos', [])
    localStorage.setItem('futureTodos', [])

}


const addProjectToLocalStorage = (project) => {
    // if it exists already
    if (!(localStorage.getItem('projects'))) {
        localStorage.setItem('projects', JSON.stringify([]));
    }
    if (localStorage.getItem('projects')) {
        let placeHolder = localStorage.getItem('projects');
        let projectsArray = JSON.parse(placeHolder);

        for (let i = 0; i < projectsArray.length; i++) {
            if (projectsArray[i].projectName == project.projectName) {
                projectsArray.splice(i, 1)
            }
        }
        projectsArray.push(project);
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }
}

const addTaskToProject = (todoItem) => {
    let placeHolder = localStorage.getItem('projects');
    let projectsArray = JSON.parse(placeHolder);
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().projectName) {
            projectsArray[i].taskArr.push(todoItem);
        }
    }
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

/***/ }),

/***/ "./src/modules/todo.js":
/*!*****************************!*\
  !*** ./src/modules/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   project: () => (/* binding */ project),
/* harmony export */   todo: () => (/* binding */ todo)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/modules/localStorage.js");


const todo = (() => {
    let allTodos = [];
    let todayTodos = [];
    let futureTodos = [];
    
    const getAllTodos = () => allTodos;
    const getTodayTodos = () => todayTodos;
    const getFutureTodos = () => futureTodos;

    const createTodo = (title, description, dueDate) => {
        const todoItem = {
            title, 
            description, 
            dueDate, 
        };

        addTodayTodo(todoItem);
        addFutureTodos(todoItem);
        allTodos.push(todoItem);
        project.getCurrentProject().taskArr.push(todoItem);
        (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addTaskToProject)(todoItem);
    }

    //deletes todo in the current project
    const deleteTodo = (todoItem) => {
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == todoItem)  {
                project.getCurrentProject().taskArr.splice(i, 1);
            }
        }
    }

    const deleteTodoInAllTodosArray = (todoItem) => {
        for (let i = 0; i < getAllTodos().length; i++) {
            if (getAllTodos()[i].title == todoItem) {
                getAllTodos().splice(i,1);
            }
        }
    }
    
    const editTodo = (oldTitle, newTitle, newDescription, newDueDate) => {
        let todoItem;
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == oldTitle) {
                project.getCurrentProject().taskArr[i].title = newTitle;
                project.getCurrentProject().taskArr[i].description = newDescription;
                project.getCurrentProject().taskArr[i].dueDate = newDueDate;
                todoItem = project.getCurrentProject().taskArr[i];
            }
        }
        //updates today/future todo array
        deleteTodayTodo(todoItem.title);
        deleteFutureTodo(todoItem.title);
        addTodayTodo(todoItem);
        addFutureTodos(todoItem);
    }

    const addTodayTodo = (todoItem) => {
        let currentDate = new Date()
        let todoItemDate = new Date(todoItem.dueDate)
        
        if (todoItemDate.getDate()+1 == currentDate.getDate() 
        && todoItemDate.getMonth() == currentDate.getMonth() 
        && todoItemDate.getFullYear() == currentDate.getFullYear()) {
            todayTodos.push(todoItem)
        }
    }

    const deleteTodayTodo = (todoItem) => {
        for (let i = 0; i < getTodayTodos().length; i++) {
            if (getTodayTodos()[i].title == todoItem) {
                getTodayTodos().splice(i,1);
            }
        }
    }

    const addFutureTodos = (todoItem) => {
        let currentDate = new Date()
        let todoItemDate = new Date(todoItem.dueDate)
       
        if (todoItemDate.getFullYear() > currentDate.getFullYear()) {
            futureTodos.push(todoItem);
        } else if (todoItemDate.getMonth() > currentDate.getMonth()) {
            futureTodos.push(todoItem);
        } else if (todoItemDate.getDate()+1 > currentDate.getDate()) {
            futureTodos.push(todoItem);
        } 
    }

    const deleteFutureTodo = (todoItem) => {
        for (let i = 0; i < getFutureTodos().length; i++) {
            if (getFutureTodos()[i].title == todoItem) {
                getFutureTodos().splice(i,1);
            }
        }
    }

    return { getAllTodos, createTodo, deleteTodo, editTodo, deleteTodoInAllTodosArray, getTodayTodos, deleteTodayTodo, getFutureTodos, deleteFutureTodo };
})();

const project = (() => {
    let projects = []
    let currentProject;
    let previousProject;

    const getProjects = () => projects;

    const createProject = (projectName) => {
        const projectItem = {
            projectName, 
            taskArr: [],
        }
        projects.push(projectItem);
        (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addProjectToLocalStorage)(projectItem);
    }

    const getCurrentProject = () => currentProject;

    const setCurrentProject = (name) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName == name) {
                currentProject = projects[i];
            }
        }
    }

    const createDefaultProject = () => {
        createProject('Home');
        setCurrentProject('Home');
    }

    const deleteProject = (name) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName == name) {
                projects.splice(i, 1);
            }
        }
    }

    return { createProject, getProjects, getCurrentProject, setCurrentProject, createDefaultProject, deleteProject }
})()


/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProject: () => (/* binding */ addProject),
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   allTasksClicked: () => (/* binding */ allTasksClicked),
/* harmony export */   clearTaskContainer: () => (/* binding */ clearTaskContainer),
/* harmony export */   deleteProject: () => (/* binding */ deleteProject),
/* harmony export */   displayAllTodos: () => (/* binding */ displayAllTodos),
/* harmony export */   displayDefaultProject: () => (/* binding */ displayDefaultProject),
/* harmony export */   displayProjects: () => (/* binding */ displayProjects),
/* harmony export */   displayTodayTodos: () => (/* binding */ displayTodayTodos),
/* harmony export */   futureTodosClicked: () => (/* binding */ futureTodosClicked),
/* harmony export */   makeProject: () => (/* binding */ makeProject),
/* harmony export */   makeTodo: () => (/* binding */ makeTodo),
/* harmony export */   showTasksInProject: () => (/* binding */ showTasksInProject),
/* harmony export */   taskOptionClicked: () => (/* binding */ taskOptionClicked),
/* harmony export */   todayTasksClicked: () => (/* binding */ todayTasksClicked)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");
/* harmony import */ var _icons_star_outline_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/star-outline.svg */ "./src/icons/star-outline.svg");
/* harmony import */ var _icons_close_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/close.png */ "./src/icons/close.png");
/* harmony import */ var _icons_more_vertical_alt_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/more-vertical-alt.svg */ "./src/icons/more-vertical-alt.svg");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./localStorage */ "./src/modules/localStorage.js");






//attaches eventListener for when taskForm is submitted
const makeTodo = () => {
    const taskForm = document.querySelector('#task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#date');

        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.createTodo(title.value, description.value, dueDate.value);
       
        displayTasksInProject();

        taskForm.reset();
        taskForm.classList.toggle('hidden');
    }, {once: true})
}   

//attaches eventListener for when projectForm is submitted
const makeProject = () => {
    const projectForm = document.querySelector('#project-form');
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.querySelector('#project-name');

        _todo__WEBPACK_IMPORTED_MODULE_0__.project.createProject(projectName.value);
        displayProjects();

        projectForm.reset();
        projectForm.classList.toggle('hidden');
    }, {once:true})
}

//make this the display 'ALL TODOS' function when 'ALL TASKS' is clicked
const displayAllTodos = () => {
    clearTaskContainer();
    const tasks = document.querySelector('#tasks')
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getAllTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getAllTodos()[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getAllTodos()[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getAllTodos()[i].dueDate;

        taskContainer.classList.add('task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}

const displayTodayTodos = () => {
    clearTaskContainer();
    const tasks = document.querySelector('#tasks')

    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodayTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodayTodos()[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodayTodos()[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodayTodos()[i].dueDate;

        taskContainer.classList.add('task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}

const todayTasksClicked = () => {
    const today = document.querySelector('#today');
    const addTask = document.querySelector('#add-task');
    const projectNameHeader = document.querySelector('#project-name-header');

    today.addEventListener('click', (e) => {
        displayTodayTodos();
        projectNameHeader.textContent = "Today's Tasks";
        addTask.classList.add('hidden');
    })
}

/*
if all tasks button is clicked, display all of the tasks

task button is clicked, make the tasks container blank then display all the tasks
*/
const allTasksClicked = () => {
    const allTasksButton = document.querySelector('#all-tasks');
    const addTask = document.querySelector('#add-task');
    const projectNameHeader = document.querySelector('#project-name-header');

    allTasksButton.addEventListener('click', (e) => {
        displayAllTodos()
        projectNameHeader.textContent = 'All Tasks';
        addTask.classList.add('hidden');
    });
}

const futureTodosClicked = () => {
    const nextSevenDays = document.querySelector('#this-week');
    const addTask = document.querySelector('#add-task');
    const projectNameHeader = document.querySelector('#project-name-header');

    nextSevenDays.addEventListener('click', () => {
        displayFutureTodos();
        projectNameHeader.textContent = 'Future Tasks';
        addTask.classList.add('hidden');
    })
}

const displayFutureTodos = () => {
    clearTaskContainer();
    const tasks = document.querySelector('#tasks')

    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getFutureTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getFutureTodos()[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getFutureTodos()[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getFutureTodos()[i].dueDate;

        taskContainer.classList.add('task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}

const displayProjects = () => {
    const projectContainer = document.querySelector('#project-container');
    const addTask = document.querySelector('#add-task');
    addTask.classList.remove('hidden');
    projectContainer.textContent = ' ';

    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects().length; i++) {
       
        let div = document.createElement('div');
        let options = document.createElement('img');

        div.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects()[i].projectName;
        options.src = _icons_close_png__WEBPACK_IMPORTED_MODULE_2__;
        div.classList.add('project');
        options.classList.add('project-options');
        //options.classList.add('hidden');

        if (_todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects()[i] == _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject()) {
            div.classList.add('project-clicked');
        }

        div.appendChild(options);
        projectContainer.appendChild(div);
    }
    deleteProject();
    showTasksInProject();
}
//rename this function later
//when any of the projects are clicked
const showTasksInProject = () => {
    const projects = document.querySelectorAll('.project');
    const projectNameHeader = document.querySelector('#project-name-header');
    const addTask = document.querySelector('#add-task');

    projects.forEach(item => item.addEventListener('click', (e) => {
        projectNameHeader.textContent = `${e.target.textContent}`;
        console.log('hi')
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.setCurrentProject(e.target.textContent);
        displayTasksInProject();
        displayProjects();
        addTask.classList.remove('hidden');
    }))
}

//have to add a delete tasks function that deletes the tasks on the page if the current project is the one that got deleted
//because it still shows the previous tasks even if that project got deleted

const displayTasksInProject = () => {
    clearTaskContainer();
    let tasks = document.querySelector('#tasks')
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr.length; i++) {
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

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].dueDate;
        important.src = _icons_star_outline_svg__WEBPACK_IMPORTED_MODULE_1__;
        options.src = _icons_more_vertical_alt_svg__WEBPACK_IMPORTED_MODULE_3__;

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
}

const clearTaskContainer = () => {
    const tasks = document.querySelector('#tasks');
    tasks.textContent = ' ';
}

const displayDefaultProject = () => {
    _todo__WEBPACK_IMPORTED_MODULE_0__.project.createDefaultProject();
    displayProjects();
}

//1. when you delete a project, it still shows the current tasks in that project (if you clicked it before deleting)
//2. other functionality: when you hover over project that's when the option to delete it should show
//   do this by adding a mouseover eventListener and when you hover over the project, it should show the 'X' to delete it, and then run a 
//   function that attaches an eventListener to that 'X' when you hover over it

const deleteProject = () => {
    const projectOptions = document.querySelectorAll('.project-options');

    projectOptions.forEach(element => element.addEventListener('click', (e) => {
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.deleteProject(e.target.previousSibling.textContent);
        displayProjects();
    }))
}

//shows hidden task form
const addTask = () => {
    const addTask = document.querySelector('#add-task');
    const taskForm = document.querySelector('#task-form');
    addTask.addEventListener('click', () => {
        taskForm.classList.toggle('hidden');
        makeTodo();
    });
}

//shows hidden project form
const addProject = () => {
    const addProject = document.querySelector('#add-project-button');
    const projectForm = document.querySelector('#project-form');
    addProject.addEventListener('click', () => {
        projectForm.classList.toggle('hidden');
        makeProject();
    });
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

const taskOptionClicked = () => {
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

const editTaskInProject = () => {
    const editButtons = document.querySelectorAll('.task-edit-button');
    const editTaskForm = document.querySelector('#edit-task-form');

    editButtons.forEach(btn => btn.addEventListener('click', (e) => {
        console.log('hi')
        editTaskForm.classList.toggle('hidden');
        
        let title = document.querySelector('#edit-title');
        let description = document.querySelector('#edit-description');
        let dueDate = document.querySelector('#edit-date');
        title.value = e.target.parentNode.parentNode.children.item(0).textContent;
        description.value = e.target.parentNode.parentNode.children.item(1).textContent;
        dueDate.value = e.target.parentNode.parentNode.children.item(2).textContent;
        let oldTitle = e.target.parentNode.parentNode.children.item(0).textContent;

        editTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('submitted');

            let newTitle = document.querySelector('#edit-title').value;
            let newDescription = document.querySelector('#edit-description').value;
            let newDueDate = document.querySelector('#edit-date').value;

            _todo__WEBPACK_IMPORTED_MODULE_0__.todo.editTodo(oldTitle, newTitle, newDescription, newDueDate);

            editTaskForm.reset();
            editTaskForm.classList.toggle('hidden');
            displayTasksInProject();
        }, {once: true})
    }))
}

const deleteTaskInProject = () => {
    const deleteButton = document.querySelectorAll('.task-delete-button');

    deleteButton.forEach(btn => btn.addEventListener('click', (e) => {
        console.log('task deleted')
        console.log(e.target.parentNode.parentNode.firstChild.textContent);
        console.log(_todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject())
        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.deleteTodo(e.target.parentNode.parentNode.firstChild.textContent);
        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.deleteTodoInAllTodosArray(e.target.parentNode.parentNode.firstChild.textContent);
        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.deleteTodayTodo(e.target.parentNode.parentNode.firstChild.textContent);
        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.deleteFutureTodo(e.target.parentNode.parentNode.firstChild.textContent);
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

/***/ }),

/***/ "./src/icons/close.png":
/*!*****************************!*\
  !*** ./src/icons/close.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4394516abb411fbb700d.png";

/***/ }),

/***/ "./src/icons/more-vertical-alt.svg":
/*!*****************************************!*\
  !*** ./src/icons/more-vertical-alt.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a14a883c968304e7f5c1.svg";

/***/ }),

/***/ "./src/icons/star-outline.svg":
/*!************************************!*\
  !*** ./src/icons/star-outline.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c2e6e6dd118d33c26922.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/controller */ "./src/modules/controller.js");

(0,_modules_controller__WEBPACK_IMPORTED_MODULE_0__.eventHandlers)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUM2STtBQUMvRzs7OztBQUl2QjtBQUNQO0FBQ0EsSUFBSSwwREFBcUI7QUFDekIsSUFBSSw0Q0FBTztBQUNYLElBQUksK0NBQVU7QUFDZCxJQUFJLG9EQUFlO0FBQ25CLElBQUksc0RBQWlCO0FBQ3JCLElBQUksdURBQWtCO0FBQ3RCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUMsNENBQTRDLDBDQUFPO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRTRFOztBQUVyRTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQWdEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQWdEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1RUFBd0I7QUFDaEM7O0FBRUE7O0FBRUE7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5SXNDO0FBQ0s7QUFDTjtBQUNhO0FBQ087O0FBRTFEO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsdUNBQUk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLEdBQUcsV0FBVztBQUNuQjs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVEsMENBQU87QUFDZjs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxHQUFHLFVBQVU7QUFDbEI7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSSx1Q0FBSSx1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLHVDQUFJO0FBQ2hDLGtDQUFrQyx1Q0FBSTtBQUN0Qyw4QkFBOEIsdUNBQUk7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBLG9CQUFvQixJQUFJLHVDQUFJLHlCQUF5QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsdUNBQUk7QUFDaEMsa0NBQWtDLHVDQUFJO0FBQ3RDLDhCQUE4Qix1Q0FBSTs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLElBQUksdUNBQUksMEJBQTBCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0Qix1Q0FBSTtBQUNoQyxrQ0FBa0MsdUNBQUk7QUFDdEMsOEJBQThCLHVDQUFJOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLElBQUksMENBQU8sdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsMENBQU87QUFDakMsc0JBQXNCLDZDQUFLO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLDBDQUFPLHFCQUFxQiwwQ0FBTztBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxxQkFBcUI7QUFDaEU7QUFDQSxRQUFRLDBDQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLElBQUksMENBQU8scUNBQXFDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QiwwQ0FBTztBQUNuQyxrQ0FBa0MsMENBQU87QUFDekMsOEJBQThCLDBDQUFPO0FBQ3JDLHdCQUF3QixvREFBSTtBQUM1QixzQkFBc0IseURBQU07O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQLElBQUksMENBQU87QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQSxRQUFRLDBDQUFPO0FBQ2Y7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRU07QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSx1Q0FBSTs7QUFFaEI7QUFDQTtBQUNBO0FBQ0EsU0FBUyxHQUFHLFdBQVc7QUFDdkIsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBDQUFPO0FBQzNCLFFBQVEsdUNBQUk7QUFDWixRQUFRLHVDQUFJO0FBQ1osUUFBUSx1Q0FBSTtBQUNaLFFBQVEsdUNBQUk7QUFDWjtBQUNBLEtBQUs7QUFDTDs7Ozs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN6WEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7OztBQ2xCcUQ7QUFDckQsa0VBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oYW5kbGVzIGlmIGEgRE9NIGNoYW5naW5nICh1aS5qcykgYW5kIGFwcGx5aW5nIHRoZSBjb3JyZWN0IGxvZ2luIGZyb20gdG9kby5qc1xuLy9mb3IgZXhhbXBsZSwgaWYgdGhpcyBidXR0b24gaXMgY2xpY2tlZCAoYW4gZXZlbnRMaXN0ZW5lcikgaXQgd2lsbCBydW4gdGhpcyBsb2dpYyBmcm9tIHRvZG8uanMgdGhlbiBjaGFuZ2UgdGhlIERPTSBhY2NvcmRpbmdseSBpbiB1aS5qc1xuaW1wb3J0IHsgZGlzcGxheURlZmF1bHRQcm9qZWN0LCBhZGRQcm9qZWN0LCBhZGRUYXNrLCBhbGxUYXNrc0NsaWNrZWQsIHRvZGF5VGFza3NDbGlja2VkLCBmdXR1cmVUb2Rvc0NsaWNrZWQsIHRhc2tPcHRpb25DbGlja2VkIH0gZnJvbSBcIi4vdWlcIjtcbmltcG9ydCB7IHRvZG8gfSBmcm9tIFwiLi90b2RvXCI7XG5cblxuXG5leHBvcnQgY29uc3QgZXZlbnRIYW5kbGVycyA9ICgpID0+IHtcbiAgICBcbiAgICBkaXNwbGF5RGVmYXVsdFByb2plY3QoKTtcbiAgICBhZGRUYXNrKCk7XG4gICAgYWRkUHJvamVjdCgpO1xuICAgIGFsbFRhc2tzQ2xpY2tlZCgpO1xuICAgIHRvZGF5VGFza3NDbGlja2VkKCk7XG4gICAgZnV0dXJlVG9kb3NDbGlja2VkKCk7XG4gICAgXG59O1xuIiwiaW1wb3J0IHsgdG9kbywgcHJvamVjdCB9IGZyb20gXCIuL3RvZG9cIjtcblxuLypcbiAqIERvIHRoZSBsb2NhbCBzdG9yYWdlIHRoaW5nXG4gKiBmb3IgZXZlcnkgdG9kbyBhbmQgcHJvamVjdCBjcmVhdGVkLCBhZGQgaXQgdG8gdGhlIGxvY2FsIHN0b3JhZ2UgKG1heWJlIHRoZXJlIHdpbGwgYmUgYSBrZXkgZm9yIHRvZG8vcHJvamVjdCwgcmVzcGVjdGl2ZWx5KSBcbiAqIGFuZCB0aGUgdmFsdWUgaXMgYW4gYXJyYXkgdGhhdCBoYXMgYWxsIG9mIHRoZSB0b2Rvcy9wcm9qZWN0cywgcmVzcGVjdGl2ZWx5XG4gKiBUaGVuIHdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZCAodGhpcyBpcyBhbiBldmVudExpc3RlbmVyKSBnZXQgYWxsIG9mIHRoZSB0b2Rvcy9wcm9qZWN0XG4gKiBcbiAqIFxuICogdGhpcyBtaWdodCBub3Qgd29yayBeXl5cbiAqIEV2ZXJ5IHByb2plY3QgaGFzIGEgdGFzayBhcnJheSB0aGF0IGhhcyBhbGwgb2YgdGhlIHRhc2tzIGluIHRoYXQgcHJvamVjdCwgc28gbWF5YmUgd2UgbmVlZFxuICogbG9jYWwgc3RvcmFnZSBmb3IgdGhlIGZ1dHVyZVRvZG9zIGFuZCB0b2RheVRvZG9zIGFuZCBhbGxUb2RvcyBhbHNvIHNvIHRoYXQgdGhvc2UgYnV0dG9ucyB3b3JrIGFuZCBzbyB0aGF0IHRoZSB0b2Rvc1xuICogd2lsbCBiZSBzYXZlZCBldmVuIGlmIHlvdSByZWxvYWRlZFxuICovXG5cbi8vIG1pZ2h0IGFsc28gbmVlZCB0byBjaGVjayBpZiB0aGUgYnJvd3NlciBoYXMgbG9jYWxTdG9yYWdlIFxuLy90aGVyZSB3YXMgYSBkb2N1bWVudCB0aGF0IHNhaWQgdGhhdCBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgbG9jYWwgc3RvcmFnZSBzbyBpIG5lZWQgYW4gZXJyb3IgaGFuZGxlciBmb3IgdGhhdCBwb3RlbnRpYWxseVxuXG5cbi8qXG4gKiBcbiAqIFdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZCwgZ2V0IHRoZSBkYXRhIGZyb20gdGhlIGxvY2FsIHN0b3JhZ2VcbiAqIEdldCB0aGUgcHJvamVjdHMgd2l0aCB0aGVpciB0YXNrc1xuICogR2V0IGFsbC90b2RheS9mdXR1cmUgdG9kb3NcbiAqIEV2ZXJ5dGltZSBJIGNyZWF0ZSBhIHByb2plY3QsIEkgaGF2ZSB0byBhZGQgdGhhdCBwcm9qZWN0IHRvIHRoZSBsb2NhbCBzdG9yYWdlXG4gKiBldmVyeSB0aW1lIGkgY3JlYXRlIGEgdG8gZG8gaW4gYSBwcm9qZWN0LCBpIGhhdmUgdG8gdXBkYXRlIHRoYXQgY29ycmVzcG9uZGluZyBpdGVtL3Byb2plY3QgaW4gbG9jYWwgc3RvcmFnZVxuICogZXZlcnl0aW1lIEkgZWRpdCBvciBhZGQgdG8gYWxsL3RvZGF5L2Z1dHVyZSB0byBkbyBhcnJheXMsIEkgaGF2ZSB0byB1cGRhdGUgdGhlIGxvY2FsIHN0b3JhZ2VcbiAqIFxuICovXG5leHBvcnQgY29uc3Qgb25Eb21Mb2FkID0gKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIFtdKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxUb2RvcycsIFtdKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RheVRvZG9zJywgW10pXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Z1dHVyZVRvZG9zJywgW10pXG5cbn1cblxuXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdFRvTG9jYWxTdG9yYWdlID0gKHByb2plY3QpID0+IHtcbiAgICAvLyBpZiBpdCBleGlzdHMgYWxyZWFkeVxuICAgIGlmICghKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShbXSkpO1xuICAgIH1cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHtcbiAgICAgICAgbGV0IHBsYWNlSG9sZGVyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJyk7XG4gICAgICAgIGxldCBwcm9qZWN0c0FycmF5ID0gSlNPTi5wYXJzZShwbGFjZUhvbGRlcik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNBcnJheVtpXS5wcm9qZWN0TmFtZSA9PSBwcm9qZWN0LnByb2plY3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdHNBcnJheS5zcGxpY2UoaSwgMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0c0FycmF5LnB1c2gocHJvamVjdCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzQXJyYXkpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRUYXNrVG9Qcm9qZWN0ID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgbGV0IHBsYWNlSG9sZGVyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJyk7XG4gICAgbGV0IHByb2plY3RzQXJyYXkgPSBKU09OLnBhcnNlKHBsYWNlSG9sZGVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb2plY3RzQXJyYXlbaV0ucHJvamVjdE5hbWUgPT0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnByb2plY3ROYW1lKSB7XG4gICAgICAgICAgICBwcm9qZWN0c0FycmF5W2ldLnRhc2tBcnIucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnJheSkpO1xufSIsImltcG9ydCB7IGFkZFByb2plY3RUb0xvY2FsU3RvcmFnZSwgYWRkVGFza1RvUHJvamVjdCB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5leHBvcnQgY29uc3QgdG9kbyA9ICgoKSA9PiB7XG4gICAgbGV0IGFsbFRvZG9zID0gW107XG4gICAgbGV0IHRvZGF5VG9kb3MgPSBbXTtcbiAgICBsZXQgZnV0dXJlVG9kb3MgPSBbXTtcbiAgICBcbiAgICBjb25zdCBnZXRBbGxUb2RvcyA9ICgpID0+IGFsbFRvZG9zO1xuICAgIGNvbnN0IGdldFRvZGF5VG9kb3MgPSAoKSA9PiB0b2RheVRvZG9zO1xuICAgIGNvbnN0IGdldEZ1dHVyZVRvZG9zID0gKCkgPT4gZnV0dXJlVG9kb3M7XG5cbiAgICBjb25zdCBjcmVhdGVUb2RvID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHtcbiAgICAgICAgICAgIHRpdGxlLCBcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLCBcbiAgICAgICAgICAgIGR1ZURhdGUsIFxuICAgICAgICB9O1xuXG4gICAgICAgIGFkZFRvZGF5VG9kbyh0b2RvSXRlbSk7XG4gICAgICAgIGFkZEZ1dHVyZVRvZG9zKHRvZG9JdGVtKTtcbiAgICAgICAgYWxsVG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICBhZGRUYXNrVG9Qcm9qZWN0KHRvZG9JdGVtKTtcbiAgICB9XG5cbiAgICAvL2RlbGV0ZXMgdG9kbyBpbiB0aGUgY3VycmVudCBwcm9qZWN0XG4gICAgY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0udGl0bGUgPT0gdG9kb0l0ZW0pICB7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlVG9kb0luQWxsVG9kb3NBcnJheSA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEFsbFRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChnZXRBbGxUb2RvcygpW2ldLnRpdGxlID09IHRvZG9JdGVtKSB7XG4gICAgICAgICAgICAgICAgZ2V0QWxsVG9kb3MoKS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBlZGl0VG9kbyA9IChvbGRUaXRsZSwgbmV3VGl0bGUsIG5ld0Rlc2NyaXB0aW9uLCBuZXdEdWVEYXRlKSA9PiB7XG4gICAgICAgIGxldCB0b2RvSXRlbTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlID09IG9sZFRpdGxlKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0udGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmR1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgICAgICAgICAgICAgIHRvZG9JdGVtID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy91cGRhdGVzIHRvZGF5L2Z1dHVyZSB0b2RvIGFycmF5XG4gICAgICAgIGRlbGV0ZVRvZGF5VG9kbyh0b2RvSXRlbS50aXRsZSk7XG4gICAgICAgIGRlbGV0ZUZ1dHVyZVRvZG8odG9kb0l0ZW0udGl0bGUpO1xuICAgICAgICBhZGRUb2RheVRvZG8odG9kb0l0ZW0pO1xuICAgICAgICBhZGRGdXR1cmVUb2Rvcyh0b2RvSXRlbSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkVG9kYXlUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgICAgbGV0IHRvZG9JdGVtRGF0ZSA9IG5ldyBEYXRlKHRvZG9JdGVtLmR1ZURhdGUpXG4gICAgICAgIFxuICAgICAgICBpZiAodG9kb0l0ZW1EYXRlLmdldERhdGUoKSsxID09IGN1cnJlbnREYXRlLmdldERhdGUoKSBcbiAgICAgICAgJiYgdG9kb0l0ZW1EYXRlLmdldE1vbnRoKCkgPT0gY3VycmVudERhdGUuZ2V0TW9udGgoKSBcbiAgICAgICAgJiYgdG9kb0l0ZW1EYXRlLmdldEZ1bGxZZWFyKCkgPT0gY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICAgICAgdG9kYXlUb2Rvcy5wdXNoKHRvZG9JdGVtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlVG9kYXlUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0VG9kYXlUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0VG9kYXlUb2RvcygpW2ldLnRpdGxlID09IHRvZG9JdGVtKSB7XG4gICAgICAgICAgICAgICAgZ2V0VG9kYXlUb2RvcygpLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWRkRnV0dXJlVG9kb3MgPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxuICAgICAgICBsZXQgdG9kb0l0ZW1EYXRlID0gbmV3IERhdGUodG9kb0l0ZW0uZHVlRGF0ZSlcbiAgICAgICBcbiAgICAgICAgaWYgKHRvZG9JdGVtRGF0ZS5nZXRGdWxsWWVhcigpID4gY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICAgICAgZnV0dXJlVG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9kb0l0ZW1EYXRlLmdldE1vbnRoKCkgPiBjdXJyZW50RGF0ZS5nZXRNb250aCgpKSB7XG4gICAgICAgICAgICBmdXR1cmVUb2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgfSBlbHNlIGlmICh0b2RvSXRlbURhdGUuZ2V0RGF0ZSgpKzEgPiBjdXJyZW50RGF0ZS5nZXREYXRlKCkpIHtcbiAgICAgICAgICAgIGZ1dHVyZVRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZUZ1dHVyZVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRGdXR1cmVUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0RnV0dXJlVG9kb3MoKVtpXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgIGdldEZ1dHVyZVRvZG9zKCkuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBnZXRBbGxUb2RvcywgY3JlYXRlVG9kbywgZGVsZXRlVG9kbywgZWRpdFRvZG8sIGRlbGV0ZVRvZG9JbkFsbFRvZG9zQXJyYXksIGdldFRvZGF5VG9kb3MsIGRlbGV0ZVRvZGF5VG9kbywgZ2V0RnV0dXJlVG9kb3MsIGRlbGV0ZUZ1dHVyZVRvZG8gfTtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0ID0gKCgpID0+IHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXVxuICAgIGxldCBjdXJyZW50UHJvamVjdDtcbiAgICBsZXQgcHJldmlvdXNQcm9qZWN0O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEl0ZW0gPSB7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZSwgXG4gICAgICAgICAgICB0YXNrQXJyOiBbXSxcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3RJdGVtKTtcbiAgICAgICAgYWRkUHJvamVjdFRvTG9jYWxTdG9yYWdlKHByb2plY3RJdGVtKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDdXJyZW50UHJvamVjdCA9ICgpID0+IGN1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgY3JlYXRlUHJvamVjdCgnSG9tZScpO1xuICAgICAgICBzZXRDdXJyZW50UHJvamVjdCgnSG9tZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHByb2plY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzLCBnZXRDdXJyZW50UHJvamVjdCwgc2V0Q3VycmVudFByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0LCBkZWxldGVQcm9qZWN0IH1cbn0pKClcbiIsImltcG9ydCB7IHRvZG8sIHByb2plY3QgfSBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgc3RhciBmcm9tICcuLi9pY29ucy9zdGFyLW91dGxpbmUuc3ZnJ1xuaW1wb3J0IGNsb3NlIGZyb20gJy4uL2ljb25zL2Nsb3NlLnBuZydcbmltcG9ydCBvcHRpb24gZnJvbSAnLi4vaWNvbnMvbW9yZS12ZXJ0aWNhbC1hbHQuc3ZnJ1xuaW1wb3J0IHsgYWRkUHJvamVjdFRvTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlXCI7XG5cbi8vYXR0YWNoZXMgZXZlbnRMaXN0ZW5lciBmb3Igd2hlbiB0YXNrRm9ybSBpcyBzdWJtaXR0ZWRcbmV4cG9ydCBjb25zdCBtYWtlVG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XG5cbiAgICAgICAgdG9kby5jcmVhdGVUb2RvKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZS52YWx1ZSk7XG4gICAgICAgXG4gICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuXG4gICAgICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICAgIHRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0sIHtvbmNlOiB0cnVlfSlcbn0gICBcblxuLy9hdHRhY2hlcyBldmVudExpc3RlbmVyIGZvciB3aGVuIHByb2plY3RGb3JtIGlzIHN1Ym1pdHRlZFxuZXhwb3J0IGNvbnN0IG1ha2VQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKTtcblxuICAgICAgICBwcm9qZWN0LmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUudmFsdWUpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcblxuICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9LCB7b25jZTp0cnVlfSlcbn1cblxuLy9tYWtlIHRoaXMgdGhlIGRpc3BsYXkgJ0FMTCBUT0RPUycgZnVuY3Rpb24gd2hlbiAnQUxMIFRBU0tTJyBpcyBjbGlja2VkXG5leHBvcnQgY29uc3QgZGlzcGxheUFsbFRvZG9zID0gKCkgPT4ge1xuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG8uZ2V0QWxsVG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLmdldEFsbFRvZG9zKClbaV0udGl0bGU7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5nZXRBbGxUb2RvcygpW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5nZXRBbGxUb2RvcygpW2ldLmR1ZURhdGU7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKVxuXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlUb2RheVRvZG9zID0gKCkgPT4ge1xuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJylcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kby5nZXRUb2RheVRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRUb2RheVRvZG9zKClbaV0udGl0bGU7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5nZXRUb2RheVRvZG9zKClbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZGF5VG9kb3MoKVtpXS5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcblxuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b2RheVRhc2tzQ2xpY2tlZCA9ICgpID0+IHtcbiAgICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RheScpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaGVhZGVyJyk7XG5cbiAgICB0b2RheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGRpc3BsYXlUb2RheVRvZG9zKCk7XG4gICAgICAgIHByb2plY3ROYW1lSGVhZGVyLnRleHRDb250ZW50ID0gXCJUb2RheSdzIFRhc2tzXCI7XG4gICAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSlcbn1cblxuLypcbmlmIGFsbCB0YXNrcyBidXR0b24gaXMgY2xpY2tlZCwgZGlzcGxheSBhbGwgb2YgdGhlIHRhc2tzXG5cbnRhc2sgYnV0dG9uIGlzIGNsaWNrZWQsIG1ha2UgdGhlIHRhc2tzIGNvbnRhaW5lciBibGFuayB0aGVuIGRpc3BsYXkgYWxsIHRoZSB0YXNrc1xuKi9cbmV4cG9ydCBjb25zdCBhbGxUYXNrc0NsaWNrZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWxsLXRhc2tzJyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1oZWFkZXInKTtcblxuICAgIGFsbFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZGlzcGxheUFsbFRvZG9zKClcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSAnQWxsIFRhc2tzJztcbiAgICAgICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGZ1dHVyZVRvZG9zQ2xpY2tlZCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXh0U2V2ZW5EYXlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RoaXMtd2VlaycpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaGVhZGVyJyk7XG5cbiAgICBuZXh0U2V2ZW5EYXlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkaXNwbGF5RnV0dXJlVG9kb3MoKTtcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSAnRnV0dXJlIFRhc2tzJztcbiAgICAgICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KVxufVxuXG5jb25zdCBkaXNwbGF5RnV0dXJlVG9kb3MgPSAoKSA9PiB7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldEZ1dHVyZVRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRGdXR1cmVUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0RnV0dXJlVG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0RnV0dXJlVG9kb3MoKVtpXS5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcblxuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5UHJvamVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBhZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIHByb2plY3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnICc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0UHJvamVjdHMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgIFxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRQcm9qZWN0cygpW2ldLnByb2plY3ROYW1lO1xuICAgICAgICBvcHRpb25zLnNyYyA9IGNsb3NlO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBvcHRpb25zLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3Qtb3B0aW9ucycpO1xuICAgICAgICAvL29wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG5cbiAgICAgICAgaWYgKHByb2plY3QuZ2V0UHJvamVjdHMoKVtpXSA9PSBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkpIHtcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWNsaWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25zKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgICBkZWxldGVQcm9qZWN0KCk7XG4gICAgc2hvd1Rhc2tzSW5Qcm9qZWN0KCk7XG59XG4vL3JlbmFtZSB0aGlzIGZ1bmN0aW9uIGxhdGVyXG4vL3doZW4gYW55IG9mIHRoZSBwcm9qZWN0cyBhcmUgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IHNob3dUYXNrc0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcblxuICAgIHByb2plY3RzLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSBgJHtlLnRhcmdldC50ZXh0Q29udGVudH1gO1xuICAgICAgICBjb25zb2xlLmxvZygnaGknKVxuICAgICAgICBwcm9qZWN0LnNldEN1cnJlbnRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0pKVxufVxuXG4vL2hhdmUgdG8gYWRkIGEgZGVsZXRlIHRhc2tzIGZ1bmN0aW9uIHRoYXQgZGVsZXRlcyB0aGUgdGFza3Mgb24gdGhlIHBhZ2UgaWYgdGhlIGN1cnJlbnQgcHJvamVjdCBpcyB0aGUgb25lIHRoYXQgZ290IGRlbGV0ZWRcbi8vYmVjYXVzZSBpdCBzdGlsbCBzaG93cyB0aGUgcHJldmlvdXMgdGFza3MgZXZlbiBpZiB0aGF0IHByb2plY3QgZ290IGRlbGV0ZWRcblxuY29uc3QgZGlzcGxheVRhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBidG5Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbGV0IGltcG9ydGFudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZHVlRGF0ZTtcbiAgICAgICAgaW1wb3J0YW50LnNyYyA9IHN0YXI7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gb3B0aW9uO1xuXG4gICAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3B0aW9uYWwtYnV0dG9ucycpXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpXG4gICAgICAgIGltcG9ydGFudC5jbGFzc0xpc3QuYWRkKCdpbXBvcnRhbnQnKTtcbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCd0YXNrLW9wdGlvbnMnKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWVkaXQtYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlbGV0ZS1idXR0b24nKTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICBidG5Db250LmFwcGVuZENoaWxkKGltcG9ydGFudCk7XG4gICAgICAgIGJ0bkNvbnQuYXBwZW5kQ2hpbGQob3B0aW9ucyk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChidG5Db250KTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG4gICAgdGFza09wdGlvbkNsaWNrZWQoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyVGFza0NvbnRhaW5lciA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpO1xuICAgIHRhc2tzLnRleHRDb250ZW50ID0gJyAnO1xufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheURlZmF1bHRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIHByb2plY3QuY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcbiAgICBkaXNwbGF5UHJvamVjdHMoKTtcbn1cblxuLy8xLiB3aGVuIHlvdSBkZWxldGUgYSBwcm9qZWN0LCBpdCBzdGlsbCBzaG93cyB0aGUgY3VycmVudCB0YXNrcyBpbiB0aGF0IHByb2plY3QgKGlmIHlvdSBjbGlja2VkIGl0IGJlZm9yZSBkZWxldGluZylcbi8vMi4gb3RoZXIgZnVuY3Rpb25hbGl0eTogd2hlbiB5b3UgaG92ZXIgb3ZlciBwcm9qZWN0IHRoYXQncyB3aGVuIHRoZSBvcHRpb24gdG8gZGVsZXRlIGl0IHNob3VsZCBzaG93XG4vLyAgIGRvIHRoaXMgYnkgYWRkaW5nIGEgbW91c2VvdmVyIGV2ZW50TGlzdGVuZXIgYW5kIHdoZW4geW91IGhvdmVyIG92ZXIgdGhlIHByb2plY3QsIGl0IHNob3VsZCBzaG93IHRoZSAnWCcgdG8gZGVsZXRlIGl0LCBhbmQgdGhlbiBydW4gYSBcbi8vICAgZnVuY3Rpb24gdGhhdCBhdHRhY2hlcyBhbiBldmVudExpc3RlbmVyIHRvIHRoYXQgJ1gnIHdoZW4geW91IGhvdmVyIG92ZXIgaXRcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdE9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1vcHRpb25zJyk7XG5cbiAgICBwcm9qZWN0T3B0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHByb2plY3QuZGVsZXRlUHJvamVjdChlLnRhcmdldC5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICB9KSlcbn1cblxuLy9zaG93cyBoaWRkZW4gdGFzayBmb3JtXG5leHBvcnQgY29uc3QgYWRkVGFzayA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIG1ha2VUb2RvKCk7XG4gICAgfSk7XG59XG5cbi8vc2hvd3MgaGlkZGVuIHByb2plY3QgZm9ybVxuZXhwb3J0IGNvbnN0IGFkZFByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgbWFrZVByb2plY3QoKTtcbiAgICB9KTtcbn1cblxuLy9zaG93IGNsb3NlIGJ1dHRvbiB3aGVuIGhvdmVyIG92ZXIgcHJvamVjdCBsYXRlclxuLypcbmNvbnN0IHNob3dDbG9zZUJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcbiAgICAgICAgZS50YXJnZXQubGFzdENoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pKVxufSovXG5cbmV4cG9ydCBjb25zdCB0YXNrT3B0aW9uQ2xpY2tlZCA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrT3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLW9wdGlvbnMnKVxuXG4gICAgdGFza09wdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmxhc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgZGVsZXRlVGFza0luUHJvamVjdCgpO1xuICAgICAgICBlZGl0VGFza0luUHJvamVjdCgpO1xuICAgICAgICAvKiBcbiAgICAgICAgICogXG4gICAgICAgICAqIGlmIGNsaWNrZWQgb3V0c2lkZSBvZiB0aGUgZWxlbWVudCwgdGhlbiBtYWtlIGl0IGhpZGRlbi9vciBkZWxldGUgaXRcbiAgICAgICAgICogZG8gdGhpcyBzbyB0aGF0IHRoZSB1c2VyIGNhbiBleGl0IHRoZSBvcHRpb25zQnV0dG9ucyBpZiB0aGV5IGNsaWNrIHNvbWV3aGVyZSBlbHNlXG4gICAgICAgICAqIFxuICAgICAgICAgKi9cbiAgICB9KSlcbn1cblxuY29uc3QgZWRpdFRhc2tJblByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgZWRpdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1lZGl0LWJ1dHRvbicpO1xuICAgIGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZm9ybScpO1xuXG4gICAgZWRpdEJ1dHRvbnMuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hpJylcbiAgICAgICAgZWRpdFRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJyk7XG4gICAgICAgIHRpdGxlLnZhbHVlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMSkudGV4dENvbnRlbnQ7XG4gICAgICAgIGR1ZURhdGUudmFsdWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgyKS50ZXh0Q29udGVudDtcbiAgICAgICAgbGV0IG9sZFRpdGxlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMCkudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgZWRpdFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3VibWl0dGVkJyk7XG5cbiAgICAgICAgICAgIGxldCBuZXdUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRpdGxlJykudmFsdWU7XG4gICAgICAgICAgICBsZXQgbmV3RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICAgICAgbGV0IG5ld0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJykudmFsdWU7XG5cbiAgICAgICAgICAgIHRvZG8uZWRpdFRvZG8ob2xkVGl0bGUsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbiwgbmV3RHVlRGF0ZSk7XG5cbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZWRpdFRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG4gICAgICAgIH0sIHtvbmNlOiB0cnVlfSlcbiAgICB9KSlcbn1cblxuY29uc3QgZGVsZXRlVGFza0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1kZWxldGUtYnV0dG9uJyk7XG5cbiAgICBkZWxldGVCdXR0b24uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Rhc2sgZGVsZXRlZCcpXG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpKVxuICAgICAgICB0b2RvLmRlbGV0ZVRvZG8oZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICB0b2RvLmRlbGV0ZVRvZG9JbkFsbFRvZG9zQXJyYXkoZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICB0b2RvLmRlbGV0ZVRvZGF5VG9kbyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIHRvZG8uZGVsZXRlRnV0dXJlVG9kbyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgIH0pKVxufVxuXG5cblxuXG4vKlxuZWRpdGluZyBhIHRhc2sgb25jZSB3b3JrcywgYnV0IGFmdGVyIGNvcnJlY3RseSBlZGl0aW5nLCB3aGVuIGkgdHJ5IHRvIGVkaXQgYSBzZWNvbmQgdGltZSBcbi0gZXZlbiBpZiB0aGUgdGFzayBpcyBpbiBhIGRpZmZlcmVudCBwcm9qZWN0LWl0IGJyZWFrcyBcblxuSXQncyBiZWNhdXNlIHRoZSBldmVudExpc3RlbmVyIGZvciBzdWJtaXR0aW5nIHRoZSBmb3JtIHJ1biB0d2ljZSBvbiB0aGUgc2Vjb25kIHRpbWUgaSB0cnkgdG8gc3VibWl0IGEgZm9ybSAoc2Vjb25kIHRpbWUgZWRpdGluZylcbnNvIGl0IG1ha2VzIHRoZSB0YXNrIGJsYW5rIGJlY2F1c2UgaXQgcnVucyB0d2ljZVxuXG5NYXliZSBsZWFybiBhYm91dCBidWJibGluZyBhbmQgcHJvcGFnYXRpb24gdG8gaG9wZWZ1bGx5IGZpeCB0aGlzXG4qLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBldmVudEhhbmRsZXJzIH0gZnJvbSBcIi4vbW9kdWxlcy9jb250cm9sbGVyXCI7XG5ldmVudEhhbmRsZXJzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=