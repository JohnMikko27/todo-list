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
// can create to do item, delete, edit, etc. 

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
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == oldTitle) {
                project.getCurrentProject().taskArr[i].title = newTitle;
                project.getCurrentProject().taskArr[i].description = newDescription;
                project.getCurrentProject().taskArr[i].dueDate = newDueDate;
            }
        }
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

/*
 * Task1: create a delete function that deletes a project and/or tasks
First I need to add the 3 dots as an option to each task and project
When delete is clicked
Delete that project/task from its corresponding array and then call displayProjects/displayTasksInProject again
*/





 /* Task2: create an edit function where you can edit project's name and/or a task
When the edit button is clicked, 
show a container/div/form that contains that task's current name, description and date
will have to add the current name, description and date to that form 
and then when form is submitted
display tasks or project again so that it seems it was edited



 * Task3: create a function that changes the color of the current project so that we know which project the tasks are going into
This will be easy; just use the getCurrentProject and change the color of that
 */

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
       
       // clearTaskContainer();
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.setCurrentProject(e.target.textContent);
       // showCurrentProject(e.target);
        displayTasksInProject();
        addTask.classList.remove('hidden');
    }))
}

const showCurrentProject = (projectItem) => {
    projectItem.classList.add('project-clicked')
}

const removeHover = () => {
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects().length; i++) {
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects()[i].classList.remove('project-clicked');
    }
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
   // editTaskInProject();
    //deleteTaskInProject();
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

const editTaskInProject = () => {
    //for each editTask button clcicked, show the form with its current values then attach form eventListener
    
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7OztBQ2xCcUQ7QUFDckQsa0VBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2hhbmRsZXMgaWYgYSBET00gY2hhbmdpbmcgKHVpLmpzKSBhbmQgYXBwbHlpbmcgdGhlIGNvcnJlY3QgbG9naW4gZnJvbSB0b2RvLmpzXG4vL2ZvciBleGFtcGxlLCBpZiB0aGlzIGJ1dHRvbiBpcyBjbGlja2VkIChhbiBldmVudExpc3RlbmVyKSBpdCB3aWxsIHJ1biB0aGlzIGxvZ2ljIGZyb20gdG9kby5qcyB0aGVuIGNoYW5nZSB0aGUgRE9NIGFjY29yZGluZ2x5IGluIHVpLmpzXG5pbXBvcnQgeyBkaXNwbGF5RGVmYXVsdFByb2plY3QsIGFkZFByb2plY3QsIGFkZFRhc2ssIGFsbFRhc2tzQ2xpY2tlZCwgdG9kYXlUYXNrc0NsaWNrZWQsIGZ1dHVyZVRvZG9zQ2xpY2tlZCwgdGFza09wdGlvbkNsaWNrZWQgfSBmcm9tIFwiLi91aVwiO1xuaW1wb3J0IHsgdG9kbyB9IGZyb20gXCIuL3RvZG9cIjtcblxuXG5cbmV4cG9ydCBjb25zdCBldmVudEhhbmRsZXJzID0gKCkgPT4ge1xuICAgIFxuICAgIGRpc3BsYXlEZWZhdWx0UHJvamVjdCgpO1xuICAgIGFkZFRhc2soKTtcbiAgICBhZGRQcm9qZWN0KCk7XG4gICAgYWxsVGFza3NDbGlja2VkKCk7XG4gICAgdG9kYXlUYXNrc0NsaWNrZWQoKTtcbiAgICBmdXR1cmVUb2Rvc0NsaWNrZWQoKTtcbiAgICBcbn07XG4iLCIvLyBjYW4gY3JlYXRlIHRvIGRvIGl0ZW0sIGRlbGV0ZSwgZWRpdCwgZXRjLiBcblxuZXhwb3J0IGNvbnN0IHRvZG8gPSAoKCkgPT4ge1xuICAgIGxldCBhbGxUb2RvcyA9IFtdO1xuICAgIGxldCB0b2RheVRvZG9zID0gW107XG4gICAgbGV0IGZ1dHVyZVRvZG9zID0gW107XG4gICAgXG4gICAgY29uc3QgZ2V0QWxsVG9kb3MgPSAoKSA9PiBhbGxUb2RvcztcbiAgICBjb25zdCBnZXRUb2RheVRvZG9zID0gKCkgPT4gdG9kYXlUb2RvcztcbiAgICBjb25zdCBnZXRGdXR1cmVUb2RvcyA9ICgpID0+IGZ1dHVyZVRvZG9zO1xuXG4gICAgY29uc3QgY3JlYXRlVG9kbyA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUpID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB7XG4gICAgICAgICAgICB0aXRsZSwgXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiwgXG4gICAgICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgfTtcblxuICAgICAgICBhZGRUb2RheVRvZG8odG9kb0l0ZW0pO1xuICAgICAgICBhZGRGdXR1cmVUb2Rvcyh0b2RvSXRlbSk7XG4gICAgICAgIGFsbFRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5wdXNoKHRvZG9JdGVtKTtcbiAgICB9XG4vL2RlbGV0ZXMgdG9kbyBpbiB0aGUgY3VycmVudCBwcm9qZWN0XG4gICAgY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0udGl0bGUgPT0gdG9kb0l0ZW0pICB7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlVG9kb0luQWxsVG9kb3NBcnJheSA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEFsbFRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChnZXRBbGxUb2RvcygpW2ldLnRpdGxlID09IHRvZG9JdGVtKSB7XG4gICAgICAgICAgICAgICAgZ2V0QWxsVG9kb3MoKS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBlZGl0VG9kbyA9IChvbGRUaXRsZSwgbmV3VGl0bGUsIG5ld0Rlc2NyaXB0aW9uLCBuZXdEdWVEYXRlKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS50aXRsZSA9PSBvbGRUaXRsZSkge1xuICAgICAgICAgICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFkZFRvZGF5VG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGxldCB0b2RvSXRlbURhdGUgPSBuZXcgRGF0ZSh0b2RvSXRlbS5kdWVEYXRlKVxuICAgICAgICBcbiAgICAgICAgaWYgKHRvZG9JdGVtRGF0ZS5nZXREYXRlKCkrMSA9PSBjdXJyZW50RGF0ZS5nZXREYXRlKCkgXG4gICAgICAgICYmIHRvZG9JdGVtRGF0ZS5nZXRNb250aCgpID09IGN1cnJlbnREYXRlLmdldE1vbnRoKCkgXG4gICAgICAgICYmIHRvZG9JdGVtRGF0ZS5nZXRGdWxsWWVhcigpID09IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgICAgIHRvZGF5VG9kb3MucHVzaCh0b2RvSXRlbSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVRvZGF5VG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldFRvZGF5VG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGdldFRvZGF5VG9kb3MoKVtpXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgIGdldFRvZGF5VG9kb3MoKS5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFkZEZ1dHVyZVRvZG9zID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgICAgbGV0IHRvZG9JdGVtRGF0ZSA9IG5ldyBEYXRlKHRvZG9JdGVtLmR1ZURhdGUpXG4gICAgICAgXG4gICAgICAgIGlmICh0b2RvSXRlbURhdGUuZ2V0RnVsbFllYXIoKSA+IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgICAgIGZ1dHVyZVRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRvZG9JdGVtRGF0ZS5nZXRNb250aCgpID4gY3VycmVudERhdGUuZ2V0TW9udGgoKSkge1xuICAgICAgICAgICAgZnV0dXJlVG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9kb0l0ZW1EYXRlLmdldERhdGUoKSsxID4gY3VycmVudERhdGUuZ2V0RGF0ZSgpKSB7XG4gICAgICAgICAgICBmdXR1cmVUb2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVGdXR1cmVUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0RnV0dXJlVG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGdldEZ1dHVyZVRvZG9zKClbaV0udGl0bGUgPT0gdG9kb0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBnZXRGdXR1cmVUb2RvcygpLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIHsgZ2V0QWxsVG9kb3MsIGNyZWF0ZVRvZG8sIGRlbGV0ZVRvZG8sIGVkaXRUb2RvLCBkZWxldGVUb2RvSW5BbGxUb2Rvc0FycmF5LCBnZXRUb2RheVRvZG9zLCBkZWxldGVUb2RheVRvZG8sIGdldEZ1dHVyZVRvZG9zLCBkZWxldGVGdXR1cmVUb2RvIH07XG59KSgpO1xuXG5leHBvcnQgY29uc3QgcHJvamVjdCA9ICgoKSA9PiB7XG4gICAgbGV0IHByb2plY3RzID0gW11cbiAgICBsZXQgY3VycmVudFByb2plY3Q7XG4gICAgbGV0IHByZXZpb3VzUHJvamVjdDtcblxuICAgIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0ge1xuICAgICAgICAgICAgcHJvamVjdE5hbWUsIFxuICAgICAgICAgICAgdGFza0FycjogW10sXG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0SXRlbSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0Q3VycmVudFByb2plY3QgPSAoKSA9PiBjdXJyZW50UHJvamVjdDtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnByb2plY3ROYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlRGVmYXVsdFByb2plY3QgPSAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3QoJ0hvbWUnKTtcbiAgICAgICAgc2V0Q3VycmVudFByb2plY3QoJ0hvbWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnByb2plY3ROYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzLCBnZXRDdXJyZW50UHJvamVjdCwgc2V0Q3VycmVudFByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0LCBkZWxldGVQcm9qZWN0IH1cbn0pKClcblxuLypcbiAqIFRhc2sxOiBjcmVhdGUgYSBkZWxldGUgZnVuY3Rpb24gdGhhdCBkZWxldGVzIGEgcHJvamVjdCBhbmQvb3IgdGFza3NcbkZpcnN0IEkgbmVlZCB0byBhZGQgdGhlIDMgZG90cyBhcyBhbiBvcHRpb24gdG8gZWFjaCB0YXNrIGFuZCBwcm9qZWN0XG5XaGVuIGRlbGV0ZSBpcyBjbGlja2VkXG5EZWxldGUgdGhhdCBwcm9qZWN0L3Rhc2sgZnJvbSBpdHMgY29ycmVzcG9uZGluZyBhcnJheSBhbmQgdGhlbiBjYWxsIGRpc3BsYXlQcm9qZWN0cy9kaXNwbGF5VGFza3NJblByb2plY3QgYWdhaW5cbiovXG5cblxuXG5cblxuIC8qIFRhc2syOiBjcmVhdGUgYW4gZWRpdCBmdW5jdGlvbiB3aGVyZSB5b3UgY2FuIGVkaXQgcHJvamVjdCdzIG5hbWUgYW5kL29yIGEgdGFza1xuV2hlbiB0aGUgZWRpdCBidXR0b24gaXMgY2xpY2tlZCwgXG5zaG93IGEgY29udGFpbmVyL2Rpdi9mb3JtIHRoYXQgY29udGFpbnMgdGhhdCB0YXNrJ3MgY3VycmVudCBuYW1lLCBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxud2lsbCBoYXZlIHRvIGFkZCB0aGUgY3VycmVudCBuYW1lLCBkZXNjcmlwdGlvbiBhbmQgZGF0ZSB0byB0aGF0IGZvcm0gXG5hbmQgdGhlbiB3aGVuIGZvcm0gaXMgc3VibWl0dGVkXG5kaXNwbGF5IHRhc2tzIG9yIHByb2plY3QgYWdhaW4gc28gdGhhdCBpdCBzZWVtcyBpdCB3YXMgZWRpdGVkXG5cblxuXG4gKiBUYXNrMzogY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHRoZSBjb2xvciBvZiB0aGUgY3VycmVudCBwcm9qZWN0IHNvIHRoYXQgd2Uga25vdyB3aGljaCBwcm9qZWN0IHRoZSB0YXNrcyBhcmUgZ29pbmcgaW50b1xuVGhpcyB3aWxsIGJlIGVhc3k7IGp1c3QgdXNlIHRoZSBnZXRDdXJyZW50UHJvamVjdCBhbmQgY2hhbmdlIHRoZSBjb2xvciBvZiB0aGF0XG4gKi8iLCJpbXBvcnQgeyB0b2RvLCBwcm9qZWN0IH0gZnJvbSBcIi4vdG9kb1wiO1xuaW1wb3J0IHN0YXIgZnJvbSAnLi4vaWNvbnMvc3Rhci1vdXRsaW5lLnN2ZydcbmltcG9ydCBjbG9zZSBmcm9tICcuLi9pY29ucy9jbG9zZS5wbmcnXG5pbXBvcnQgb3B0aW9uIGZyb20gJy4uL2ljb25zL21vcmUtdmVydGljYWwtYWx0LnN2ZydcblxuLy9hdHRhY2hlcyBldmVudExpc3RlbmVyIGZvciB3aGVuIHRhc2tGb3JtIGlzIHN1Ym1pdHRlZFxuZXhwb3J0IGNvbnN0IG1ha2VUb2RvID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKTtcblxuICAgICAgICB0b2RvLmNyZWF0ZVRvZG8odGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLnZhbHVlKTtcbiAgICAgICBcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG5cbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSwge29uY2U6IHRydWV9KVxufSAgIFxuXG4vL2F0dGFjaGVzIGV2ZW50TGlzdGVuZXIgZm9yIHdoZW4gcHJvamVjdEZvcm0gaXMgc3VibWl0dGVkXG5leHBvcnQgY29uc3QgbWFrZVByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgcHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuXG4gICAgICAgIHByb2plY3QuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuXG4gICAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0sIHtvbmNlOnRydWV9KVxufVxuXG4vL21ha2UgdGhpcyB0aGUgZGlzcGxheSAnQUxMIFRPRE9TJyBmdW5jdGlvbiB3aGVuICdBTEwgVEFTS1MnIGlzIGNsaWNrZWRcbmV4cG9ydCBjb25zdCBkaXNwbGF5QWxsVG9kb3MgPSAoKSA9PiB7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kby5nZXRBbGxUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0QWxsVG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldEFsbFRvZG9zKClbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmdldEFsbFRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheVRvZGF5VG9kb3MgPSAoKSA9PiB7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldFRvZGF5VG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZGF5VG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZGF5VG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kYXlUb2RvcygpW2ldLmR1ZURhdGU7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKVxuXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvZGF5VGFza3NDbGlja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5Jyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1oZWFkZXInKTtcblxuICAgIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZGlzcGxheVRvZGF5VG9kb3MoKTtcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSBcIlRvZGF5J3MgVGFza3NcIjtcbiAgICAgICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KVxufVxuXG4vKlxuaWYgYWxsIHRhc2tzIGJ1dHRvbiBpcyBjbGlja2VkLCBkaXNwbGF5IGFsbCBvZiB0aGUgdGFza3NcblxudGFzayBidXR0b24gaXMgY2xpY2tlZCwgbWFrZSB0aGUgdGFza3MgY29udGFpbmVyIGJsYW5rIHRoZW4gZGlzcGxheSBhbGwgdGhlIHRhc2tzXG4qL1xuZXhwb3J0IGNvbnN0IGFsbFRhc2tzQ2xpY2tlZCA9ICgpID0+IHtcbiAgICBjb25zdCBhbGxUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwtdGFza3MnKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuXG4gICAgYWxsVGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkaXNwbGF5QWxsVG9kb3MoKVxuICAgICAgICBwcm9qZWN0TmFtZUhlYWRlci50ZXh0Q29udGVudCA9ICdBbGwgVGFza3MnO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZnV0dXJlVG9kb3NDbGlja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IG5leHRTZXZlbkRheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrJyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1oZWFkZXInKTtcblxuICAgIG5leHRTZXZlbkRheXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRpc3BsYXlGdXR1cmVUb2RvcygpO1xuICAgICAgICBwcm9qZWN0TmFtZUhlYWRlci50ZXh0Q29udGVudCA9ICdGdXR1cmUgVGFza3MnO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pXG59XG5cbmNvbnN0IGRpc3BsYXlGdXR1cmVUb2RvcyA9ICgpID0+IHtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG8uZ2V0RnV0dXJlVG9kb3MoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLmdldEZ1dHVyZVRvZG9zKClbaV0udGl0bGU7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5nZXRGdXR1cmVUb2RvcygpW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5nZXRGdXR1cmVUb2RvcygpW2ldLmR1ZURhdGU7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKVxuXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtY29udGFpbmVyJyk7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGFkZFRhc2suY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgcHJvamVjdENvbnRhaW5lci50ZXh0Q29udGVudCA9ICcgJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRQcm9qZWN0cygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldFByb2plY3RzKClbaV0ucHJvamVjdE5hbWU7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gY2xvc2U7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgICAgIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1vcHRpb25zJyk7XG4gICAgICAgIC8vb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQob3B0aW9ucyk7XG4gICAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG4gICAgZGVsZXRlUHJvamVjdCgpO1xuICAgIHNob3dUYXNrc0luUHJvamVjdCgpO1xuICAgIFxufVxuLy9yZW5hbWUgdGhpcyBmdW5jdGlvbiBsYXRlclxuLy93aGVuIGFueSBvZiB0aGUgcHJvamVjdHMgYXJlIGNsaWNrZWRcbmV4cG9ydCBjb25zdCBzaG93VGFza3NJblByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdCcpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1oZWFkZXInKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHByb2plY3ROYW1lSGVhZGVyLnRleHRDb250ZW50ID0gYCR7ZS50YXJnZXQudGV4dENvbnRlbnR9YDtcbiAgICAgICBcbiAgICAgICAvLyBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICAgICAgcHJvamVjdC5zZXRDdXJyZW50UHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgICAgLy8gc2hvd0N1cnJlbnRQcm9qZWN0KGUudGFyZ2V0KTtcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG4gICAgICAgIGFkZFRhc2suY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfSkpXG59XG5cbmNvbnN0IHNob3dDdXJyZW50UHJvamVjdCA9IChwcm9qZWN0SXRlbSkgPT4ge1xuICAgIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtY2xpY2tlZCcpXG59XG5cbmNvbnN0IHJlbW92ZUhvdmVyID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRQcm9qZWN0cygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb2plY3QuZ2V0UHJvamVjdHMoKVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdwcm9qZWN0LWNsaWNrZWQnKTtcbiAgICB9XG59XG5cbi8vaGF2ZSB0byBhZGQgYSBkZWxldGUgdGFza3MgZnVuY3Rpb24gdGhhdCBkZWxldGVzIHRoZSB0YXNrcyBvbiB0aGUgcGFnZSBpZiB0aGUgY3VycmVudCBwcm9qZWN0IGlzIHRoZSBvbmUgdGhhdCBnb3QgZGVsZXRlZFxuLy9iZWNhdXNlIGl0IHN0aWxsIHNob3dzIHRoZSBwcmV2aW91cyB0YXNrcyBldmVuIGlmIHRoYXQgcHJvamVjdCBnb3QgZGVsZXRlZFxuY29uc3QgZGlzcGxheVRhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBidG5Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbGV0IGltcG9ydGFudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZHVlRGF0ZTtcbiAgICAgICAgaW1wb3J0YW50LnNyYyA9IHN0YXI7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gb3B0aW9uO1xuXG4gICAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3B0aW9uYWwtYnV0dG9ucycpXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpXG4gICAgICAgIGltcG9ydGFudC5jbGFzc0xpc3QuYWRkKCdpbXBvcnRhbnQnKTtcbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCd0YXNrLW9wdGlvbnMnKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWVkaXQtYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlbGV0ZS1idXR0b24nKTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICBidG5Db250LmFwcGVuZENoaWxkKGltcG9ydGFudCk7XG4gICAgICAgIGJ0bkNvbnQuYXBwZW5kQ2hpbGQob3B0aW9ucyk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChidG5Db250KTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG4gICAgdGFza09wdGlvbkNsaWNrZWQoKTtcbiAgIC8vIGVkaXRUYXNrSW5Qcm9qZWN0KCk7XG4gICAgLy9kZWxldGVUYXNrSW5Qcm9qZWN0KCk7XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhclRhc2tDb250YWluZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKTtcbiAgICB0YXNrcy50ZXh0Q29udGVudCA9ICcgJztcbn1cblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlEZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgICBwcm9qZWN0LmNyZWF0ZURlZmF1bHRQcm9qZWN0KCk7XG4gICAgZGlzcGxheVByb2plY3RzKCk7XG59XG5cbi8vMS4gd2hlbiB5b3UgZGVsZXRlIGEgcHJvamVjdCwgaXQgc3RpbGwgc2hvd3MgdGhlIGN1cnJlbnQgdGFza3MgaW4gdGhhdCBwcm9qZWN0IChpZiB5b3UgY2xpY2tlZCBpdCBiZWZvcmUgZGVsZXRpbmcpXG4vLzIuIG90aGVyIGZ1bmN0aW9uYWxpdHk6IHdoZW4geW91IGhvdmVyIG92ZXIgcHJvamVjdCB0aGF0J3Mgd2hlbiB0aGUgb3B0aW9uIHRvIGRlbGV0ZSBpdCBzaG91bGQgc2hvd1xuLy8gICBkbyB0aGlzIGJ5IGFkZGluZyBhIG1vdXNlb3ZlciBldmVudExpc3RlbmVyIGFuZCB3aGVuIHlvdSBob3ZlciBvdmVyIHRoZSBwcm9qZWN0LCBpdCBzaG91bGQgc2hvdyB0aGUgJ1gnIHRvIGRlbGV0ZSBpdCwgYW5kIHRoZW4gcnVuIGEgXG4vLyAgIGZ1bmN0aW9uIHRoYXQgYXR0YWNoZXMgYW4gZXZlbnRMaXN0ZW5lciB0byB0aGF0ICdYJyB3aGVuIHlvdSBob3ZlciBvdmVyIGl0XG5cbmV4cG9ydCBjb25zdCBkZWxldGVQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3Qtb3B0aW9ucycpO1xuXG4gICAgcHJvamVjdE9wdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZVByb2plY3QoZS50YXJnZXQucHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG4gICAgfSkpXG59XG5cbi8vc2hvd3MgaGlkZGVuIHRhc2sgZm9ybVxuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBtYWtlVG9kbygpO1xuICAgIH0pO1xufVxuXG4vL3Nob3dzIGhpZGRlbiBwcm9qZWN0IGZvcm1cbmV4cG9ydCBjb25zdCBhZGRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnV0dG9uJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIG1ha2VQcm9qZWN0KCk7XG4gICAgfSk7XG59XG5cbi8vc2hvdyBjbG9zZSBidXR0b24gd2hlbiBob3ZlciBvdmVyIHByb2plY3QgbGF0ZXJcbi8qXG5jb25zdCBzaG93Q2xvc2VCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdCcpO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpXG4gICAgICAgIGUudGFyZ2V0Lmxhc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9KSlcbn0qL1xuXG5cbmV4cG9ydCBjb25zdCB0YXNrT3B0aW9uQ2xpY2tlZCA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrT3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLW9wdGlvbnMnKVxuXG4gICAgdGFza09wdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmxhc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgZGVsZXRlVGFza0luUHJvamVjdCgpO1xuICAgICAgICBlZGl0VGFza0luUHJvamVjdCgpO1xuICAgICAgICAvKiBcbiAgICAgICAgICogXG4gICAgICAgICAqIGlmIGNsaWNrZWQgb3V0c2lkZSBvZiB0aGUgZWxlbWVudCwgdGhlbiBtYWtlIGl0IGhpZGRlbi9vciBkZWxldGUgaXRcbiAgICAgICAgICogZG8gdGhpcyBzbyB0aGF0IHRoZSB1c2VyIGNhbiBleGl0IHRoZSBvcHRpb25zQnV0dG9ucyBpZiB0aGV5IGNsaWNrIHNvbWV3aGVyZSBlbHNlXG4gICAgICAgICAqIFxuICAgICAgICAgKi9cbiAgICB9KSlcbn1cblxuXG4vKlxuICogV2hlbiBlYWNoIHRhc2stb3B0aW9ucyBpcyBjbGlja2VkLCBzaG93IGFuIGVkaXQvZGVsZXRlIGJ1dHRvbiB3aGljaCBhbGxvd3MgeW91IHRvIGVpdGhlciBlZGl0IHRoZSB0YXNrIG9yIGRlbGV0ZSB0aGUgdGFza1xuICogRWRpdDogXG4gKiBXaGVuIGVkaXQgYnV0dG9uIGlzIGNsaWNrZWQsIFxuICogc2hvdyBhIHBvcCB1cCBmb3JtIHdpdGggdGhlIGlucHV0cyAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSBiZWluZyB0aGUgdmFsdWUgb2YgdGhhdCBjdXJyZW50IHRhc2tcbiAqIG1ha2UgdGhpcyBpbnRvIGEgZm9ybSB0aGF0IHNob3dzIG92ZXIgZXZlcnl0aGluZyBlbHNlXG4gKiB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZCwgY2hhbmdlIHRoYXQgdGFzaydzIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgZXRjLiBcbiAqIERvIHRoaXMgXl5eIGJ5IGdvaW5nIHRocm91Z2ggdGhlIGN1cnJlbnRQcm9qZWN0J3MgdGFza0FyciBhbmQgdGhlbiBjaGFuZ2UgdGhlIGNvcnJlc3BvbmRpbmcgdGFzaydzIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZVxuICogdGhlbiBkaXNwbGF5VGFza3NJblByb2plY3QgYWdhaW5cbiAqL1xuXG5cbi8vZWRpdGluZyBhIHRhc2sgb25seSB3b3JrcyBvbmNlLCBhZnRlciB1IGVkaXQgYSB0YXNrIG9uY2UsIGl0IGJyZWFrc1xuXG5jb25zdCBlZGl0VGFza0luUHJvamVjdCA9ICgpID0+IHtcbiAgICAvL2ZvciBlYWNoIGVkaXRUYXNrIGJ1dHRvbiBjbGNpY2tlZCwgc2hvdyB0aGUgZm9ybSB3aXRoIGl0cyBjdXJyZW50IHZhbHVlcyB0aGVuIGF0dGFjaCBmb3JtIGV2ZW50TGlzdGVuZXJcbiAgICBcbiAgICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLWVkaXQtYnV0dG9uJyk7XG4gICAgY29uc3QgZWRpdFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1mb3JtJyk7XG5cbiAgICBlZGl0QnV0dG9ucy5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnaGknKVxuICAgICAgICBcbiAgICAgICAgZWRpdFRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJyk7XG5cbiAgICAgICAgdGl0bGUudmFsdWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICAgICAgZGVzY3JpcHRpb24udmFsdWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgxKS50ZXh0Q29udGVudDtcbiAgICAgICAgZHVlRGF0ZS52YWx1ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDIpLnRleHRDb250ZW50O1xuXG4gICAgICAgIGxldCBvbGRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDApLnRleHRDb250ZW50O1xuXG4gICAgICAgIGVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdHRlZCcpO1xuXG4gICAgICAgICAgICBsZXQgbmV3VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgbGV0IG5ld0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGxldCBuZXdEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGF0ZScpLnZhbHVlO1xuXG4gICAgICAgICAgICB0b2RvLmVkaXRUb2RvKG9sZFRpdGxlLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24sIG5ld0R1ZURhdGUpO1xuXG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXG4gICAgfSkpXG5cbn1cblxuXG5cblxuXG5jb25zdCBkZWxldGVUYXNrSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLWRlbGV0ZS1idXR0b24nKTtcblxuICAgIGRlbGV0ZUJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndGFzayBkZWxldGVkJylcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgIHRvZG8uZGVsZXRlVG9kbyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIHRvZG8uZGVsZXRlVG9kb0luQWxsVG9kb3NBcnJheShlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIHRvZG8uZGVsZXRlVG9kYXlUb2RvKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgdG9kby5kZWxldGVGdXR1cmVUb2RvKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG4gICAgfSkpXG59XG5cblxuXG5cbi8qXG5lZGl0aW5nIGEgdGFzayBvbmNlIHdvcmtzLCBidXQgYWZ0ZXIgY29ycmVjdGx5IGVkaXRpbmcsIHdoZW4gaSB0cnkgdG8gZWRpdCBhIHNlY29uZCB0aW1lIFxuLSBldmVuIGlmIHRoZSB0YXNrIGlzIGluIGEgZGlmZmVyZW50IHByb2plY3QtaXQgYnJlYWtzIFxuXG5JdCdzIGJlY2F1c2UgdGhlIGV2ZW50TGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm0gcnVuIHR3aWNlIG9uIHRoZSBzZWNvbmQgdGltZSBpIHRyeSB0byBzdWJtaXQgYSBmb3JtIChzZWNvbmQgdGltZSBlZGl0aW5nKVxuc28gaXQgbWFrZXMgdGhlIHRhc2sgYmxhbmsgYmVjYXVzZSBpdCBydW5zIHR3aWNlXG5cbk1heWJlIGxlYXJuIGFib3V0IGJ1YmJsaW5nIGFuZCBwcm9wYWdhdGlvbiB0byBob3BlZnVsbHkgZml4IHRoaXNcbiovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiLi9tb2R1bGVzL2NvbnRyb2xsZXJcIjtcbmV2ZW50SGFuZGxlcnMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==