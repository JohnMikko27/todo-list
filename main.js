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
        e.target.parentNode.classList.toggle('hidden');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7O0FDbEJxRDtBQUNyRCxrRUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZVVJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2hhbmRsZXMgaWYgYSBET00gY2hhbmdpbmcgKHVpLmpzKSBhbmQgYXBwbHlpbmcgdGhlIGNvcnJlY3QgbG9naW4gZnJvbSB0b2RvLmpzXG4vL2ZvciBleGFtcGxlLCBpZiB0aGlzIGJ1dHRvbiBpcyBjbGlja2VkIChhbiBldmVudExpc3RlbmVyKSBpdCB3aWxsIHJ1biB0aGlzIGxvZ2ljIGZyb20gdG9kby5qcyB0aGVuIGNoYW5nZSB0aGUgRE9NIGFjY29yZGluZ2x5IGluIHVpLmpzXG5pbXBvcnQgeyBkaXNwbGF5RGVmYXVsdFByb2plY3QsIGFkZFByb2plY3QsIGFkZFRhc2ssIGFsbFRhc2tzQ2xpY2tlZCwgdG9kYXlUYXNrc0NsaWNrZWQsIGZ1dHVyZVRvZG9zQ2xpY2tlZCwgZGlzcGxheVByb2plY3RzLCBjbGVhclByb2plY3RIZWFkZXIgfSBmcm9tIFwiLi91aVwiO1xuaW1wb3J0IHsgb25sb2FkIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlVUlcIjtcblxuXG5cbmV4cG9ydCBjb25zdCBldmVudEhhbmRsZXJzID0gKCkgPT4ge1xuICAgIC8vY2xlYXJQcm9qZWN0SGVhZGVyKCk7XG4gICAgLy9kaXNwbGF5RGVmYXVsdFByb2plY3QoKTtcbiAgICBvbmxvYWQoKTtcbiAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICBhZGRUYXNrKCk7XG4gICAgYWRkUHJvamVjdCgpO1xuICAgIGFsbFRhc2tzQ2xpY2tlZCgpO1xuICAgIHRvZGF5VGFza3NDbGlja2VkKCk7XG4gICAgZnV0dXJlVG9kb3NDbGlja2VkKCk7XG59O1xuIiwiaW1wb3J0IHsgdG9kbywgcHJvamVjdCB9IGZyb20gXCIuL3RvZG9cIjtcblxuLypcbiAqIERvIHRoZSBsb2NhbCBzdG9yYWdlIHRoaW5nXG4gKiBmb3IgZXZlcnkgdG9kbyBhbmQgcHJvamVjdCBjcmVhdGVkLCBhZGQgaXQgdG8gdGhlIGxvY2FsIHN0b3JhZ2UgKG1heWJlIHRoZXJlIHdpbGwgYmUgYSBrZXkgZm9yIHRvZG8vcHJvamVjdCwgcmVzcGVjdGl2ZWx5KSBcbiAqIGFuZCB0aGUgdmFsdWUgaXMgYW4gYXJyYXkgdGhhdCBoYXMgYWxsIG9mIHRoZSB0b2Rvcy9wcm9qZWN0cywgcmVzcGVjdGl2ZWx5XG4gKiBUaGVuIHdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZCAodGhpcyBpcyBhbiBldmVudExpc3RlbmVyKSBnZXQgYWxsIG9mIHRoZSB0b2Rvcy9wcm9qZWN0XG4gKiBcbiAqIFxuICogdGhpcyBtaWdodCBub3Qgd29yayBeXl5cbiAqIEV2ZXJ5IHByb2plY3QgaGFzIGEgdGFzayBhcnJheSB0aGF0IGhhcyBhbGwgb2YgdGhlIHRhc2tzIGluIHRoYXQgcHJvamVjdCwgc28gbWF5YmUgd2UgbmVlZFxuICogbG9jYWwgc3RvcmFnZSBmb3IgdGhlIGZ1dHVyZVRvZG9zIGFuZCB0b2RheVRvZG9zIGFuZCBhbGxUb2RvcyBhbHNvIHNvIHRoYXQgdGhvc2UgYnV0dG9ucyB3b3JrIGFuZCBzbyB0aGF0IHRoZSB0b2Rvc1xuICogd2lsbCBiZSBzYXZlZCBldmVuIGlmIHlvdSByZWxvYWRlZFxuICovXG5cbi8vIG1pZ2h0IGFsc28gbmVlZCB0byBjaGVjayBpZiB0aGUgYnJvd3NlciBoYXMgbG9jYWxTdG9yYWdlIFxuLy90aGVyZSB3YXMgYSBkb2N1bWVudCB0aGF0IHNhaWQgdGhhdCBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgbG9jYWwgc3RvcmFnZSBzbyBpIG5lZWQgYW4gZXJyb3IgaGFuZGxlciBmb3IgdGhhdCBwb3RlbnRpYWxseVxuXG5cbi8qXG4gKiBcbiAqIFdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZCwgZ2V0IHRoZSBkYXRhIGZyb20gdGhlIGxvY2FsIHN0b3JhZ2VcbiAqIEdldCB0aGUgcHJvamVjdHMgd2l0aCB0aGVpciB0YXNrc1xuICogR2V0IGFsbC90b2RheS9mdXR1cmUgdG9kb3NcbiAqIEV2ZXJ5dGltZSBJIGNyZWF0ZSBhIHByb2plY3QsIEkgaGF2ZSB0byBhZGQgdGhhdCBwcm9qZWN0IHRvIHRoZSBsb2NhbCBzdG9yYWdlXG4gKiBldmVyeSB0aW1lIGkgY3JlYXRlIGEgdG8gZG8gaW4gYSBwcm9qZWN0LCBpIGhhdmUgdG8gdXBkYXRlIHRoYXQgY29ycmVzcG9uZGluZyBpdGVtL3Byb2plY3QgaW4gbG9jYWwgc3RvcmFnZVxuICogZXZlcnl0aW1lIEkgZWRpdCBvciBhZGQgdG8gYWxsL3RvZGF5L2Z1dHVyZSB0byBkbyBhcnJheXMsIEkgaGF2ZSB0byB1cGRhdGUgdGhlIGxvY2FsIHN0b3JhZ2VcbiAqIFxuICovXG5cbmV4cG9ydCBjb25zdCBhZGRQcm9qZWN0VG9Mb2NhbFN0b3JhZ2UgPSAocHJvamVjdCkgPT4ge1xuICAgIC8vaWYgaXQgZG9lc24ndCBleGlzdCB5ZXRcbiAgICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkoW10pKTtcbiAgICB9XG4gICAgbGV0IHByb2plY3RzQXJyYXkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb2plY3RzQXJyYXlbaV0ucHJvamVjdE5hbWUgPT0gcHJvamVjdC5wcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgcHJvamVjdHNBcnJheS5zcGxpY2UoaSwgMSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9qZWN0c0FycmF5LnB1c2gocHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnJheSkpO1xufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlUHJvamVjdEZyb21Mb2NhbFN0b3JhZ2UgPSAobmFtZSkgPT4ge1xuICAgIGxldCBwcm9qZWN0c0FycmF5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9qZWN0c0FycmF5W2ldLnByb2plY3ROYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgIHByb2plY3RzQXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzQXJyYXkpKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZFRhc2tUb1Byb2plY3RJbkxvY2FsU3RvcmFnZSA9ICh0b2RvSXRlbSkgPT4ge1xuICAgIGxldCBwcm9qZWN0c0FycmF5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9qZWN0c0FycmF5W2ldLnByb2plY3ROYW1lID09IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS5wcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgcHJvamVjdHNBcnJheVtpXS50YXNrQXJyLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzQXJyYXkpKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2tJblByb2plY3RJbkxvY2FsU3RvcmFnZSA9ICh0b2RvSXRlbSkgPT4ge1xuICAgIGxldCBwcm9qZWN0c0FycmF5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9qZWN0c0FycmF5W2ldLnByb2plY3ROYW1lID09IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS5wcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9qZWN0c0FycmF5W2ldLnRhc2tBcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNBcnJheVtpXS50YXNrQXJyW2pdLnRpdGxlID09IHRvZG9JdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RzQXJyYXlbaV0udGFza0Fyci5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzQXJyYXkpKTtcbn1cblxuLypcbiAqIEV2ZXJ5dGlpbWUgc29tZXRoaW5nIGlzIGFkZGVkIGluIGFsbC90b2RheS9mdXR1cmUgdG9kb3MsIGFkZCBpdCB0byB0aGUgY29ycmVzcG9uZGluZyBpdGVtIGluIGxvY2FsIHN0b3JhZ2UgYWxzb1xuICogYW5kIGV2ZXJ5cnRpbWUgc29tZXRoaW5nIGlzIGRlbGV0ZWQvZWRpdGVkIGluIGFsbC90b2RheS9mdXR1cmUgdG9kb3MsIGRlbGV0ZS9lZGl0IGl0IGluIHRoZSBsb2NhbCBzdG9yYWdlIGFsc29cbiAqL1xuXG4vLyBtYWtlIHRoZSBhZGQvZGVsZXRlIHRvZG9zIG1vcmUgZWZmaWNpZW50XG4vL2NvbWJpbmUgdGhlIGFkZHRvZG8gZnVuY3Rpb25zIGFuZCBjcmVhdGUgb25lIHdob2xlIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIHRvZG9JdGVtIFxuLy9hbmQgdGhlIG5hbWUgb2YgdGhlIGFycmF5IGl0IHVzZXMgYW5kIGhhdmUgY29uZGl0aW9uYWwgc3RhdGVtZW50cyBjb3JyZXNwb25kaW5nbHlcbi8vc2FtZSB0aGluZyB3aXRoIHRoZSBkZWxldGVUb2RvIGZ1bmN0aW9uc1xuXG5leHBvcnQgY29uc3QgYWRkVG9kb1RvQWxsVG9kb3NJbkxvY2FsU3RvcmFnZSA9ICh0b2RvSXRlbSkgPT4ge1xuICAgIC8vaWYgaXQgZG9lc24ndCBleGlzdCB5ZXRcbiAgICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsVG9kb3MnKSkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbFRvZG9zJywgSlNPTi5zdHJpbmdpZnkoW10pKTtcbiAgICB9XG4gICAgXG4gICAgbGV0IGFsbFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsVG9kb3MnKSk7XG4gICAgYWxsVG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbFRvZG9zJywgSlNPTi5zdHJpbmdpZnkoYWxsVG9kb3MpKTtcbiAgICBcbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRvZG9JbkFsbFRvZG9zSW5Mb2NhbFN0b3JhZ2UgPSAobmFtZSkgPT4ge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsVG9kb3MnKSkge1xuICAgICAgIGxldCBhbGxUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFRvZG9zJykpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsVG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhbGxUb2Rvc1tpXS50aXRsZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgYWxsVG9kb3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxUb2RvcycsIEpTT04uc3RyaW5naWZ5KGFsbFRvZG9zKSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkVG9kb1RvVG9kYXlUb2Rvc0luTG9jYWxTdG9yYWdlID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgLy9pZiBpdCBkb2Vzbid0IGV4aXN0IHlldFxuICAgIGlmICghKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RheVRvZG9zJykpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RheVRvZG9zJywgSlNPTi5zdHJpbmdpZnkoW10pKTtcbiAgICB9XG4gICAgbGV0IHBsYWNlaG9sZGVyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZGF5VG9kb3MnKTtcbiAgICBsZXQgdG9kYXlUb2RvcyA9IEpTT04ucGFyc2UocGxhY2Vob2xkZXIpO1xuICAgIHRvZGF5VG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZGF5VG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RheVRvZG9zKSk7XG59ICAgXG5cbmV4cG9ydCBjb25zdCBkZWxldGVUb2RheVRvZG9JbkxvY2FsU3RvcmFnZSA9IChuYW1lKSA9PiB7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RheVRvZG9zJykpIHtcbiAgICAgICAgbGV0IHRvZGF5VG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RheVRvZG9zJykpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZGF5VG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0b2RheVRvZG9zW2ldLnRpdGxlID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0b2RheVRvZG9zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kYXlUb2RvcycsIEpTT04uc3RyaW5naWZ5KHRvZGF5VG9kb3MpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRGdXR1cmVUb2RvSW5Mb2NhbFN0b3JhZ2UgPSAodG9kb0l0ZW0pID0+IHtcbiAgICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnV0dXJlVG9kb3MnKSkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Z1dHVyZVRvZG9zJywgSlNPTi5zdHJpbmdpZnkoW10pKVxuICAgIH1cbiAgICBjb25zdCBmdXR1cmVUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Z1dHVyZVRvZG9zJykpO1xuICAgIGZ1dHVyZVRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmdXR1cmVUb2RvcycsIEpTT04uc3RyaW5naWZ5KGZ1dHVyZVRvZG9zKSk7XG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVGdXR1cmVUb2RvSW5Mb2NhbFN0b3JhZ2UgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IGZ1dHVyZVRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnV0dXJlVG9kb3MnKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdXR1cmVUb2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZnV0dXJlVG9kb3NbaV0udGl0bGUgPT0gbmFtZSkge1xuICAgICAgICAgICAgZnV0dXJlVG9kb3Muc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmdXR1cmVUb2RvcycsIEpTT04uc3RyaW5naWZ5KGZ1dHVyZVRvZG9zKSk7XG59XG5cbi8vaWYgeW91IGRlbGV0ZSBhIHByb2plY3QsIGl0IGRvZXNuJ3QgZGVsZXRlIHRoZSB0b2RvcyBpbiB0aGF0IHByb2plY3QgdGhhdCBhcmUgaW4gdGhlIGxvY2FsIHN0b3JhZ2UgLS0gZ290IHRvIGZpeCB0aGlzXG4vL2ZpcnN0IGdldCB0aGUgcHJvamVjdCB0aGF0IGlzIGFib3V0IHRvIGJlIGRlbGV0ZWRcbi8vbG9vcCB0aHJvdWdoIHRoZSB0YXNrQXJyIG9mIHRoYXQgcHJvamVjdCBhbmQgY29tcGFyZSBpdCB0byBhbGxUb2Rvcy90b2RheVRvZG9zL2Z1dHVyZVRvZG9zXG4vL2lmIGFueSBvZiB0aGVtIG1hdGNoLCB0aGVuIGRlbGV0ZSB0aGVtXG5cbmV4cG9ydCBjb25zdCBkZWxldGVUYXNrc1doZW5Qcm9qZWN0RGVsZXRlZEluTG9jYWxTdG9yYWdlID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIGxldCBjdXJyZW50UHJvamVjdDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9qZWN0c1tpXS5wcm9qZWN0TmFtZSA9PSBuYW1lKSB7IFxuICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWxsVG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxUb2RvcycpKTtcbiAgICBjb25zdCB0b2RheVRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXlUb2RvcycpKTtcbiAgICBjb25zdCBmdXR1cmVUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Z1dHVyZVRvZG9zJykpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFByb2plY3QudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxsVG9kb3MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWxsVG9kb3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFByb2plY3QudGFza0FycltpXS50aXRsZSA9PSBhbGxUb2Rvc1tqXS50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxUb2Rvcy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRvZG8uZ2V0QWxsVG9kb3MoKS5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0b2RheVRvZG9zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRvZGF5VG9kb3MubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFByb2plY3QudGFza0FycltpXS50aXRsZSA9PSB0b2RheVRvZG9zW2tdLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5VG9kb3Muc3BsaWNlKGssIDEpO1xuICAgICAgICAgICAgICAgICAgICB0b2RvLmdldFRvZGF5VG9kb3MoKS5zcGxpY2UoaywgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmdXR1cmVUb2Rvcykge1xuICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCBmdXR1cmVUb2Rvcy5sZW5ndGg7IGwrKykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UHJvamVjdC50YXNrQXJyW2ldLnRpdGxlID09IGZ1dHVyZVRvZG9zW2xdLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1dHVyZVRvZG9zLnNwbGljZShsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kby5nZXRGdXR1cmVUb2RvcygpLnNwbGljZShsLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsbFRvZG9zKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsVG9kb3MnLCBKU09OLnN0cmluZ2lmeShhbGxUb2RvcykpO1xuICAgIGlmICh0b2RheVRvZG9zKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kYXlUb2RvcycsIEpTT04uc3RyaW5naWZ5KHRvZGF5VG9kb3MpKTtcbiAgICBpZiAoZnV0dXJlVG9kb3MpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmdXR1cmVUb2RvcycsIEpTT04uc3RyaW5naWZ5KGZ1dHVyZVRvZG9zKSk7XG4gICAgXG59IiwiaW1wb3J0IHsgdG9kbywgcHJvamVjdCB9IGZyb20gXCIuL3RvZG9cIjtcbmltcG9ydCB7IGRpc3BsYXlQcm9qZWN0cyB9IGZyb20gXCIuL3VpXCI7XG5cblxuXG4vKlxuISEhISEhIEkgbmVlZCB0byBjcmVhdGUgYW4gaW5pdGlsYSBkZWZhdWx0IHByb2plY3Qgc28gdGhhdCB0aGVyZSBpcyBubyBlcnJvclxubWF5YmUgd2l0aCBzb21lIHRhc2tzIGluIHRoYXQgcHJvamVjdFxubWF5YmUgYWRkIGN1cnJlbnQgcHJvamVjdCB0byBsb2NhbCBzdHJvYWdlIGFsc28gc28gdGhhdCBpdCBrZWVwcyB0aGUgXG5kYXRhIG9uIHNjcmVlbiBldmVuIGFmdGVyIGEgcmVsb2FkXG4qL1xuXG5leHBvcnQgY29uc3Qgb25sb2FkID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IHtcbiAgICAgICAgYWRkVG9kb3NUb0FsbFRvZG9zKCk7XG4gICAgICAgIGFkZFByb2plY3RzVG9Qcm9qZWN0QXJyYXkoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XG4gICAgICAgIFxuICAgIH0pXG59XG5cbi8vIGl0IG5vdyBhZGRzIHRoZSBkYXRhIGZyb20gbHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXlzLCBhbGwgaSBuZWVkIHRvIGRvIG5vdyBpcyB0byBkaXNwbGF5IHRoZW0gXG5jb25zdCBhZGRUb2Rvc1RvQWxsVG9kb3MgPSAoKSA9PiB7XG4gICAgbGV0IGFsbFRvZG9zTFMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxUb2RvcycpKTtcbiAgICBsZXQgdG9kYXlUb2Rvc0xTID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kYXlUb2RvcycpKTtcbiAgICBsZXQgZnV0dXJlVG9kb3NMUyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Z1dHVyZVRvZG9zJykpO1xuICAgIGlmIChhbGxUb2Rvc0xTKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsVG9kb3NMUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9kby5nZXRBbGxUb2RvcygpW2ldID0gYWxsVG9kb3NMU1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodG9kYXlUb2Rvc0xTKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kYXlUb2Rvc0xTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b2RvLmdldFRvZGF5VG9kb3MoKVtpXSA9IHRvZGF5VG9kb3NMU1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnV0dXJlVG9kb3NMUykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1dHVyZVRvZG9zTFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRvZG8uZ2V0RnV0dXJlVG9kb3MoKVtpXSA9IGZ1dHVyZVRvZG9zTFNbaV07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGFkZFByb2plY3RzVG9Qcm9qZWN0QXJyYXkgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEFycmF5TFMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RBcnJheUxTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb2plY3QuZ2V0UHJvamVjdHMoKS5wdXNoKHByb2plY3RBcnJheUxTW2ldKTtcbiAgICB9XG4gICAgZGlzcGxheVByb2plY3RzKCk7XG59IiwiaW1wb3J0IHsgYWRkRnV0dXJlVG9kb0luTG9jYWxTdG9yYWdlLCBhZGRQcm9qZWN0VG9Mb2NhbFN0b3JhZ2UsIGFkZFRhc2tUb1Byb2plY3RJbkxvY2FsU3RvcmFnZSwgYWRkVG9kb1RvQWxsVG9kb3NJbkxvY2FsU3RvcmFnZSwgYWRkVG9kb1RvVG9kYXlUb2Rvc0luTG9jYWxTdG9yYWdlLCBkZWxldGVGdXR1cmVUb2RvSW5Mb2NhbFN0b3JhZ2UsIGRlbGV0ZVByb2plY3RGcm9tTG9jYWxTdG9yYWdlLCBkZWxldGVUYXNrSW5Qcm9qZWN0SW5Mb2NhbFN0b3JhZ2UsIGRlbGV0ZVRhc2tzV2hlblByb2plY3REZWxldGVkSW5Mb2NhbFN0b3JhZ2UsIGRlbGV0ZVRvZGF5VG9kb0luTG9jYWxTdG9yYWdlLCBkZWxldGVUb2RvSW5BbGxUb2Rvc0luTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlXCI7XG5cbmV4cG9ydCBjb25zdCB0b2RvID0gKCgpID0+IHtcbiAgICBsZXQgYWxsVG9kb3MgPSBbXTtcbiAgICBsZXQgdG9kYXlUb2RvcyA9IFtdO1xuICAgIGxldCBmdXR1cmVUb2RvcyA9IFtdO1xuICAgIFxuICAgIGNvbnN0IGdldEFsbFRvZG9zID0gKCkgPT4gYWxsVG9kb3M7XG4gICAgY29uc3QgZ2V0VG9kYXlUb2RvcyA9ICgpID0+IHRvZGF5VG9kb3M7XG4gICAgY29uc3QgZ2V0RnV0dXJlVG9kb3MgPSAoKSA9PiBmdXR1cmVUb2RvcztcblxuICAgIGNvbnN0IGNyZWF0ZVRvZG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0ge1xuICAgICAgICAgICAgdGl0bGUsIFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sIFxuICAgICAgICAgICAgZHVlRGF0ZSwgXG4gICAgICAgIH07XG5cbiAgICAgICAgYWRkVG9kYXlUb2RvKHRvZG9JdGVtKTtcbiAgICAgICAgYWRkRnV0dXJlVG9kb3ModG9kb0l0ZW0pO1xuICAgICAgICBhbGxUb2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgYWRkVG9kb1RvQWxsVG9kb3NJbkxvY2FsU3RvcmFnZSh0b2RvSXRlbSk7XG4gICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICBhZGRUYXNrVG9Qcm9qZWN0SW5Mb2NhbFN0b3JhZ2UodG9kb0l0ZW0pO1xuICAgIH1cblxuICAgIC8vZGVsZXRlcyB0b2RvIGluIHRoZSBjdXJyZW50IHByb2plY3RcbiAgICBjb25zdCBkZWxldGVUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS50aXRsZSA9PSB0b2RvSXRlbSkgIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlVGFza0luUHJvamVjdEluTG9jYWxTdG9yYWdlKHRvZG9JdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVRvZG9JbkFsbFRvZG9zQXJyYXkgPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRBbGxUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0QWxsVG9kb3MoKVtpXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgIGdldEFsbFRvZG9zKCkuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlVG9kb0luQWxsVG9kb3NJbkxvY2FsU3RvcmFnZSh0b2RvSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgZWRpdFRvZG8gPSAob2xkVGl0bGUsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbiwgbmV3RHVlRGF0ZSkgPT4ge1xuICAgICAgICBsZXQgdG9kb0l0ZW07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS50aXRsZSA9PSBvbGRUaXRsZSkge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnI7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0udGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmR1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgICAgICAgICAgICAgIHRvZG9JdGVtID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy91cGRhdGVzIHRvZGF5L2Z1dHVyZSB0b2RvIGFycmF5XG4gICAgICAgIGRlbGV0ZVRvZGF5VG9kbyhvbGRUaXRsZSk7XG4gICAgICAgIGRlbGV0ZUZ1dHVyZVRvZG8ob2xkVGl0bGUpO1xuICAgICAgICBhZGRUb2RheVRvZG8odG9kb0l0ZW0pO1xuICAgICAgICBhZGRGdXR1cmVUb2Rvcyh0b2RvSXRlbSk7XG5cbiAgICAgICAgZGVsZXRlVGFza0luUHJvamVjdEluTG9jYWxTdG9yYWdlKG9sZFRpdGxlKTtcbiAgICAgICAgYWRkVGFza1RvUHJvamVjdEluTG9jYWxTdG9yYWdlKHRvZG9JdGVtKTtcbiAgICAgICAgZGVsZXRlVG9kb0luQWxsVG9kb3NBcnJheShvbGRUaXRsZSk7XG4gICAgICAgIGFsbFRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICBhZGRUb2RvVG9BbGxUb2Rvc0luTG9jYWxTdG9yYWdlKHRvZG9JdGVtKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRUb2RheVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IHRvZG9JdGVtRGF0ZSA9IG5ldyBEYXRlKHRvZG9JdGVtLmR1ZURhdGUpO1xuICAgICAgICB0b2RvSXRlbURhdGUuc2V0RGF0ZSh0b2RvSXRlbURhdGUuZ2V0RGF0ZSgpKzEpO1xuXG4gICAgICAgIGlmICh0b2RvSXRlbURhdGUuZ2V0RGF0ZSgpID09IGN1cnJlbnREYXRlLmdldERhdGUoKSBcbiAgICAgICAgJiYgdG9kb0l0ZW1EYXRlLmdldE1vbnRoKCkgPT0gY3VycmVudERhdGUuZ2V0TW9udGgoKSBcbiAgICAgICAgJiYgdG9kb0l0ZW1EYXRlLmdldEZ1bGxZZWFyKCkgPT0gY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICAgICAgdG9kYXlUb2Rvcy5wdXNoKHRvZG9JdGVtKVxuICAgICAgICAgICAgYWRkVG9kb1RvVG9kYXlUb2Rvc0luTG9jYWxTdG9yYWdlKHRvZG9JdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVRvZGF5VG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldFRvZGF5VG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGdldFRvZGF5VG9kb3MoKVtpXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgIGdldFRvZGF5VG9kb3MoKS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICBkZWxldGVUb2RheVRvZG9JbkxvY2FsU3RvcmFnZSh0b2RvSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhZGRGdXR1cmVUb2RvcyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGxldCB0b2RvSXRlbURhdGUgPSBuZXcgRGF0ZSh0b2RvSXRlbS5kdWVEYXRlKTtcbiAgICAgICAgbGV0IGZ1dHVyZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlKTtcblxuICAgICAgICB0b2RvSXRlbURhdGUuc2V0RGF0ZSh0b2RvSXRlbURhdGUuZ2V0RGF0ZSgpKzEpXG4gICAgICAgIGZ1dHVyZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSArIDEpO1xuICAgIFxuICAgICAgICBpZiAodG9kb0l0ZW1EYXRlID49IGZ1dHVyZSkge1xuICAgICAgICAgICAgZnV0dXJlVG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgICAgICBhZGRGdXR1cmVUb2RvSW5Mb2NhbFN0b3JhZ2UodG9kb0l0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlRnV0dXJlVG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEZ1dHVyZVRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChnZXRGdXR1cmVUb2RvcygpW2ldLnRpdGxlID09IHRvZG9JdGVtKSB7XG4gICAgICAgICAgICAgICAgZ2V0RnV0dXJlVG9kb3MoKS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICBkZWxldGVGdXR1cmVUb2RvSW5Mb2NhbFN0b3JhZ2UodG9kb0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZ2V0QWxsVG9kb3MsIGNyZWF0ZVRvZG8sIGRlbGV0ZVRvZG8sIGVkaXRUb2RvLCBkZWxldGVUb2RvSW5BbGxUb2Rvc0FycmF5LCBnZXRUb2RheVRvZG9zLCBkZWxldGVUb2RheVRvZG8sIGdldEZ1dHVyZVRvZG9zLCBkZWxldGVGdXR1cmVUb2RvIH07XG59KSgpO1xuXG5leHBvcnQgY29uc3QgcHJvamVjdCA9ICgoKSA9PiB7XG4gICAgbGV0IHByb2plY3RzID0gW11cbiAgICBsZXQgY3VycmVudFByb2plY3Q7XG4gICAgbGV0IHByZXZpb3VzUHJvamVjdDtcblxuICAgIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0ge1xuICAgICAgICAgICAgcHJvamVjdE5hbWUsIFxuICAgICAgICAgICAgdGFza0FycjogW10sXG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0SXRlbSk7XG4gICAgICAgIGFkZFByb2plY3RUb0xvY2FsU3RvcmFnZShwcm9qZWN0SXRlbSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0Q3VycmVudFByb2plY3QgPSAoKSA9PiBjdXJyZW50UHJvamVjdDtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnByb2plY3ROYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlRGVmYXVsdFByb2plY3QgPSAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3QoJ0hvbWUnKTtcbiAgICAgICAgc2V0Q3VycmVudFByb2plY3QoJ0hvbWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnByb2plY3ROYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlVGFza3NXaGVuUHJvamVjdERlbGV0ZWRJbkxvY2FsU3RvcmFnZShuYW1lKTtcbiAgICAgICAgICAgICAgICBkZWxldGVQcm9qZWN0RnJvbUxvY2FsU3RvcmFnZShuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzLCBnZXRDdXJyZW50UHJvamVjdCwgc2V0Q3VycmVudFByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0LCBkZWxldGVQcm9qZWN0IH1cbn0pKClcbiIsImltcG9ydCB7IHRvZG8sIHByb2plY3QgfSBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgc3RhciBmcm9tICcuLi9pY29ucy9zdGFyLW91dGxpbmUuc3ZnJ1xuaW1wb3J0IGNsb3NlIGZyb20gJy4uL2ljb25zL2Nsb3NlLnBuZydcbmltcG9ydCBvcHRpb24gZnJvbSAnLi4vaWNvbnMvbW9yZS12ZXJ0aWNhbC1hbHQuc3ZnJ1xuXG4vL2F0dGFjaGVzIGV2ZW50TGlzdGVuZXIgZm9yIHdoZW4gdGFza0Zvcm0gaXMgc3VibWl0dGVkXG5leHBvcnQgY29uc3QgbWFrZVRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xuXG4gICAgICAgIHRvZG8uY3JlYXRlVG9kbyh0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUudmFsdWUpO1xuICAgICAgIFxuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcblxuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9LCB7b25jZTogdHJ1ZX0pXG59ICAgXG5cbi8vYXR0YWNoZXMgZXZlbnRMaXN0ZW5lciBmb3Igd2hlbiBwcm9qZWN0Rm9ybSBpcyBzdWJtaXR0ZWRcbmV4cG9ydCBjb25zdCBtYWtlUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICBwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJyk7XG5cbiAgICAgICAgcHJvamVjdC5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG5cbiAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgICAvLyBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdwcm9qZWN0LWZvcm0tYWN0aXZlJyk7XG4gICAgICAvLyAgcHJvamVjdEZvcm0ucmVtb3ZlQXR0cmlidXRlKCdwcm9qZWN0LWZvcm0tYWN0aXZlJylcbiAgICAgICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSwge29uY2U6dHJ1ZX0pXG59XG5cbi8vbWFrZSB0aGlzIHRoZSBkaXNwbGF5ICdBTEwgVE9ET1MnIGZ1bmN0aW9uIHdoZW4gJ0FMTCBUQVNLUycgaXMgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IGRpc3BsYXlBbGxUb2RvcyA9ICgpID0+IHtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldEFsbFRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRBbGxUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0QWxsVG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0QWxsVG9kb3MoKVtpXS5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcblxuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5VG9kYXlUb2RvcyA9ICgpID0+IHtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG8uZ2V0VG9kYXlUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kYXlUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kYXlUb2RvcygpW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5nZXRUb2RheVRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9kYXlUYXNrc0NsaWNrZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXknKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuXG4gICAgdG9kYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkaXNwbGF5VG9kYXlUb2RvcygpO1xuICAgICAgICBwcm9qZWN0TmFtZUhlYWRlci50ZXh0Q29udGVudCA9IFwiVG9kYXkncyBUYXNrc1wiO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pXG59XG5cbi8qXG5pZiBhbGwgdGFza3MgYnV0dG9uIGlzIGNsaWNrZWQsIGRpc3BsYXkgYWxsIG9mIHRoZSB0YXNrc1xuXG50YXNrIGJ1dHRvbiBpcyBjbGlja2VkLCBtYWtlIHRoZSB0YXNrcyBjb250YWluZXIgYmxhbmsgdGhlbiBkaXNwbGF5IGFsbCB0aGUgdGFza3NcbiovXG5leHBvcnQgY29uc3QgYWxsVGFza3NDbGlja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbFRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FsbC10YXNrcycpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaGVhZGVyJyk7XG5cbiAgICBhbGxUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGRpc3BsYXlBbGxUb2RvcygpXG4gICAgICAgIHByb2plY3ROYW1lSGVhZGVyLnRleHRDb250ZW50ID0gJ0FsbCBUYXNrcyc7XG4gICAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBmdXR1cmVUb2Rvc0NsaWNrZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV4dFNldmVuRGF5cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGlzLXdlZWsnKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuXG4gICAgbmV4dFNldmVuRGF5cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZGlzcGxheUZ1dHVyZVRvZG9zKCk7XG4gICAgICAgIHByb2plY3ROYW1lSGVhZGVyLnRleHRDb250ZW50ID0gJ0Z1dHVyZSBUYXNrcyc7XG4gICAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSlcbn1cblxuY29uc3QgZGlzcGxheUZ1dHVyZVRvZG9zID0gKCkgPT4ge1xuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJylcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kby5nZXRGdXR1cmVUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0RnV0dXJlVG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldEZ1dHVyZVRvZG9zKClbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmdldEZ1dHVyZVRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheVByb2plY3RzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1jb250YWluZXInKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgYWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gJyAnO1xuICAgIGxldCBsID0gcHJvamVjdC5nZXRQcm9qZWN0cygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRQcm9qZWN0cygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldFByb2plY3RzKClbaV0ucHJvamVjdE5hbWU7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gY2xvc2U7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgICAgIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1vcHRpb25zJyk7XG4gICAgICAgIC8vb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuICAgICAgICBpZiAocHJvamVjdC5nZXRQcm9qZWN0cygpW2ldID09IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKSkge1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtY2xpY2tlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuICAgIGRlbGV0ZVByb2plY3QoKTtcbiAgICBzaG93VGFza3NJblByb2plY3QoKTtcbn1cbi8vcmVuYW1lIHRoaXMgZnVuY3Rpb24gbGF0ZXJcbi8vd2hlbiBhbnkgb2YgdGhlIHByb2plY3RzIGFyZSBjbGlja2VkXG5leHBvcnQgY29uc3Qgc2hvd1Rhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaGVhZGVyJyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBwcm9qZWN0TmFtZUhlYWRlci50ZXh0Q29udGVudCA9IGAke2UudGFyZ2V0LnRleHRDb250ZW50fWA7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaScpXG4gICAgICAgIHByb2plY3Quc2V0Q3VycmVudFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpO1xuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG4gICAgICAgIGFkZFRhc2suY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfSkpXG59XG5cbi8vaGF2ZSB0byBhZGQgYSBkZWxldGUgdGFza3MgZnVuY3Rpb24gdGhhdCBkZWxldGVzIHRoZSB0YXNrcyBvbiB0aGUgcGFnZSBpZiB0aGUgY3VycmVudCBwcm9qZWN0IGlzIHRoZSBvbmUgdGhhdCBnb3QgZGVsZXRlZFxuLy9iZWNhdXNlIGl0IHN0aWxsIHNob3dzIHRoZSBwcmV2aW91cyB0YXNrcyBldmVuIGlmIHRoYXQgcHJvamVjdCBnb3QgZGVsZXRlZFxuXG5jb25zdCBkaXNwbGF5VGFza3NJblByb2plY3QgPSAoKSA9PiB7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgbGV0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGJ0bkNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBsZXQgaW1wb3J0YW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGxldCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0udGl0bGU7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kdWVEYXRlO1xuICAgICAgICBpbXBvcnRhbnQuc3JjID0gc3RhcjtcbiAgICAgICAgb3B0aW9ucy5zcmMgPSBvcHRpb247XG5cbiAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ0RlbGV0ZSc7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvcHRpb25hbC1idXR0b25zJylcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJylcbiAgICAgICAgaW1wb3J0YW50LmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgICAgICBvcHRpb25zLmNsYXNzTGlzdC5hZGQoJ3Rhc2stb3B0aW9ucycpO1xuICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZWRpdC1idXR0b24nKTtcbiAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGVsZXRlLWJ1dHRvbicpO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgIGJ0bkNvbnQuYXBwZW5kQ2hpbGQoaW1wb3J0YW50KTtcbiAgICAgICAgYnRuQ29udC5hcHBlbmRDaGlsZChvcHRpb25zKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bkNvbnQpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbiAgICB0YXNrT3B0aW9uQ2xpY2tlZCgpO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJUYXNrQ29udGFpbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG4gICAgdGFza3MudGV4dENvbnRlbnQgPSAnICc7XG59XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5RGVmYXVsdFByb2plY3QgPSAoKSA9PiB7XG4gICAgcHJvamVjdC5jcmVhdGVEZWZhdWx0UHJvamVjdCgpO1xuICAgIGRpc3BsYXlQcm9qZWN0cygpO1xufVxuXG4vLzEuIHdoZW4geW91IGRlbGV0ZSBhIHByb2plY3QsIGl0IHN0aWxsIHNob3dzIHRoZSBjdXJyZW50IHRhc2tzIGluIHRoYXQgcHJvamVjdCAoaWYgeW91IGNsaWNrZWQgaXQgYmVmb3JlIGRlbGV0aW5nKVxuLy8yLiBvdGhlciBmdW5jdGlvbmFsaXR5OiB3aGVuIHlvdSBob3ZlciBvdmVyIHByb2plY3QgdGhhdCdzIHdoZW4gdGhlIG9wdGlvbiB0byBkZWxldGUgaXQgc2hvdWxkIHNob3dcbi8vICAgZG8gdGhpcyBieSBhZGRpbmcgYSBtb3VzZW92ZXIgZXZlbnRMaXN0ZW5lciBhbmQgd2hlbiB5b3UgaG92ZXIgb3ZlciB0aGUgcHJvamVjdCwgaXQgc2hvdWxkIHNob3cgdGhlICdYJyB0byBkZWxldGUgaXQsIGFuZCB0aGVuIHJ1biBhIFxuLy8gICBmdW5jdGlvbiB0aGF0IGF0dGFjaGVzIGFuIGV2ZW50TGlzdGVuZXIgdG8gdGhhdCAnWCcgd2hlbiB5b3UgaG92ZXIgb3ZlciBpdFxuXG5leHBvcnQgY29uc3QgZGVsZXRlUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0T3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LW9wdGlvbnMnKTtcblxuICAgIHByb2plY3RPcHRpb25zLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5kZWxldGVQcm9qZWN0KGUudGFyZ2V0LnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudCk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuICAgIH0pKVxufVxuXG4vL3Nob3dzIGhpZGRlbiB0YXNrIGZvcm1cbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgbWFrZVRvZG8oKTtcbiAgICB9KTtcbn1cblxuLy9zaG93cyBoaWRkZW4gcHJvamVjdCBmb3JtXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgLy8gIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ3Byb2plY3QtZm9ybS1hY3RpdmUnKTtcblxuICAgICAgLy8gIHByb2plY3RGb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1mb3JtLWFjdGl2ZScpXG4gICAgICAgIG1ha2VQcm9qZWN0KCk7XG4gICAgfSk7XG59XG5cbi8vc2hvdyBjbG9zZSBidXR0b24gd2hlbiBob3ZlciBvdmVyIHByb2plY3QgbGF0ZXJcbi8qXG5jb25zdCBzaG93Q2xvc2VCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdCcpO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpXG4gICAgICAgIGUudGFyZ2V0Lmxhc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9KSlcbn0qL1xuXG5leHBvcnQgY29uc3QgdGFza09wdGlvbkNsaWNrZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza09wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1vcHRpb25zJylcblxuICAgIHRhc2tPcHRpb25zLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5sYXN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIGRlbGV0ZVRhc2tJblByb2plY3QoKTtcbiAgICAgICAgZWRpdFRhc2tJblByb2plY3QoKTtcbiAgICAgICAgLyogXG4gICAgICAgICAqIFxuICAgICAgICAgKiBpZiBjbGlja2VkIG91dHNpZGUgb2YgdGhlIGVsZW1lbnQsIHRoZW4gbWFrZSBpdCBoaWRkZW4vb3IgZGVsZXRlIGl0XG4gICAgICAgICAqIGRvIHRoaXMgc28gdGhhdCB0aGUgdXNlciBjYW4gZXhpdCB0aGUgb3B0aW9uc0J1dHRvbnMgaWYgdGhleSBjbGljayBzb21ld2hlcmUgZWxzZVxuICAgICAgICAgKiBcbiAgICAgICAgICovXG4gICAgfSkpXG59XG5cbmNvbnN0IGVkaXRUYXNrSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGVkaXRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stZWRpdC1idXR0b24nKTtcbiAgICBjb25zdCBlZGl0VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWZvcm0nKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKVxuXG4gICAgZWRpdEJ1dHRvbnMuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hpJylcbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgZWRpdFRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJyk7XG4gICAgICAgIHRpdGxlLnZhbHVlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMCkudGV4dENvbnRlbnQ7XG4gICAgICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMSkudGV4dENvbnRlbnQ7XG4gICAgICAgIGR1ZURhdGUudmFsdWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgyKS50ZXh0Q29udGVudDtcbiAgICAgICAgbGV0IG9sZFRpdGxlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMCkudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgZWRpdFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3VibWl0dGVkJyk7XG5cbiAgICAgICAgICAgIGxldCBuZXdUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRpdGxlJykudmFsdWU7XG4gICAgICAgICAgICBsZXQgbmV3RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICAgICAgbGV0IG5ld0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJykudmFsdWU7XG5cbiAgICAgICAgICAgIHRvZG8uZWRpdFRvZG8ob2xkVGl0bGUsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbiwgbmV3RHVlRGF0ZSk7XG5cbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZWRpdFRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXG4gICAgfSkpXG59XG5cbmNvbnN0IGRlbGV0ZVRhc2tJblByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stZGVsZXRlLWJ1dHRvbicpO1xuXG4gICAgZGVsZXRlQnV0dG9uLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0YXNrIGRlbGV0ZWQnKVxuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKSlcbiAgICAgICAgdG9kby5kZWxldGVUb2RvKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgdG9kby5kZWxldGVUb2RvSW5BbGxUb2Rvc0FycmF5KGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgdG9kby5kZWxldGVUb2RheVRvZG8oZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICB0b2RvLmRlbGV0ZUZ1dHVyZVRvZG8oZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcbiAgICB9KSlcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyUHJvamVjdEhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1oZWFkZXInKTtcbiAgICBwcm9qZWN0SGVhZGVyLnRleHRDb250ZW50ID0gJyAnO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBldmVudEhhbmRsZXJzIH0gZnJvbSBcIi4vbW9kdWxlcy9jb250cm9sbGVyXCI7XG5ldmVudEhhbmRsZXJzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=