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
/* harmony import */ var _localStorageUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorageUI */ "./src/modules/localStorageUI.js");
//handles if a DOM changing (ui.js) and applying the correct login from todo.js
//for example, if this button is clicked (an eventListener) it will run this logic from todo.js then change the DOM accordingly in ui.js





const eventHandlers = () => {
    //clearProjectHeader();
    //displayDefaultProject();
    (0,_localStorageUI__WEBPACK_IMPORTED_MODULE_1__.onload)();
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();
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
/* harmony export */   addFutureTodoInLocalStorage: () => (/* binding */ addFutureTodoInLocalStorage),
/* harmony export */   addProjectToLocalStorage: () => (/* binding */ addProjectToLocalStorage),
/* harmony export */   addTaskToProjectInLocalStorage: () => (/* binding */ addTaskToProjectInLocalStorage),
/* harmony export */   addTodoToAllTodosInLocalStorage: () => (/* binding */ addTodoToAllTodosInLocalStorage),
/* harmony export */   addTodoToTodayTodosInLocalStorage: () => (/* binding */ addTodoToTodayTodosInLocalStorage),
/* harmony export */   deleteFutureTodoInLocalStorage: () => (/* binding */ deleteFutureTodoInLocalStorage),
/* harmony export */   deleteProjectFromLocalStorage: () => (/* binding */ deleteProjectFromLocalStorage),
/* harmony export */   deleteTaskInProjectInLocalStorage: () => (/* binding */ deleteTaskInProjectInLocalStorage),
/* harmony export */   deleteTasksWhenProjectDeletedInLocalStorage: () => (/* binding */ deleteTasksWhenProjectDeletedInLocalStorage),
/* harmony export */   deleteTodayTodoInLocalStorage: () => (/* binding */ deleteTodayTodoInLocalStorage),
/* harmony export */   deleteTodoInAllTodosInLocalStorage: () => (/* binding */ deleteTodoInAllTodosInLocalStorage)
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

const addProjectToLocalStorage = (project) => {
    //if it doesn't exist yet
    if (!(localStorage.getItem('projects'))) {
        localStorage.setItem('projects', JSON.stringify([]));
    }
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == project.projectName) {
            projectsArray.splice(i, 1)
        }
    }
    projectsArray.push(project);
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

const deleteProjectFromLocalStorage = (name) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == name) {
            projectsArray.splice(i, 1);
        }
    }
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

const addTaskToProjectInLocalStorage = (todoItem) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().projectName) {
            projectsArray[i].taskArr.push(todoItem);
        }
    }
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

const deleteTaskInProjectInLocalStorage = (todoItem) => {
    let projectsArray = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectName == _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().projectName) {
            for (let j = 0; j < projectsArray[i].taskArr.length; j++) {
                if (projectsArray[i].taskArr[j].title == todoItem) {
                    projectsArray[i].taskArr.splice(j, 1);
                }
            }
        }
    }
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

/*
 * Everytiime something is added in all/today/future todos, add it to the corresponding item in local storage also
 * and everyrtime something is deleted/edited in all/today/future todos, delete/edit it in the local storage also
 */

// make the add/delete todos more efficient
//combine the addtodo functions and create one whole function that takes the todoItem 
//and the name of the array it uses and have conditional statements correspondingly
//same thing with the deleteTodo functions

const addTodoToAllTodosInLocalStorage = (todoItem) => {
    //if it doesn't exist yet
    if (!(localStorage.getItem('allTodos'))) {
        localStorage.setItem('allTodos', JSON.stringify([]));
    }
    
    let allTodos = JSON.parse(localStorage.getItem('allTodos'));
    allTodos.push(todoItem);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
    
}

const deleteTodoInAllTodosInLocalStorage = (name) => {
    if (localStorage.getItem('allTodos')) {
       let allTodos = JSON.parse(localStorage.getItem('allTodos'));

        for (let i = 0; i < allTodos.length; i++) {
            if (allTodos[i].title == name) {
                allTodos.splice(i, 1);
            }
        }
        localStorage.setItem('allTodos', JSON.stringify(allTodos));
    }
}

const addTodoToTodayTodosInLocalStorage = (todoItem) => {
    //if it doesn't exist yet
    if (!(localStorage.getItem('todayTodos'))) {
        localStorage.setItem('todayTodos', JSON.stringify([]));
    }
    let placeholder = localStorage.getItem('todayTodos');
    let todayTodos = JSON.parse(placeholder);
    todayTodos.push(todoItem);
    localStorage.setItem('todayTodos', JSON.stringify(todayTodos));
}   

const deleteTodayTodoInLocalStorage = (name) => {
    if (localStorage.getItem('todayTodos')) {
        let todayTodos = JSON.parse(localStorage.getItem('todayTodos'));
        for (let i = 0; i < todayTodos.length; i++) {
            if (todayTodos[i].title == name) {
                todayTodos.splice(i, 1);
            }
        }
        localStorage.setItem('todayTodos', JSON.stringify(todayTodos));
    }
}

const addFutureTodoInLocalStorage = (todoItem) => {
    if (!(localStorage.getItem('futureTodos'))) {
        localStorage.setItem('futureTodos', JSON.stringify([]))
    }
    const futureTodos = JSON.parse(localStorage.getItem('futureTodos'));
    futureTodos.push(todoItem);
    localStorage.setItem('futureTodos', JSON.stringify(futureTodos));
}

const deleteFutureTodoInLocalStorage = (name) => {
    const futureTodos = JSON.parse(localStorage.getItem('futureTodos'));
    for (let i = 0; i < futureTodos.length; i++) {
        if (futureTodos[i].title == name) {
            futureTodos.splice(i, 1);
        }
    }
    localStorage.setItem('futureTodos', JSON.stringify(futureTodos));
}

//if you delete a project, it doesn't delete the todos in that project that are in the local storage -- got to fix this
//first get the project that is about to be deleted
//loop through the taskArr of that project and compare it to allTodos/todayTodos/futureTodos
//if any of them match, then delete them

const deleteTasksWhenProjectDeletedInLocalStorage = (name) => {
    const projects = JSON.parse(localStorage.getItem('projects'));
    let currentProject;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName == name) { 
            currentProject = projects[i];
            break;
        }
    }

    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    const todayTodos = JSON.parse(localStorage.getItem('todayTodos'));
    const futureTodos = JSON.parse(localStorage.getItem('futureTodos'));
    for (let i = 0; i < currentProject.taskArr.length; i++) {
        if (allTodos) {
            for (let j = 0; j < allTodos.length; j++) {
                if (currentProject.taskArr[i].title == allTodos[j].title) {
                    allTodos.splice(j, 1);
                    _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getAllTodos().splice(j, 1);
                }
            }
        }
        if (todayTodos) {
            for (let k = 0; k < todayTodos.length; k++) {
                if (currentProject.taskArr[i].title == todayTodos[k].title) {
                    todayTodos.splice(k, 1);
                    _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodayTodos().splice(k, 1);
                }
            }
        }
        if (futureTodos) {
            for (let l = 0; l < futureTodos.length; l++) {
                if (currentProject.taskArr[i].title == futureTodos[l].title) {
                    futureTodos.splice(l, 1);
                    _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getFutureTodos().splice(l, 1);
                }
            }
        }
    }
    if (allTodos) localStorage.setItem('allTodos', JSON.stringify(allTodos));
    if (todayTodos) localStorage.setItem('todayTodos', JSON.stringify(todayTodos));
    if (futureTodos) localStorage.setItem('futureTodos', JSON.stringify(futureTodos));
    
}

/***/ }),

/***/ "./src/modules/localStorageUI.js":
/*!***************************************!*\
  !*** ./src/modules/localStorageUI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onload: () => (/* binding */ onload)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/modules/ui.js");





/*
!!!!!! I need to create an initila default project so that there is no error
maybe with some tasks in that project
maybe add current project to local stroage also so that it keeps the 
data on screen even after a reload
*/

const onload = () => {
    window.addEventListener('load', (e) => {
        addTodosToAllTodos();
        addProjectsToProjectArray();
        document.querySelector('#add-task').classList.toggle('hidden');
        // localStorage.setItem('projects', JSON.stringify([]));
        
    })
}

// it now adds the data from ls to the corresponding arrays, all i need to do now is to display them 
const addTodosToAllTodos = () => {
    let allTodosLS = JSON.parse(localStorage.getItem('allTodos'));
    let todayTodosLS = JSON.parse(localStorage.getItem('todayTodos'));
    let futureTodosLS = JSON.parse(localStorage.getItem('futureTodos'));
    if (allTodosLS) {
        for (let i = 0; i < allTodosLS.length; i++) {
            _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getAllTodos()[i] = allTodosLS[i];
        }
    }
    if (todayTodosLS) {
        for (let i = 0; i < todayTodosLS.length; i++) {
            _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodayTodos()[i] = todayTodosLS[i];
        }
    }
    if (futureTodosLS) {
        for (let i = 0; i < futureTodosLS.length; i++) {
            _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getFutureTodos()[i] = futureTodosLS[i];
        }
    }
}

const addProjectsToProjectArray = () => {
    const projectArrayLS = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projectArrayLS.length; i++) {
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects().push(projectArrayLS[i]);
    }
    (0,_ui__WEBPACK_IMPORTED_MODULE_1__.displayProjects)();
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
        (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addTodoToAllTodosInLocalStorage)(todoItem);
        project.getCurrentProject().taskArr.push(todoItem);
        (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addTaskToProjectInLocalStorage)(todoItem);
    }

    //deletes todo in the current project
    const deleteTodo = (todoItem) => {
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == todoItem)  {
                project.getCurrentProject().taskArr.splice(i, 1);
                (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteTaskInProjectInLocalStorage)(todoItem);
            }
        }
    }

    const deleteTodoInAllTodosArray = (todoItem) => {
        for (let i = 0; i < getAllTodos().length; i++) {
            if (getAllTodos()[i].title == todoItem) {
                getAllTodos().splice(i,1);
                (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteTodoInAllTodosInLocalStorage)(todoItem);
            }
        }
    }
    
    const editTodo = (oldTitle, newTitle, newDescription, newDueDate) => {
        let todoItem;
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == oldTitle) {
                let curr = project.getCurrentProject().taskArr;
                project.getCurrentProject().taskArr[i].title = newTitle;
                project.getCurrentProject().taskArr[i].description = newDescription;
                project.getCurrentProject().taskArr[i].dueDate = newDueDate;
                todoItem = project.getCurrentProject().taskArr[i];
            }
        }
        //updates today/future todo array
        deleteTodayTodo(oldTitle);
        deleteFutureTodo(oldTitle);
        addTodayTodo(todoItem);
        addFutureTodos(todoItem);

        (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteTaskInProjectInLocalStorage)(oldTitle);
        (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addTaskToProjectInLocalStorage)(todoItem);
        deleteTodoInAllTodosArray(oldTitle);
        allTodos.push(todoItem);
        (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addTodoToAllTodosInLocalStorage)(todoItem);
    }

    const addTodayTodo = (todoItem) => {
        let currentDate = new Date();
        let todoItemDate = new Date(todoItem.dueDate);
        todoItemDate.setDate(todoItemDate.getDate()+1);

        if (todoItemDate.getDate() == currentDate.getDate() 
        && todoItemDate.getMonth() == currentDate.getMonth() 
        && todoItemDate.getFullYear() == currentDate.getFullYear()) {
            todayTodos.push(todoItem)
            ;(0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addTodoToTodayTodosInLocalStorage)(todoItem);
        }
    }

    const deleteTodayTodo = (todoItem) => {
        for (let i = 0; i < getTodayTodos().length; i++) {
            if (getTodayTodos()[i].title == todoItem) {
                getTodayTodos().splice(i,1);
                (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteTodayTodoInLocalStorage)(todoItem);
            }
        }
    }

    const addFutureTodos = (todoItem) => {
        let currentDate = new Date()
        let todoItemDate = new Date(todoItem.dueDate);
        let future = new Date(currentDate);

        todoItemDate.setDate(todoItemDate.getDate()+1)
        future.setDate(currentDate.getDate() + 1);
    
        if (todoItemDate >= future) {
            futureTodos.push(todoItem);
            (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.addFutureTodoInLocalStorage)(todoItem);
        }
    }

    const deleteFutureTodo = (todoItem) => {
        for (let i = 0; i < getFutureTodos().length; i++) {
            if (getFutureTodos()[i].title == todoItem) {
                getFutureTodos().splice(i,1);
                (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteFutureTodoInLocalStorage)(todoItem);
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
                (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteTasksWhenProjectDeletedInLocalStorage)(name);
                (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.deleteProjectFromLocalStorage)(name);
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
/* harmony export */   clearProjectHeader: () => (/* binding */ clearProjectHeader),
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
       // projectForm.classList.toggle('project-form-active');
      //  projectForm.removeAttribute('project-form-active')
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
    let l = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects();
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
      //  projectForm.classList.toggle('project-form-active');

      //  projectForm.setAttribute('id', 'project-form-active')
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
    const overlay = document.querySelector('#overlay')

    editButtons.forEach(btn => btn.addEventListener('click', (e) => {
        console.log('hi')
        editTaskForm.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        
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
            overlay.classList.toggle('hidden');
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

const clearProjectHeader = () => {
    const projectHeader = document.querySelector('#project-name-header');
    projectHeader.textContent = ' ';
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUMrSjtBQUNySDs7OztBQUluQztBQUNQO0FBQ0E7QUFDQSxJQUFJLHVEQUFNO0FBQ1YsSUFBSSxvREFBZTtBQUNuQixJQUFJLDRDQUFPO0FBQ1gsSUFBSSwrQ0FBVTtBQUNkLElBQUksb0RBQWU7QUFDbkIsSUFBSSxzREFBaUI7QUFDckIsSUFBSSx1REFBa0I7QUFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJ1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDLDRDQUE0QywwQ0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDLDRDQUE0QywwQ0FBTztBQUNuRCw0QkFBNEIscUNBQXFDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUEsd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLG9CQUFvQix3QkFBd0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0EsNEJBQTRCLHFCQUFxQjtBQUNqRDtBQUNBO0FBQ0Esb0JBQW9CLHVDQUFJO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0Esb0JBQW9CLHVDQUFJO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdCQUF3QjtBQUNwRDtBQUNBO0FBQ0Esb0JBQW9CLHVDQUFJO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVNdUM7QUFDQTs7OztBQUl2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQyxZQUFZLHVDQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQsWUFBWSx1Q0FBSTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xELFlBQVksdUNBQUk7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsMkJBQTJCO0FBQy9DLFFBQVEsMENBQU87QUFDZjtBQUNBLElBQUksb0RBQWU7QUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRDZZOztBQUV0WTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhFQUErQjtBQUN2QztBQUNBLFFBQVEsNkVBQThCO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQWdEO0FBQ3hFO0FBQ0E7QUFDQSxnQkFBZ0IsZ0ZBQWlDO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQTtBQUNBLGdCQUFnQixpRkFBa0M7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdEQUFnRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLGdGQUFpQztBQUN6QyxRQUFRLDZFQUE4QjtBQUN0QztBQUNBO0FBQ0EsUUFBUSw4RUFBK0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlGQUFpQztBQUM3QztBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0EsZ0JBQWdCLDRFQUE2QjtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMEVBQTJCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQSxnQkFBZ0IsNkVBQThCO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVFQUF3QjtBQUNoQzs7QUFFQTs7QUFFQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBLGdCQUFnQiwwRkFBMkM7QUFDM0QsZ0JBQWdCLDRFQUE2QjtBQUM3QztBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSnNDO0FBQ0s7QUFDTjtBQUNhOztBQUVuRDtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHVDQUFJO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxHQUFHLFdBQVc7QUFDbkI7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLDBDQUFPO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEdBQUcsVUFBVTtBQUNsQjs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQixJQUFJLHVDQUFJLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsdUNBQUk7QUFDaEMsa0NBQWtDLHVDQUFJO0FBQ3RDLDhCQUE4Qix1Q0FBSTs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUEsb0JBQW9CLElBQUksdUNBQUkseUJBQXlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0Qix1Q0FBSTtBQUNoQyxrQ0FBa0MsdUNBQUk7QUFDdEMsOEJBQThCLHVDQUFJOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsSUFBSSx1Q0FBSSwwQkFBMEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLHVDQUFJO0FBQ2hDLGtDQUFrQyx1Q0FBSTtBQUN0Qyw4QkFBOEIsdUNBQUk7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMENBQU87QUFDbkIsb0JBQW9CLElBQUksMENBQU8sdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsMENBQU87QUFDakMsc0JBQXNCLDZDQUFLO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLDBDQUFPLHFCQUFxQiwwQ0FBTztBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxxQkFBcUI7QUFDaEU7QUFDQSxRQUFRLDBDQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLElBQUksMENBQU8scUNBQXFDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QiwwQ0FBTztBQUNuQyxrQ0FBa0MsMENBQU87QUFDekMsOEJBQThCLDBDQUFPO0FBQ3JDLHdCQUF3QixvREFBSTtBQUM1QixzQkFBc0IseURBQU07O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQLElBQUksMENBQU87QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQSxRQUFRLDBDQUFPO0FBQ2Y7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFTTtBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSx1Q0FBSTs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEdBQUcsV0FBVztBQUN2QixLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMENBQU87QUFDM0IsUUFBUSx1Q0FBSTtBQUNaLFFBQVEsdUNBQUk7QUFDWixRQUFRLHVDQUFJO0FBQ1osUUFBUSx1Q0FBSTtBQUNaO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN4WEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7OztBQ2xCcUQ7QUFDckQsa0VBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9sb2NhbFN0b3JhZ2VVSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oYW5kbGVzIGlmIGEgRE9NIGNoYW5naW5nICh1aS5qcykgYW5kIGFwcGx5aW5nIHRoZSBjb3JyZWN0IGxvZ2luIGZyb20gdG9kby5qc1xuLy9mb3IgZXhhbXBsZSwgaWYgdGhpcyBidXR0b24gaXMgY2xpY2tlZCAoYW4gZXZlbnRMaXN0ZW5lcikgaXQgd2lsbCBydW4gdGhpcyBsb2dpYyBmcm9tIHRvZG8uanMgdGhlbiBjaGFuZ2UgdGhlIERPTSBhY2NvcmRpbmdseSBpbiB1aS5qc1xuaW1wb3J0IHsgZGlzcGxheURlZmF1bHRQcm9qZWN0LCBhZGRQcm9qZWN0LCBhZGRUYXNrLCBhbGxUYXNrc0NsaWNrZWQsIHRvZGF5VGFza3NDbGlja2VkLCBmdXR1cmVUb2Rvc0NsaWNrZWQsIGRpc3BsYXlQcm9qZWN0cywgY2xlYXJQcm9qZWN0SGVhZGVyIH0gZnJvbSBcIi4vdWlcIjtcbmltcG9ydCB7IG9ubG9hZCB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZVVJXCI7XG5cblxuXG5leHBvcnQgY29uc3QgZXZlbnRIYW5kbGVycyA9ICgpID0+IHtcbiAgICAvL2NsZWFyUHJvamVjdEhlYWRlcigpO1xuICAgIC8vZGlzcGxheURlZmF1bHRQcm9qZWN0KCk7XG4gICAgb25sb2FkKCk7XG4gICAgZGlzcGxheVByb2plY3RzKCk7XG4gICAgYWRkVGFzaygpO1xuICAgIGFkZFByb2plY3QoKTtcbiAgICBhbGxUYXNrc0NsaWNrZWQoKTtcbiAgICB0b2RheVRhc2tzQ2xpY2tlZCgpO1xuICAgIGZ1dHVyZVRvZG9zQ2xpY2tlZCgpO1xufTtcbiIsImltcG9ydCB7IHRvZG8sIHByb2plY3QgfSBmcm9tIFwiLi90b2RvXCI7XG5cbi8qXG4gKiBEbyB0aGUgbG9jYWwgc3RvcmFnZSB0aGluZ1xuICogZm9yIGV2ZXJ5IHRvZG8gYW5kIHByb2plY3QgY3JlYXRlZCwgYWRkIGl0IHRvIHRoZSBsb2NhbCBzdG9yYWdlIChtYXliZSB0aGVyZSB3aWxsIGJlIGEga2V5IGZvciB0b2RvL3Byb2plY3QsIHJlc3BlY3RpdmVseSkgXG4gKiBhbmQgdGhlIHZhbHVlIGlzIGFuIGFycmF5IHRoYXQgaGFzIGFsbCBvZiB0aGUgdG9kb3MvcHJvamVjdHMsIHJlc3BlY3RpdmVseVxuICogVGhlbiB3aGVuIHRoZSBkb2N1bWVudCBpcyBsb2FkZWQgKHRoaXMgaXMgYW4gZXZlbnRMaXN0ZW5lcikgZ2V0IGFsbCBvZiB0aGUgdG9kb3MvcHJvamVjdFxuICogXG4gKiBcbiAqIHRoaXMgbWlnaHQgbm90IHdvcmsgXl5eXG4gKiBFdmVyeSBwcm9qZWN0IGhhcyBhIHRhc2sgYXJyYXkgdGhhdCBoYXMgYWxsIG9mIHRoZSB0YXNrcyBpbiB0aGF0IHByb2plY3QsIHNvIG1heWJlIHdlIG5lZWRcbiAqIGxvY2FsIHN0b3JhZ2UgZm9yIHRoZSBmdXR1cmVUb2RvcyBhbmQgdG9kYXlUb2RvcyBhbmQgYWxsVG9kb3MgYWxzbyBzbyB0aGF0IHRob3NlIGJ1dHRvbnMgd29yayBhbmQgc28gdGhhdCB0aGUgdG9kb3NcbiAqIHdpbGwgYmUgc2F2ZWQgZXZlbiBpZiB5b3UgcmVsb2FkZWRcbiAqL1xuXG4vLyBtaWdodCBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgdGhlIGJyb3dzZXIgaGFzIGxvY2FsU3RvcmFnZSBcbi8vdGhlcmUgd2FzIGEgZG9jdW1lbnQgdGhhdCBzYWlkIHRoYXQgbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGxvY2FsIHN0b3JhZ2Ugc28gaSBuZWVkIGFuIGVycm9yIGhhbmRsZXIgZm9yIHRoYXQgcG90ZW50aWFsbHlcblxuXG4vKlxuICogXG4gKiBXaGVuIHRoZSBkb2N1bWVudCBpcyBsb2FkZWQsIGdldCB0aGUgZGF0YSBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlXG4gKiBHZXQgdGhlIHByb2plY3RzIHdpdGggdGhlaXIgdGFza3NcbiAqIEdldCBhbGwvdG9kYXkvZnV0dXJlIHRvZG9zXG4gKiBFdmVyeXRpbWUgSSBjcmVhdGUgYSBwcm9qZWN0LCBJIGhhdmUgdG8gYWRkIHRoYXQgcHJvamVjdCB0byB0aGUgbG9jYWwgc3RvcmFnZVxuICogZXZlcnkgdGltZSBpIGNyZWF0ZSBhIHRvIGRvIGluIGEgcHJvamVjdCwgaSBoYXZlIHRvIHVwZGF0ZSB0aGF0IGNvcnJlc3BvbmRpbmcgaXRlbS9wcm9qZWN0IGluIGxvY2FsIHN0b3JhZ2VcbiAqIGV2ZXJ5dGltZSBJIGVkaXQgb3IgYWRkIHRvIGFsbC90b2RheS9mdXR1cmUgdG8gZG8gYXJyYXlzLCBJIGhhdmUgdG8gdXBkYXRlIHRoZSBsb2NhbCBzdG9yYWdlXG4gKiBcbiAqL1xuXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdFRvTG9jYWxTdG9yYWdlID0gKHByb2plY3QpID0+IHtcbiAgICAvL2lmIGl0IGRvZXNuJ3QgZXhpc3QgeWV0XG4gICAgaWYgKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XG4gICAgfVxuICAgIGxldCBwcm9qZWN0c0FycmF5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9qZWN0c0FycmF5W2ldLnByb2plY3ROYW1lID09IHByb2plY3QucHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIHByb2plY3RzQXJyYXkuc3BsaWNlKGksIDEpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvamVjdHNBcnJheS5wdXNoKHByb2plY3QpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzQXJyYXkpKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVByb2plY3RGcm9tTG9jYWxTdG9yYWdlID0gKG5hbWUpID0+IHtcbiAgICBsZXQgcHJvamVjdHNBcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJvamVjdHNBcnJheVtpXS5wcm9qZWN0TmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICBwcm9qZWN0c0FycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0FycmF5KSk7XG59XG5cbmV4cG9ydCBjb25zdCBhZGRUYXNrVG9Qcm9qZWN0SW5Mb2NhbFN0b3JhZ2UgPSAodG9kb0l0ZW0pID0+IHtcbiAgICBsZXQgcHJvamVjdHNBcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJvamVjdHNBcnJheVtpXS5wcm9qZWN0TmFtZSA9PSBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkucHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIHByb2plY3RzQXJyYXlbaV0udGFza0Fyci5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0FycmF5KSk7XG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVUYXNrSW5Qcm9qZWN0SW5Mb2NhbFN0b3JhZ2UgPSAodG9kb0l0ZW0pID0+IHtcbiAgICBsZXQgcHJvamVjdHNBcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJvamVjdHNBcnJheVtpXS5wcm9qZWN0TmFtZSA9PSBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkucHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHJvamVjdHNBcnJheVtpXS50YXNrQXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3RzQXJyYXlbaV0udGFza0FycltqXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0c0FycmF5W2ldLnRhc2tBcnIuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0FycmF5KSk7XG59XG5cbi8qXG4gKiBFdmVyeXRpaW1lIHNvbWV0aGluZyBpcyBhZGRlZCBpbiBhbGwvdG9kYXkvZnV0dXJlIHRvZG9zLCBhZGQgaXQgdG8gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBsb2NhbCBzdG9yYWdlIGFsc29cbiAqIGFuZCBldmVyeXJ0aW1lIHNvbWV0aGluZyBpcyBkZWxldGVkL2VkaXRlZCBpbiBhbGwvdG9kYXkvZnV0dXJlIHRvZG9zLCBkZWxldGUvZWRpdCBpdCBpbiB0aGUgbG9jYWwgc3RvcmFnZSBhbHNvXG4gKi9cblxuLy8gbWFrZSB0aGUgYWRkL2RlbGV0ZSB0b2RvcyBtb3JlIGVmZmljaWVudFxuLy9jb21iaW5lIHRoZSBhZGR0b2RvIGZ1bmN0aW9ucyBhbmQgY3JlYXRlIG9uZSB3aG9sZSBmdW5jdGlvbiB0aGF0IHRha2VzIHRoZSB0b2RvSXRlbSBcbi8vYW5kIHRoZSBuYW1lIG9mIHRoZSBhcnJheSBpdCB1c2VzIGFuZCBoYXZlIGNvbmRpdGlvbmFsIHN0YXRlbWVudHMgY29ycmVzcG9uZGluZ2x5XG4vL3NhbWUgdGhpbmcgd2l0aCB0aGUgZGVsZXRlVG9kbyBmdW5jdGlvbnNcblxuZXhwb3J0IGNvbnN0IGFkZFRvZG9Ub0FsbFRvZG9zSW5Mb2NhbFN0b3JhZ2UgPSAodG9kb0l0ZW0pID0+IHtcbiAgICAvL2lmIGl0IGRvZXNuJ3QgZXhpc3QgeWV0XG4gICAgaWYgKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFRvZG9zJykpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxUb2RvcycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XG4gICAgfVxuICAgIFxuICAgIGxldCBhbGxUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFRvZG9zJykpO1xuICAgIGFsbFRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxUb2RvcycsIEpTT04uc3RyaW5naWZ5KGFsbFRvZG9zKSk7XG4gICAgXG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVUb2RvSW5BbGxUb2Rvc0luTG9jYWxTdG9yYWdlID0gKG5hbWUpID0+IHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFRvZG9zJykpIHtcbiAgICAgICBsZXQgYWxsVG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxUb2RvcycpKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYWxsVG9kb3NbaV0udGl0bGUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIGFsbFRvZG9zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsVG9kb3MnLCBKU09OLnN0cmluZ2lmeShhbGxUb2RvcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFkZFRvZG9Ub1RvZGF5VG9kb3NJbkxvY2FsU3RvcmFnZSA9ICh0b2RvSXRlbSkgPT4ge1xuICAgIC8vaWYgaXQgZG9lc24ndCBleGlzdCB5ZXRcbiAgICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXlUb2RvcycpKSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kYXlUb2RvcycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XG4gICAgfVxuICAgIGxldCBwbGFjZWhvbGRlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RheVRvZG9zJyk7XG4gICAgbGV0IHRvZGF5VG9kb3MgPSBKU09OLnBhcnNlKHBsYWNlaG9sZGVyKTtcbiAgICB0b2RheVRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RheVRvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kYXlUb2RvcykpO1xufSAgIFxuXG5leHBvcnQgY29uc3QgZGVsZXRlVG9kYXlUb2RvSW5Mb2NhbFN0b3JhZ2UgPSAobmFtZSkgPT4ge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXlUb2RvcycpKSB7XG4gICAgICAgIGxldCB0b2RheVRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXlUb2RvcycpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RheVRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodG9kYXlUb2Rvc1tpXS50aXRsZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlUb2Rvcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZGF5VG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RheVRvZG9zKSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkRnV0dXJlVG9kb0luTG9jYWxTdG9yYWdlID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgaWYgKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Z1dHVyZVRvZG9zJykpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmdXR1cmVUb2RvcycsIEpTT04uc3RyaW5naWZ5KFtdKSlcbiAgICB9XG4gICAgY29uc3QgZnV0dXJlVG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmdXR1cmVUb2RvcycpKTtcbiAgICBmdXR1cmVUb2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZnV0dXJlVG9kb3MnLCBKU09OLnN0cmluZ2lmeShmdXR1cmVUb2RvcykpO1xufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlRnV0dXJlVG9kb0luTG9jYWxTdG9yYWdlID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBmdXR1cmVUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Z1dHVyZVRvZG9zJykpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnV0dXJlVG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGZ1dHVyZVRvZG9zW2ldLnRpdGxlID09IG5hbWUpIHtcbiAgICAgICAgICAgIGZ1dHVyZVRvZG9zLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZnV0dXJlVG9kb3MnLCBKU09OLnN0cmluZ2lmeShmdXR1cmVUb2RvcykpO1xufVxuXG4vL2lmIHlvdSBkZWxldGUgYSBwcm9qZWN0LCBpdCBkb2Vzbid0IGRlbGV0ZSB0aGUgdG9kb3MgaW4gdGhhdCBwcm9qZWN0IHRoYXQgYXJlIGluIHRoZSBsb2NhbCBzdG9yYWdlIC0tIGdvdCB0byBmaXggdGhpc1xuLy9maXJzdCBnZXQgdGhlIHByb2plY3QgdGhhdCBpcyBhYm91dCB0byBiZSBkZWxldGVkXG4vL2xvb3AgdGhyb3VnaCB0aGUgdGFza0FyciBvZiB0aGF0IHByb2plY3QgYW5kIGNvbXBhcmUgaXQgdG8gYWxsVG9kb3MvdG9kYXlUb2Rvcy9mdXR1cmVUb2Rvc1xuLy9pZiBhbnkgb2YgdGhlbSBtYXRjaCwgdGhlbiBkZWxldGUgdGhlbVxuXG5leHBvcnQgY29uc3QgZGVsZXRlVGFza3NXaGVuUHJvamVjdERlbGV0ZWRJbkxvY2FsU3RvcmFnZSA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcbiAgICBsZXQgY3VycmVudFByb2plY3Q7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkgeyBcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFsbFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsVG9kb3MnKSk7XG4gICAgY29uc3QgdG9kYXlUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZGF5VG9kb3MnKSk7XG4gICAgY29uc3QgZnV0dXJlVG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmdXR1cmVUb2RvcycpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRQcm9qZWN0LnRhc2tBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFsbFRvZG9zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFsbFRvZG9zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQcm9qZWN0LnRhc2tBcnJbaV0udGl0bGUgPT0gYWxsVG9kb3Nbal0udGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsVG9kb3Muc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgICAgICB0b2RvLmdldEFsbFRvZG9zKCkuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodG9kYXlUb2Rvcykge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0b2RheVRvZG9zLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQcm9qZWN0LnRhc2tBcnJbaV0udGl0bGUgPT0gdG9kYXlUb2Rvc1trXS50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICB0b2RheVRvZG9zLnNwbGljZShrLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kby5nZXRUb2RheVRvZG9zKCkuc3BsaWNlKGssIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnV0dXJlVG9kb3MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgZnV0dXJlVG9kb3MubGVuZ3RoOyBsKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFByb2plY3QudGFza0FycltpXS50aXRsZSA9PSBmdXR1cmVUb2Rvc1tsXS50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBmdXR1cmVUb2Rvcy5zcGxpY2UobCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRvZG8uZ2V0RnV0dXJlVG9kb3MoKS5zcGxpY2UobCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChhbGxUb2RvcykgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbFRvZG9zJywgSlNPTi5zdHJpbmdpZnkoYWxsVG9kb3MpKTtcbiAgICBpZiAodG9kYXlUb2RvcykgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZGF5VG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RheVRvZG9zKSk7XG4gICAgaWYgKGZ1dHVyZVRvZG9zKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZnV0dXJlVG9kb3MnLCBKU09OLnN0cmluZ2lmeShmdXR1cmVUb2RvcykpO1xuICAgIFxufSIsImltcG9ydCB7IHRvZG8sIHByb2plY3QgfSBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgeyBkaXNwbGF5UHJvamVjdHMgfSBmcm9tIFwiLi91aVwiO1xuXG5cblxuLypcbiEhISEhISBJIG5lZWQgdG8gY3JlYXRlIGFuIGluaXRpbGEgZGVmYXVsdCBwcm9qZWN0IHNvIHRoYXQgdGhlcmUgaXMgbm8gZXJyb3Jcbm1heWJlIHdpdGggc29tZSB0YXNrcyBpbiB0aGF0IHByb2plY3Rcbm1heWJlIGFkZCBjdXJyZW50IHByb2plY3QgdG8gbG9jYWwgc3Ryb2FnZSBhbHNvIHNvIHRoYXQgaXQga2VlcHMgdGhlIFxuZGF0YSBvbiBzY3JlZW4gZXZlbiBhZnRlciBhIHJlbG9hZFxuKi9cblxuZXhwb3J0IGNvbnN0IG9ubG9hZCA9ICgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChlKSA9PiB7XG4gICAgICAgIGFkZFRvZG9zVG9BbGxUb2RvcygpO1xuICAgICAgICBhZGRQcm9qZWN0c1RvUHJvamVjdEFycmF5KCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShbXSkpO1xuICAgICAgICBcbiAgICB9KVxufVxuXG4vLyBpdCBub3cgYWRkcyB0aGUgZGF0YSBmcm9tIGxzIHRvIHRoZSBjb3JyZXNwb25kaW5nIGFycmF5cywgYWxsIGkgbmVlZCB0byBkbyBub3cgaXMgdG8gZGlzcGxheSB0aGVtIFxuY29uc3QgYWRkVG9kb3NUb0FsbFRvZG9zID0gKCkgPT4ge1xuICAgIGxldCBhbGxUb2Rvc0xTID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsVG9kb3MnKSk7XG4gICAgbGV0IHRvZGF5VG9kb3NMUyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZGF5VG9kb3MnKSk7XG4gICAgbGV0IGZ1dHVyZVRvZG9zTFMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmdXR1cmVUb2RvcycpKTtcbiAgICBpZiAoYWxsVG9kb3NMUykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFRvZG9zTFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRvZG8uZ2V0QWxsVG9kb3MoKVtpXSA9IGFsbFRvZG9zTFNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRvZGF5VG9kb3NMUykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZGF5VG9kb3NMUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9kby5nZXRUb2RheVRvZG9zKClbaV0gPSB0b2RheVRvZG9zTFNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZ1dHVyZVRvZG9zTFMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdXR1cmVUb2Rvc0xTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b2RvLmdldEZ1dHVyZVRvZG9zKClbaV0gPSBmdXR1cmVUb2Rvc0xTW2ldO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBhZGRQcm9qZWN0c1RvUHJvamVjdEFycmF5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RBcnJheUxTID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0QXJyYXlMUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9qZWN0LmdldFByb2plY3RzKCkucHVzaChwcm9qZWN0QXJyYXlMU1tpXSk7XG4gICAgfVxuICAgIGRpc3BsYXlQcm9qZWN0cygpO1xufSIsImltcG9ydCB7IGFkZEZ1dHVyZVRvZG9JbkxvY2FsU3RvcmFnZSwgYWRkUHJvamVjdFRvTG9jYWxTdG9yYWdlLCBhZGRUYXNrVG9Qcm9qZWN0SW5Mb2NhbFN0b3JhZ2UsIGFkZFRvZG9Ub0FsbFRvZG9zSW5Mb2NhbFN0b3JhZ2UsIGFkZFRvZG9Ub1RvZGF5VG9kb3NJbkxvY2FsU3RvcmFnZSwgZGVsZXRlRnV0dXJlVG9kb0luTG9jYWxTdG9yYWdlLCBkZWxldGVQcm9qZWN0RnJvbUxvY2FsU3RvcmFnZSwgZGVsZXRlVGFza0luUHJvamVjdEluTG9jYWxTdG9yYWdlLCBkZWxldGVUYXNrc1doZW5Qcm9qZWN0RGVsZXRlZEluTG9jYWxTdG9yYWdlLCBkZWxldGVUb2RheVRvZG9JbkxvY2FsU3RvcmFnZSwgZGVsZXRlVG9kb0luQWxsVG9kb3NJbkxvY2FsU3RvcmFnZSB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5leHBvcnQgY29uc3QgdG9kbyA9ICgoKSA9PiB7XG4gICAgbGV0IGFsbFRvZG9zID0gW107XG4gICAgbGV0IHRvZGF5VG9kb3MgPSBbXTtcbiAgICBsZXQgZnV0dXJlVG9kb3MgPSBbXTtcbiAgICBcbiAgICBjb25zdCBnZXRBbGxUb2RvcyA9ICgpID0+IGFsbFRvZG9zO1xuICAgIGNvbnN0IGdldFRvZGF5VG9kb3MgPSAoKSA9PiB0b2RheVRvZG9zO1xuICAgIGNvbnN0IGdldEZ1dHVyZVRvZG9zID0gKCkgPT4gZnV0dXJlVG9kb3M7XG5cbiAgICBjb25zdCBjcmVhdGVUb2RvID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHtcbiAgICAgICAgICAgIHRpdGxlLCBcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLCBcbiAgICAgICAgICAgIGR1ZURhdGUsIFxuICAgICAgICB9O1xuXG4gICAgICAgIGFkZFRvZGF5VG9kbyh0b2RvSXRlbSk7XG4gICAgICAgIGFkZEZ1dHVyZVRvZG9zKHRvZG9JdGVtKTtcbiAgICAgICAgYWxsVG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgIGFkZFRvZG9Ub0FsbFRvZG9zSW5Mb2NhbFN0b3JhZ2UodG9kb0l0ZW0pO1xuICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgYWRkVGFza1RvUHJvamVjdEluTG9jYWxTdG9yYWdlKHRvZG9JdGVtKTtcbiAgICB9XG5cbiAgICAvL2RlbGV0ZXMgdG9kbyBpbiB0aGUgY3VycmVudCBwcm9qZWN0XG4gICAgY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0udGl0bGUgPT0gdG9kb0l0ZW0pICB7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRhc2tJblByb2plY3RJbkxvY2FsU3RvcmFnZSh0b2RvSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVUb2RvSW5BbGxUb2Rvc0FycmF5ID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0QWxsVG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGdldEFsbFRvZG9zKClbaV0udGl0bGUgPT0gdG9kb0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBnZXRBbGxUb2RvcygpLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG9JbkFsbFRvZG9zSW5Mb2NhbFN0b3JhZ2UodG9kb0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGVkaXRUb2RvID0gKG9sZFRpdGxlLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24sIG5ld0R1ZURhdGUpID0+IHtcbiAgICAgICAgbGV0IHRvZG9JdGVtO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0udGl0bGUgPT0gb2xkVGl0bGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyciA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyO1xuICAgICAgICAgICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICAgICAgICAgICAgICB0b2RvSXRlbSA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vdXBkYXRlcyB0b2RheS9mdXR1cmUgdG9kbyBhcnJheVxuICAgICAgICBkZWxldGVUb2RheVRvZG8ob2xkVGl0bGUpO1xuICAgICAgICBkZWxldGVGdXR1cmVUb2RvKG9sZFRpdGxlKTtcbiAgICAgICAgYWRkVG9kYXlUb2RvKHRvZG9JdGVtKTtcbiAgICAgICAgYWRkRnV0dXJlVG9kb3ModG9kb0l0ZW0pO1xuXG4gICAgICAgIGRlbGV0ZVRhc2tJblByb2plY3RJbkxvY2FsU3RvcmFnZShvbGRUaXRsZSk7XG4gICAgICAgIGFkZFRhc2tUb1Byb2plY3RJbkxvY2FsU3RvcmFnZSh0b2RvSXRlbSk7XG4gICAgICAgIGRlbGV0ZVRvZG9JbkFsbFRvZG9zQXJyYXkob2xkVGl0bGUpO1xuICAgICAgICBhbGxUb2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgYWRkVG9kb1RvQWxsVG9kb3NJbkxvY2FsU3RvcmFnZSh0b2RvSXRlbSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkVG9kYXlUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCB0b2RvSXRlbURhdGUgPSBuZXcgRGF0ZSh0b2RvSXRlbS5kdWVEYXRlKTtcbiAgICAgICAgdG9kb0l0ZW1EYXRlLnNldERhdGUodG9kb0l0ZW1EYXRlLmdldERhdGUoKSsxKTtcblxuICAgICAgICBpZiAodG9kb0l0ZW1EYXRlLmdldERhdGUoKSA9PSBjdXJyZW50RGF0ZS5nZXREYXRlKCkgXG4gICAgICAgICYmIHRvZG9JdGVtRGF0ZS5nZXRNb250aCgpID09IGN1cnJlbnREYXRlLmdldE1vbnRoKCkgXG4gICAgICAgICYmIHRvZG9JdGVtRGF0ZS5nZXRGdWxsWWVhcigpID09IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgICAgIHRvZGF5VG9kb3MucHVzaCh0b2RvSXRlbSlcbiAgICAgICAgICAgIGFkZFRvZG9Ub1RvZGF5VG9kb3NJbkxvY2FsU3RvcmFnZSh0b2RvSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVUb2RheVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRUb2RheVRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChnZXRUb2RheVRvZG9zKClbaV0udGl0bGUgPT0gdG9kb0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBnZXRUb2RheVRvZG9zKCkuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlVG9kYXlUb2RvSW5Mb2NhbFN0b3JhZ2UodG9kb0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWRkRnV0dXJlVG9kb3MgPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxuICAgICAgICBsZXQgdG9kb0l0ZW1EYXRlID0gbmV3IERhdGUodG9kb0l0ZW0uZHVlRGF0ZSk7XG4gICAgICAgIGxldCBmdXR1cmUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgdG9kb0l0ZW1EYXRlLnNldERhdGUodG9kb0l0ZW1EYXRlLmdldERhdGUoKSsxKVxuICAgICAgICBmdXR1cmUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICBcbiAgICAgICAgaWYgKHRvZG9JdGVtRGF0ZSA+PSBmdXR1cmUpIHtcbiAgICAgICAgICAgIGZ1dHVyZVRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICAgICAgYWRkRnV0dXJlVG9kb0luTG9jYWxTdG9yYWdlKHRvZG9JdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZUZ1dHVyZVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRGdXR1cmVUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0RnV0dXJlVG9kb3MoKVtpXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgIGdldEZ1dHVyZVRvZG9zKCkuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlRnV0dXJlVG9kb0luTG9jYWxTdG9yYWdlKHRvZG9JdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGdldEFsbFRvZG9zLCBjcmVhdGVUb2RvLCBkZWxldGVUb2RvLCBlZGl0VG9kbywgZGVsZXRlVG9kb0luQWxsVG9kb3NBcnJheSwgZ2V0VG9kYXlUb2RvcywgZGVsZXRlVG9kYXlUb2RvLCBnZXRGdXR1cmVUb2RvcywgZGVsZXRlRnV0dXJlVG9kbyB9O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IHByb2plY3QgPSAoKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgbGV0IGN1cnJlbnRQcm9qZWN0O1xuICAgIGxldCBwcmV2aW91c1Byb2plY3Q7XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzO1xuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IHtcbiAgICAgICAgICAgIHByb2plY3ROYW1lLCBcbiAgICAgICAgICAgIHRhc2tBcnI6IFtdLFxuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdEl0ZW0pO1xuICAgICAgICBhZGRQcm9qZWN0VG9Mb2NhbFN0b3JhZ2UocHJvamVjdEl0ZW0pO1xuICAgIH1cblxuICAgIGNvbnN0IGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4gY3VycmVudFByb2plY3Q7XG5cbiAgICBjb25zdCBzZXRDdXJyZW50UHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0c1tpXS5wcm9qZWN0TmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZURlZmF1bHRQcm9qZWN0ID0gKCkgPT4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0KCdIb21lJyk7XG4gICAgICAgIHNldEN1cnJlbnRQcm9qZWN0KCdIb21lJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0c1tpXS5wcm9qZWN0TmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRhc2tzV2hlblByb2plY3REZWxldGVkSW5Mb2NhbFN0b3JhZ2UobmFtZSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlUHJvamVjdEZyb21Mb2NhbFN0b3JhZ2UobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBjcmVhdGVQcm9qZWN0LCBnZXRQcm9qZWN0cywgZ2V0Q3VycmVudFByb2plY3QsIHNldEN1cnJlbnRQcm9qZWN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCwgZGVsZXRlUHJvamVjdCB9XG59KSgpXG4iLCJpbXBvcnQgeyB0b2RvLCBwcm9qZWN0IH0gZnJvbSBcIi4vdG9kb1wiO1xuaW1wb3J0IHN0YXIgZnJvbSAnLi4vaWNvbnMvc3Rhci1vdXRsaW5lLnN2ZydcbmltcG9ydCBjbG9zZSBmcm9tICcuLi9pY29ucy9jbG9zZS5wbmcnXG5pbXBvcnQgb3B0aW9uIGZyb20gJy4uL2ljb25zL21vcmUtdmVydGljYWwtYWx0LnN2ZydcblxuLy9hdHRhY2hlcyBldmVudExpc3RlbmVyIGZvciB3aGVuIHRhc2tGb3JtIGlzIHN1Ym1pdHRlZFxuZXhwb3J0IGNvbnN0IG1ha2VUb2RvID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKTtcblxuICAgICAgICB0b2RvLmNyZWF0ZVRvZG8odGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLnZhbHVlKTtcbiAgICAgICBcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG5cbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSwge29uY2U6IHRydWV9KVxufSAgIFxuXG4vL2F0dGFjaGVzIGV2ZW50TGlzdGVuZXIgZm9yIHdoZW4gcHJvamVjdEZvcm0gaXMgc3VibWl0dGVkXG5leHBvcnQgY29uc3QgbWFrZVByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgcHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuXG4gICAgICAgIHByb2plY3QuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuXG4gICAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG4gICAgICAgLy8gcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgncHJvamVjdC1mb3JtLWFjdGl2ZScpO1xuICAgICAgLy8gIHByb2plY3RGb3JtLnJlbW92ZUF0dHJpYnV0ZSgncHJvamVjdC1mb3JtLWFjdGl2ZScpXG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0sIHtvbmNlOnRydWV9KVxufVxuXG4vL21ha2UgdGhpcyB0aGUgZGlzcGxheSAnQUxMIFRPRE9TJyBmdW5jdGlvbiB3aGVuICdBTEwgVEFTS1MnIGlzIGNsaWNrZWRcbmV4cG9ydCBjb25zdCBkaXNwbGF5QWxsVG9kb3MgPSAoKSA9PiB7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kby5nZXRBbGxUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0QWxsVG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldEFsbFRvZG9zKClbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmdldEFsbFRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheVRvZGF5VG9kb3MgPSAoKSA9PiB7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldFRvZGF5VG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZGF5VG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZGF5VG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kYXlUb2RvcygpW2ldLmR1ZURhdGU7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKVxuXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvZGF5VGFza3NDbGlja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5Jyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1oZWFkZXInKTtcblxuICAgIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZGlzcGxheVRvZGF5VG9kb3MoKTtcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSBcIlRvZGF5J3MgVGFza3NcIjtcbiAgICAgICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KVxufVxuXG4vKlxuaWYgYWxsIHRhc2tzIGJ1dHRvbiBpcyBjbGlja2VkLCBkaXNwbGF5IGFsbCBvZiB0aGUgdGFza3NcblxudGFzayBidXR0b24gaXMgY2xpY2tlZCwgbWFrZSB0aGUgdGFza3MgY29udGFpbmVyIGJsYW5rIHRoZW4gZGlzcGxheSBhbGwgdGhlIHRhc2tzXG4qL1xuZXhwb3J0IGNvbnN0IGFsbFRhc2tzQ2xpY2tlZCA9ICgpID0+IHtcbiAgICBjb25zdCBhbGxUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwtdGFza3MnKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuXG4gICAgYWxsVGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkaXNwbGF5QWxsVG9kb3MoKVxuICAgICAgICBwcm9qZWN0TmFtZUhlYWRlci50ZXh0Q29udGVudCA9ICdBbGwgVGFza3MnO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZnV0dXJlVG9kb3NDbGlja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IG5leHRTZXZlbkRheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrJyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1oZWFkZXInKTtcblxuICAgIG5leHRTZXZlbkRheXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRpc3BsYXlGdXR1cmVUb2RvcygpO1xuICAgICAgICBwcm9qZWN0TmFtZUhlYWRlci50ZXh0Q29udGVudCA9ICdGdXR1cmUgVGFza3MnO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pXG59XG5cbmNvbnN0IGRpc3BsYXlGdXR1cmVUb2RvcyA9ICgpID0+IHtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG8uZ2V0RnV0dXJlVG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLmdldEZ1dHVyZVRvZG9zKClbaV0udGl0bGU7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5nZXRGdXR1cmVUb2RvcygpW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5nZXRGdXR1cmVUb2RvcygpW2ldLmR1ZURhdGU7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKVxuXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtY29udGFpbmVyJyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGFkZFRhc2suY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgcHJvamVjdENvbnRhaW5lci50ZXh0Q29udGVudCA9ICcgJztcbiAgICBsZXQgbCA9IHByb2plY3QuZ2V0UHJvamVjdHMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0UHJvamVjdHMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgIFxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRQcm9qZWN0cygpW2ldLnByb2plY3ROYW1lO1xuICAgICAgICBvcHRpb25zLnNyYyA9IGNsb3NlO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBvcHRpb25zLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3Qtb3B0aW9ucycpO1xuICAgICAgICAvL29wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG5cbiAgICAgICAgaWYgKHByb2plY3QuZ2V0UHJvamVjdHMoKVtpXSA9PSBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkpIHtcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWNsaWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25zKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgICBkZWxldGVQcm9qZWN0KCk7XG4gICAgc2hvd1Rhc2tzSW5Qcm9qZWN0KCk7XG59XG4vL3JlbmFtZSB0aGlzIGZ1bmN0aW9uIGxhdGVyXG4vL3doZW4gYW55IG9mIHRoZSBwcm9qZWN0cyBhcmUgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IHNob3dUYXNrc0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcblxuICAgIHByb2plY3RzLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSBgJHtlLnRhcmdldC50ZXh0Q29udGVudH1gO1xuICAgICAgICBjb25zb2xlLmxvZygnaGknKVxuICAgICAgICBwcm9qZWN0LnNldEN1cnJlbnRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0pKVxufVxuXG4vL2hhdmUgdG8gYWRkIGEgZGVsZXRlIHRhc2tzIGZ1bmN0aW9uIHRoYXQgZGVsZXRlcyB0aGUgdGFza3Mgb24gdGhlIHBhZ2UgaWYgdGhlIGN1cnJlbnQgcHJvamVjdCBpcyB0aGUgb25lIHRoYXQgZ290IGRlbGV0ZWRcbi8vYmVjYXVzZSBpdCBzdGlsbCBzaG93cyB0aGUgcHJldmlvdXMgdGFza3MgZXZlbiBpZiB0aGF0IHByb2plY3QgZ290IGRlbGV0ZWRcblxuY29uc3QgZGlzcGxheVRhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBidG5Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbGV0IGltcG9ydGFudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZHVlRGF0ZTtcbiAgICAgICAgaW1wb3J0YW50LnNyYyA9IHN0YXI7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gb3B0aW9uO1xuXG4gICAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3B0aW9uYWwtYnV0dG9ucycpXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpXG4gICAgICAgIGltcG9ydGFudC5jbGFzc0xpc3QuYWRkKCdpbXBvcnRhbnQnKTtcbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCd0YXNrLW9wdGlvbnMnKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWVkaXQtYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlbGV0ZS1idXR0b24nKTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICBidG5Db250LmFwcGVuZENoaWxkKGltcG9ydGFudCk7XG4gICAgICAgIGJ0bkNvbnQuYXBwZW5kQ2hpbGQob3B0aW9ucyk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChidG5Db250KTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG4gICAgdGFza09wdGlvbkNsaWNrZWQoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyVGFza0NvbnRhaW5lciA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpO1xuICAgIHRhc2tzLnRleHRDb250ZW50ID0gJyAnO1xufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheURlZmF1bHRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIHByb2plY3QuY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcbiAgICBkaXNwbGF5UHJvamVjdHMoKTtcbn1cblxuLy8xLiB3aGVuIHlvdSBkZWxldGUgYSBwcm9qZWN0LCBpdCBzdGlsbCBzaG93cyB0aGUgY3VycmVudCB0YXNrcyBpbiB0aGF0IHByb2plY3QgKGlmIHlvdSBjbGlja2VkIGl0IGJlZm9yZSBkZWxldGluZylcbi8vMi4gb3RoZXIgZnVuY3Rpb25hbGl0eTogd2hlbiB5b3UgaG92ZXIgb3ZlciBwcm9qZWN0IHRoYXQncyB3aGVuIHRoZSBvcHRpb24gdG8gZGVsZXRlIGl0IHNob3VsZCBzaG93XG4vLyAgIGRvIHRoaXMgYnkgYWRkaW5nIGEgbW91c2VvdmVyIGV2ZW50TGlzdGVuZXIgYW5kIHdoZW4geW91IGhvdmVyIG92ZXIgdGhlIHByb2plY3QsIGl0IHNob3VsZCBzaG93IHRoZSAnWCcgdG8gZGVsZXRlIGl0LCBhbmQgdGhlbiBydW4gYSBcbi8vICAgZnVuY3Rpb24gdGhhdCBhdHRhY2hlcyBhbiBldmVudExpc3RlbmVyIHRvIHRoYXQgJ1gnIHdoZW4geW91IGhvdmVyIG92ZXIgaXRcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdE9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1vcHRpb25zJyk7XG5cbiAgICBwcm9qZWN0T3B0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHByb2plY3QuZGVsZXRlUHJvamVjdChlLnRhcmdldC5wcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICB9KSlcbn1cblxuLy9zaG93cyBoaWRkZW4gdGFzayBmb3JtXG5leHBvcnQgY29uc3QgYWRkVGFzayA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIG1ha2VUb2RvKCk7XG4gICAgfSk7XG59XG5cbi8vc2hvd3MgaGlkZGVuIHByb2plY3QgZm9ybVxuZXhwb3J0IGNvbnN0IGFkZFByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgIC8vICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdwcm9qZWN0LWZvcm0tYWN0aXZlJyk7XG5cbiAgICAgIC8vICBwcm9qZWN0Rm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtZm9ybS1hY3RpdmUnKVxuICAgICAgICBtYWtlUHJvamVjdCgpO1xuICAgIH0pO1xufVxuXG4vL3Nob3cgY2xvc2UgYnV0dG9uIHdoZW4gaG92ZXIgb3ZlciBwcm9qZWN0IGxhdGVyXG4vKlxuY29uc3Qgc2hvd0Nsb3NlQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcblxuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KVxuICAgICAgICBlLnRhcmdldC5sYXN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSkpXG59Ki9cblxuZXhwb3J0IGNvbnN0IHRhc2tPcHRpb25DbGlja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stb3B0aW9ucycpXG5cbiAgICB0YXNrT3B0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUubGFzdENoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBkZWxldGVUYXNrSW5Qcm9qZWN0KCk7XG4gICAgICAgIGVkaXRUYXNrSW5Qcm9qZWN0KCk7XG4gICAgICAgIC8qIFxuICAgICAgICAgKiBcbiAgICAgICAgICogaWYgY2xpY2tlZCBvdXRzaWRlIG9mIHRoZSBlbGVtZW50LCB0aGVuIG1ha2UgaXQgaGlkZGVuL29yIGRlbGV0ZSBpdFxuICAgICAgICAgKiBkbyB0aGlzIHNvIHRoYXQgdGhlIHVzZXIgY2FuIGV4aXQgdGhlIG9wdGlvbnNCdXR0b25zIGlmIHRoZXkgY2xpY2sgc29tZXdoZXJlIGVsc2VcbiAgICAgICAgICogXG4gICAgICAgICAqL1xuICAgIH0pKVxufVxuXG5jb25zdCBlZGl0VGFza0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLWVkaXQtYnV0dG9uJyk7XG4gICAgY29uc3QgZWRpdFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1mb3JtJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5JylcblxuICAgIGVkaXRCdXR0b25zLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaScpXG4gICAgICAgIGVkaXRUYXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRpdGxlJyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWRlc2NyaXB0aW9uJyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGF0ZScpO1xuICAgICAgICB0aXRsZS52YWx1ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDApLnRleHRDb250ZW50O1xuICAgICAgICBkZXNjcmlwdGlvbi52YWx1ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDEpLnRleHRDb250ZW50O1xuICAgICAgICBkdWVEYXRlLnZhbHVlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMikudGV4dENvbnRlbnQ7XG4gICAgICAgIGxldCBvbGRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDApLnRleHRDb250ZW50O1xuXG4gICAgICAgIGVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdHRlZCcpO1xuXG4gICAgICAgICAgICBsZXQgbmV3VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgbGV0IG5ld0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGxldCBuZXdEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGF0ZScpLnZhbHVlO1xuXG4gICAgICAgICAgICB0b2RvLmVkaXRUb2RvKG9sZFRpdGxlLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24sIG5ld0R1ZURhdGUpO1xuXG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcbiAgICAgICAgfSwge29uY2U6IHRydWV9KVxuICAgIH0pKVxufVxuXG5jb25zdCBkZWxldGVUYXNrSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLWRlbGV0ZS1idXR0b24nKTtcblxuICAgIGRlbGV0ZUJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndGFzayBkZWxldGVkJylcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgIHRvZG8uZGVsZXRlVG9kbyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIHRvZG8uZGVsZXRlVG9kb0luQWxsVG9kb3NBcnJheShlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIHRvZG8uZGVsZXRlVG9kYXlUb2RvKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgdG9kby5kZWxldGVGdXR1cmVUb2RvKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG4gICAgfSkpXG59XG5cbmV4cG9ydCBjb25zdCBjbGVhclByb2plY3RIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaGVhZGVyJyk7XG4gICAgcHJvamVjdEhlYWRlci50ZXh0Q29udGVudCA9ICcgJztcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgZXZlbnRIYW5kbGVycyB9IGZyb20gXCIuL21vZHVsZXMvY29udHJvbGxlclwiO1xuZXZlbnRIYW5kbGVycygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9