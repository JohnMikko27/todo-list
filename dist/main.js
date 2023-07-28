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
        let todoItem;
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == oldTitle) {
                project.getCurrentProject().taskArr[i].title = newTitle;
                project.getCurrentProject().taskArr[i].description = newDescription;
                project.getCurrentProject().taskArr[i].dueDate = newDueDate;
                todoItem = project.getCurrentProject().taskArr[i];
            }
        }
        deleteTodayTodo(todoItem.title);
        deleteFutureTodo(todoItem.title);
        addTodayTodo(todoItem);
        addFutureTodos(todoItem);


    }

    //maybe after editing the task, delete it from todayTodos/futureTodos then run addTodayTodo/addFutureTodo so that it gets added to the 
//correct one after editing it
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






//edit function works now but after editing them, the tasks are still in the futureTodos/Today todos even if their dates have changed
//it is because I haven't taken them out or checked if i should take them out of those corresponding arrays
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNsQnFEO0FBQ3JELGtFQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oYW5kbGVzIGlmIGEgRE9NIGNoYW5naW5nICh1aS5qcykgYW5kIGFwcGx5aW5nIHRoZSBjb3JyZWN0IGxvZ2luIGZyb20gdG9kby5qc1xuLy9mb3IgZXhhbXBsZSwgaWYgdGhpcyBidXR0b24gaXMgY2xpY2tlZCAoYW4gZXZlbnRMaXN0ZW5lcikgaXQgd2lsbCBydW4gdGhpcyBsb2dpYyBmcm9tIHRvZG8uanMgdGhlbiBjaGFuZ2UgdGhlIERPTSBhY2NvcmRpbmdseSBpbiB1aS5qc1xuaW1wb3J0IHsgZGlzcGxheURlZmF1bHRQcm9qZWN0LCBhZGRQcm9qZWN0LCBhZGRUYXNrLCBhbGxUYXNrc0NsaWNrZWQsIHRvZGF5VGFza3NDbGlja2VkLCBmdXR1cmVUb2Rvc0NsaWNrZWQsIHRhc2tPcHRpb25DbGlja2VkIH0gZnJvbSBcIi4vdWlcIjtcbmltcG9ydCB7IHRvZG8gfSBmcm9tIFwiLi90b2RvXCI7XG5cblxuXG5leHBvcnQgY29uc3QgZXZlbnRIYW5kbGVycyA9ICgpID0+IHtcbiAgICBcbiAgICBkaXNwbGF5RGVmYXVsdFByb2plY3QoKTtcbiAgICBhZGRUYXNrKCk7XG4gICAgYWRkUHJvamVjdCgpO1xuICAgIGFsbFRhc2tzQ2xpY2tlZCgpO1xuICAgIHRvZGF5VGFza3NDbGlja2VkKCk7XG4gICAgZnV0dXJlVG9kb3NDbGlja2VkKCk7XG4gICAgXG59O1xuIiwiLy8gY2FuIGNyZWF0ZSB0byBkbyBpdGVtLCBkZWxldGUsIGVkaXQsIGV0Yy4gXG5cbmV4cG9ydCBjb25zdCB0b2RvID0gKCgpID0+IHtcbiAgICBsZXQgYWxsVG9kb3MgPSBbXTtcbiAgICBsZXQgdG9kYXlUb2RvcyA9IFtdO1xuICAgIGxldCBmdXR1cmVUb2RvcyA9IFtdO1xuICAgIFxuICAgIGNvbnN0IGdldEFsbFRvZG9zID0gKCkgPT4gYWxsVG9kb3M7XG4gICAgY29uc3QgZ2V0VG9kYXlUb2RvcyA9ICgpID0+IHRvZGF5VG9kb3M7XG4gICAgY29uc3QgZ2V0RnV0dXJlVG9kb3MgPSAoKSA9PiBmdXR1cmVUb2RvcztcblxuICAgIGNvbnN0IGNyZWF0ZVRvZG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0ge1xuICAgICAgICAgICAgdGl0bGUsIFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sIFxuICAgICAgICAgICAgZHVlRGF0ZSwgXG4gICAgICAgIH07XG5cbiAgICAgICAgYWRkVG9kYXlUb2RvKHRvZG9JdGVtKTtcbiAgICAgICAgYWRkRnV0dXJlVG9kb3ModG9kb0l0ZW0pO1xuICAgICAgICBhbGxUb2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIucHVzaCh0b2RvSXRlbSk7XG4gICAgfVxuLy9kZWxldGVzIHRvZG8gaW4gdGhlIGN1cnJlbnQgcHJvamVjdFxuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlID09IHRvZG9JdGVtKSAge1xuICAgICAgICAgICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVRvZG9JbkFsbFRvZG9zQXJyYXkgPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRBbGxUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0QWxsVG9kb3MoKVtpXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgIGdldEFsbFRvZG9zKCkuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgZWRpdFRvZG8gPSAob2xkVGl0bGUsIG5ld1RpdGxlLCBuZXdEZXNjcmlwdGlvbiwgbmV3RHVlRGF0ZSkgPT4ge1xuICAgICAgICBsZXQgdG9kb0l0ZW07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS50aXRsZSA9PSBvbGRUaXRsZSkge1xuICAgICAgICAgICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICAgICAgICAgICAgICB0b2RvSXRlbSA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZVRvZGF5VG9kbyh0b2RvSXRlbS50aXRsZSk7XG4gICAgICAgIGRlbGV0ZUZ1dHVyZVRvZG8odG9kb0l0ZW0udGl0bGUpO1xuICAgICAgICBhZGRUb2RheVRvZG8odG9kb0l0ZW0pO1xuICAgICAgICBhZGRGdXR1cmVUb2Rvcyh0b2RvSXRlbSk7XG5cblxuICAgIH1cblxuICAgIC8vbWF5YmUgYWZ0ZXIgZWRpdGluZyB0aGUgdGFzaywgZGVsZXRlIGl0IGZyb20gdG9kYXlUb2Rvcy9mdXR1cmVUb2RvcyB0aGVuIHJ1biBhZGRUb2RheVRvZG8vYWRkRnV0dXJlVG9kbyBzbyB0aGF0IGl0IGdldHMgYWRkZWQgdG8gdGhlIFxuLy9jb3JyZWN0IG9uZSBhZnRlciBlZGl0aW5nIGl0XG4gICAgY29uc3QgYWRkVG9kYXlUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgICAgbGV0IHRvZG9JdGVtRGF0ZSA9IG5ldyBEYXRlKHRvZG9JdGVtLmR1ZURhdGUpXG4gICAgICAgIFxuICAgICAgICBpZiAodG9kb0l0ZW1EYXRlLmdldERhdGUoKSsxID09IGN1cnJlbnREYXRlLmdldERhdGUoKSBcbiAgICAgICAgJiYgdG9kb0l0ZW1EYXRlLmdldE1vbnRoKCkgPT0gY3VycmVudERhdGUuZ2V0TW9udGgoKSBcbiAgICAgICAgJiYgdG9kb0l0ZW1EYXRlLmdldEZ1bGxZZWFyKCkgPT0gY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICAgICAgdG9kYXlUb2Rvcy5wdXNoKHRvZG9JdGVtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlVG9kYXlUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0VG9kYXlUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0VG9kYXlUb2RvcygpW2ldLnRpdGxlID09IHRvZG9JdGVtKSB7XG4gICAgICAgICAgICAgICAgZ2V0VG9kYXlUb2RvcygpLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWRkRnV0dXJlVG9kb3MgPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxuICAgICAgICBsZXQgdG9kb0l0ZW1EYXRlID0gbmV3IERhdGUodG9kb0l0ZW0uZHVlRGF0ZSlcbiAgICAgICBcbiAgICAgICAgaWYgKHRvZG9JdGVtRGF0ZS5nZXRGdWxsWWVhcigpID4gY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICAgICAgZnV0dXJlVG9kb3MucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9kb0l0ZW1EYXRlLmdldE1vbnRoKCkgPiBjdXJyZW50RGF0ZS5nZXRNb250aCgpKSB7XG4gICAgICAgICAgICBmdXR1cmVUb2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgfSBlbHNlIGlmICh0b2RvSXRlbURhdGUuZ2V0RGF0ZSgpKzEgPiBjdXJyZW50RGF0ZS5nZXREYXRlKCkpIHtcbiAgICAgICAgICAgIGZ1dHVyZVRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZUZ1dHVyZVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRGdXR1cmVUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0RnV0dXJlVG9kb3MoKVtpXS50aXRsZSA9PSB0b2RvSXRlbSkge1xuICAgICAgICAgICAgICAgIGdldEZ1dHVyZVRvZG9zKCkuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICByZXR1cm4geyBnZXRBbGxUb2RvcywgY3JlYXRlVG9kbywgZGVsZXRlVG9kbywgZWRpdFRvZG8sIGRlbGV0ZVRvZG9JbkFsbFRvZG9zQXJyYXksIGdldFRvZGF5VG9kb3MsIGRlbGV0ZVRvZGF5VG9kbywgZ2V0RnV0dXJlVG9kb3MsIGRlbGV0ZUZ1dHVyZVRvZG8gfTtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0ID0gKCgpID0+IHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXVxuICAgIGxldCBjdXJyZW50UHJvamVjdDtcbiAgICBsZXQgcHJldmlvdXNQcm9qZWN0O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEl0ZW0gPSB7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZSwgXG4gICAgICAgICAgICB0YXNrQXJyOiBbXSxcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3RJdGVtKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDdXJyZW50UHJvamVjdCA9ICgpID0+IGN1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgY3JlYXRlUHJvamVjdCgnSG9tZScpO1xuICAgICAgICBzZXRDdXJyZW50UHJvamVjdCgnSG9tZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHByb2plY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlUHJvamVjdCwgZ2V0UHJvamVjdHMsIGdldEN1cnJlbnRQcm9qZWN0LCBzZXRDdXJyZW50UHJvamVjdCwgY3JlYXRlRGVmYXVsdFByb2plY3QsIGRlbGV0ZVByb2plY3QgfVxufSkoKVxuXG4vKlxuICogVGFzazE6IGNyZWF0ZSBhIGRlbGV0ZSBmdW5jdGlvbiB0aGF0IGRlbGV0ZXMgYSBwcm9qZWN0IGFuZC9vciB0YXNrc1xuRmlyc3QgSSBuZWVkIHRvIGFkZCB0aGUgMyBkb3RzIGFzIGFuIG9wdGlvbiB0byBlYWNoIHRhc2sgYW5kIHByb2plY3RcbldoZW4gZGVsZXRlIGlzIGNsaWNrZWRcbkRlbGV0ZSB0aGF0IHByb2plY3QvdGFzayBmcm9tIGl0cyBjb3JyZXNwb25kaW5nIGFycmF5IGFuZCB0aGVuIGNhbGwgZGlzcGxheVByb2plY3RzL2Rpc3BsYXlUYXNrc0luUHJvamVjdCBhZ2FpblxuKi9cblxuXG5cblxuXG4gLyogVGFzazI6IGNyZWF0ZSBhbiBlZGl0IGZ1bmN0aW9uIHdoZXJlIHlvdSBjYW4gZWRpdCBwcm9qZWN0J3MgbmFtZSBhbmQvb3IgYSB0YXNrXG5XaGVuIHRoZSBlZGl0IGJ1dHRvbiBpcyBjbGlja2VkLCBcbnNob3cgYSBjb250YWluZXIvZGl2L2Zvcm0gdGhhdCBjb250YWlucyB0aGF0IHRhc2sncyBjdXJyZW50IG5hbWUsIGRlc2NyaXB0aW9uIGFuZCBkYXRlXG53aWxsIGhhdmUgdG8gYWRkIHRoZSBjdXJyZW50IG5hbWUsIGRlc2NyaXB0aW9uIGFuZCBkYXRlIHRvIHRoYXQgZm9ybSBcbmFuZCB0aGVuIHdoZW4gZm9ybSBpcyBzdWJtaXR0ZWRcbmRpc3BsYXkgdGFza3Mgb3IgcHJvamVjdCBhZ2FpbiBzbyB0aGF0IGl0IHNlZW1zIGl0IHdhcyBlZGl0ZWRcblxuXG5cbiAqIFRhc2szOiBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdGhlIGNvbG9yIG9mIHRoZSBjdXJyZW50IHByb2plY3Qgc28gdGhhdCB3ZSBrbm93IHdoaWNoIHByb2plY3QgdGhlIHRhc2tzIGFyZSBnb2luZyBpbnRvXG5UaGlzIHdpbGwgYmUgZWFzeTsganVzdCB1c2UgdGhlIGdldEN1cnJlbnRQcm9qZWN0IGFuZCBjaGFuZ2UgdGhlIGNvbG9yIG9mIHRoYXRcbiAqLyIsImltcG9ydCB7IHRvZG8sIHByb2plY3QgfSBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgc3RhciBmcm9tICcuLi9pY29ucy9zdGFyLW91dGxpbmUuc3ZnJ1xuaW1wb3J0IGNsb3NlIGZyb20gJy4uL2ljb25zL2Nsb3NlLnBuZydcbmltcG9ydCBvcHRpb24gZnJvbSAnLi4vaWNvbnMvbW9yZS12ZXJ0aWNhbC1hbHQuc3ZnJ1xuXG4vL2F0dGFjaGVzIGV2ZW50TGlzdGVuZXIgZm9yIHdoZW4gdGFza0Zvcm0gaXMgc3VibWl0dGVkXG5leHBvcnQgY29uc3QgbWFrZVRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xuXG4gICAgICAgIHRvZG8uY3JlYXRlVG9kbyh0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUudmFsdWUpO1xuICAgICAgIFxuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcblxuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9LCB7b25jZTogdHJ1ZX0pXG59ICAgXG5cbi8vYXR0YWNoZXMgZXZlbnRMaXN0ZW5lciBmb3Igd2hlbiBwcm9qZWN0Rm9ybSBpcyBzdWJtaXR0ZWRcbmV4cG9ydCBjb25zdCBtYWtlUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICBwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJyk7XG5cbiAgICAgICAgcHJvamVjdC5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG5cbiAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSwge29uY2U6dHJ1ZX0pXG59XG5cbi8vbWFrZSB0aGlzIHRoZSBkaXNwbGF5ICdBTEwgVE9ET1MnIGZ1bmN0aW9uIHdoZW4gJ0FMTCBUQVNLUycgaXMgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IGRpc3BsYXlBbGxUb2RvcyA9ICgpID0+IHtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldEFsbFRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRBbGxUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0QWxsVG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0QWxsVG9kb3MoKVtpXS5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcblxuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5VG9kYXlUb2RvcyA9ICgpID0+IHtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG8uZ2V0VG9kYXlUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kYXlUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kYXlUb2RvcygpW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5nZXRUb2RheVRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9kYXlUYXNrc0NsaWNrZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXknKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuXG4gICAgdG9kYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkaXNwbGF5VG9kYXlUb2RvcygpO1xuICAgICAgICBwcm9qZWN0TmFtZUhlYWRlci50ZXh0Q29udGVudCA9IFwiVG9kYXkncyBUYXNrc1wiO1xuICAgICAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pXG59XG5cbi8qXG5pZiBhbGwgdGFza3MgYnV0dG9uIGlzIGNsaWNrZWQsIGRpc3BsYXkgYWxsIG9mIHRoZSB0YXNrc1xuXG50YXNrIGJ1dHRvbiBpcyBjbGlja2VkLCBtYWtlIHRoZSB0YXNrcyBjb250YWluZXIgYmxhbmsgdGhlbiBkaXNwbGF5IGFsbCB0aGUgdGFza3NcbiovXG5leHBvcnQgY29uc3QgYWxsVGFza3NDbGlja2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbFRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FsbC10YXNrcycpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaGVhZGVyJyk7XG5cbiAgICBhbGxUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGRpc3BsYXlBbGxUb2RvcygpXG4gICAgICAgIHByb2plY3ROYW1lSGVhZGVyLnRleHRDb250ZW50ID0gJ0FsbCBUYXNrcyc7XG4gICAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBmdXR1cmVUb2Rvc0NsaWNrZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV4dFNldmVuRGF5cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGlzLXdlZWsnKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuXG4gICAgbmV4dFNldmVuRGF5cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZGlzcGxheUZ1dHVyZVRvZG9zKCk7XG4gICAgICAgIHByb2plY3ROYW1lSGVhZGVyLnRleHRDb250ZW50ID0gJ0Z1dHVyZSBUYXNrcyc7XG4gICAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSlcbn1cblxuY29uc3QgZGlzcGxheUZ1dHVyZVRvZG9zID0gKCkgPT4ge1xuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJylcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kby5nZXRGdXR1cmVUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0RnV0dXJlVG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldEZ1dHVyZVRvZG9zKClbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmdldEZ1dHVyZVRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheVByb2plY3RzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1jb250YWluZXInKTtcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgYWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gJyAnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldFByb2plY3RzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICBcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0UHJvamVjdHMoKVtpXS5wcm9qZWN0TmFtZTtcbiAgICAgICAgb3B0aW9ucy5zcmMgPSBjbG9zZTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW9wdGlvbnMnKTtcbiAgICAgICAgLy9vcHRpb25zLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25zKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgICBkZWxldGVQcm9qZWN0KCk7XG4gICAgc2hvd1Rhc2tzSW5Qcm9qZWN0KCk7XG4gICAgXG59XG4vL3JlbmFtZSB0aGlzIGZ1bmN0aW9uIGxhdGVyXG4vL3doZW4gYW55IG9mIHRoZSBwcm9qZWN0cyBhcmUgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IHNob3dUYXNrc0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcblxuICAgIHByb2plY3RzLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSBgJHtlLnRhcmdldC50ZXh0Q29udGVudH1gO1xuICAgICAgIFxuICAgICAgIC8vIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgICAgICBwcm9qZWN0LnNldEN1cnJlbnRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KTtcbiAgICAgICAvLyBzaG93Q3VycmVudFByb2plY3QoZS50YXJnZXQpO1xuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcbiAgICAgICAgYWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9KSlcbn1cblxuY29uc3Qgc2hvd0N1cnJlbnRQcm9qZWN0ID0gKHByb2plY3RJdGVtKSA9PiB7XG4gICAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1jbGlja2VkJylcbn1cblxuY29uc3QgcmVtb3ZlSG92ZXIgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldFByb2plY3RzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvamVjdC5nZXRQcm9qZWN0cygpW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2plY3QtY2xpY2tlZCcpO1xuICAgIH1cbn1cblxuLy9oYXZlIHRvIGFkZCBhIGRlbGV0ZSB0YXNrcyBmdW5jdGlvbiB0aGF0IGRlbGV0ZXMgdGhlIHRhc2tzIG9uIHRoZSBwYWdlIGlmIHRoZSBjdXJyZW50IHByb2plY3QgaXMgdGhlIG9uZSB0aGF0IGdvdCBkZWxldGVkXG4vL2JlY2F1c2UgaXQgc3RpbGwgc2hvd3MgdGhlIHByZXZpb3VzIHRhc2tzIGV2ZW4gaWYgdGhhdCBwcm9qZWN0IGdvdCBkZWxldGVkXG5cbmNvbnN0IGRpc3BsYXlUYXNrc0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBsZXQgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgYnRuQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGxldCBpbXBvcnRhbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmR1ZURhdGU7XG4gICAgICAgIGltcG9ydGFudC5zcmMgPSBzdGFyO1xuICAgICAgICBvcHRpb25zLnNyYyA9IG9wdGlvbjtcblxuICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ29wdGlvbmFsLWJ1dHRvbnMnKVxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKVxuICAgICAgICBpbXBvcnRhbnQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgICAgIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgndGFzay1vcHRpb25zJyk7XG4gICAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgndGFzay1lZGl0LWJ1dHRvbicpO1xuICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgndGFzay1kZWxldGUtYnV0dG9uJyk7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgYnRuQ29udC5hcHBlbmRDaGlsZChpbXBvcnRhbnQpO1xuICAgICAgICBidG5Db250LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuQ29udCk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxuICAgIHRhc2tPcHRpb25DbGlja2VkKCk7XG4gICAvLyBlZGl0VGFza0luUHJvamVjdCgpO1xuICAgIC8vZGVsZXRlVGFza0luUHJvamVjdCgpO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJUYXNrQ29udGFpbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG4gICAgdGFza3MudGV4dENvbnRlbnQgPSAnICc7XG59XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5RGVmYXVsdFByb2plY3QgPSAoKSA9PiB7XG4gICAgcHJvamVjdC5jcmVhdGVEZWZhdWx0UHJvamVjdCgpO1xuICAgIGRpc3BsYXlQcm9qZWN0cygpO1xufVxuXG4vLzEuIHdoZW4geW91IGRlbGV0ZSBhIHByb2plY3QsIGl0IHN0aWxsIHNob3dzIHRoZSBjdXJyZW50IHRhc2tzIGluIHRoYXQgcHJvamVjdCAoaWYgeW91IGNsaWNrZWQgaXQgYmVmb3JlIGRlbGV0aW5nKVxuLy8yLiBvdGhlciBmdW5jdGlvbmFsaXR5OiB3aGVuIHlvdSBob3ZlciBvdmVyIHByb2plY3QgdGhhdCdzIHdoZW4gdGhlIG9wdGlvbiB0byBkZWxldGUgaXQgc2hvdWxkIHNob3dcbi8vICAgZG8gdGhpcyBieSBhZGRpbmcgYSBtb3VzZW92ZXIgZXZlbnRMaXN0ZW5lciBhbmQgd2hlbiB5b3UgaG92ZXIgb3ZlciB0aGUgcHJvamVjdCwgaXQgc2hvdWxkIHNob3cgdGhlICdYJyB0byBkZWxldGUgaXQsIGFuZCB0aGVuIHJ1biBhIFxuLy8gICBmdW5jdGlvbiB0aGF0IGF0dGFjaGVzIGFuIGV2ZW50TGlzdGVuZXIgdG8gdGhhdCAnWCcgd2hlbiB5b3UgaG92ZXIgb3ZlciBpdFxuXG5leHBvcnQgY29uc3QgZGVsZXRlUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0T3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LW9wdGlvbnMnKTtcblxuICAgIHByb2plY3RPcHRpb25zLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5kZWxldGVQcm9qZWN0KGUudGFyZ2V0LnByZXZpb3VzU2libGluZy50ZXh0Q29udGVudCk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuICAgIH0pKVxufVxuXG4vL3Nob3dzIGhpZGRlbiB0YXNrIGZvcm1cbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgbWFrZVRvZG8oKTtcbiAgICB9KTtcbn1cblxuLy9zaG93cyBoaWRkZW4gcHJvamVjdCBmb3JtXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBtYWtlUHJvamVjdCgpO1xuICAgIH0pO1xufVxuXG4vL3Nob3cgY2xvc2UgYnV0dG9uIHdoZW4gaG92ZXIgb3ZlciBwcm9qZWN0IGxhdGVyXG4vKlxuY29uc3Qgc2hvd0Nsb3NlQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcblxuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KVxuICAgICAgICBlLnRhcmdldC5sYXN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSkpXG59Ki9cblxuXG5leHBvcnQgY29uc3QgdGFza09wdGlvbkNsaWNrZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza09wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1vcHRpb25zJylcblxuICAgIHRhc2tPcHRpb25zLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5sYXN0Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIGRlbGV0ZVRhc2tJblByb2plY3QoKTtcbiAgICAgICAgZWRpdFRhc2tJblByb2plY3QoKTtcbiAgICAgICAgLyogXG4gICAgICAgICAqIFxuICAgICAgICAgKiBpZiBjbGlja2VkIG91dHNpZGUgb2YgdGhlIGVsZW1lbnQsIHRoZW4gbWFrZSBpdCBoaWRkZW4vb3IgZGVsZXRlIGl0XG4gICAgICAgICAqIGRvIHRoaXMgc28gdGhhdCB0aGUgdXNlciBjYW4gZXhpdCB0aGUgb3B0aW9uc0J1dHRvbnMgaWYgdGhleSBjbGljayBzb21ld2hlcmUgZWxzZVxuICAgICAgICAgKiBcbiAgICAgICAgICovXG4gICAgfSkpXG59XG5cblxuLypcbiAqIFdoZW4gZWFjaCB0YXNrLW9wdGlvbnMgaXMgY2xpY2tlZCwgc2hvdyBhbiBlZGl0L2RlbGV0ZSBidXR0b24gd2hpY2ggYWxsb3dzIHlvdSB0byBlaXRoZXIgZWRpdCB0aGUgdGFzayBvciBkZWxldGUgdGhlIHRhc2tcbiAqIEVkaXQ6IFxuICogV2hlbiBlZGl0IGJ1dHRvbiBpcyBjbGlja2VkLCBcbiAqIHNob3cgYSBwb3AgdXAgZm9ybSB3aXRoIHRoZSBpbnB1dHMgKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSkgYmVpbmcgdGhlIHZhbHVlIG9mIHRoYXQgY3VycmVudCB0YXNrXG4gKiBtYWtlIHRoaXMgaW50byBhIGZvcm0gdGhhdCBzaG93cyBvdmVyIGV2ZXJ5dGhpbmcgZWxzZVxuICogd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQsIGNoYW5nZSB0aGF0IHRhc2sncyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGV0Yy4gXG4gKiBEbyB0aGlzIF5eXiBieSBnb2luZyB0aHJvdWdoIHRoZSBjdXJyZW50UHJvamVjdCdzIHRhc2tBcnIgYW5kIHRoZW4gY2hhbmdlIHRoZSBjb3JyZXNwb25kaW5nIHRhc2sncyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGVcbiAqIHRoZW4gZGlzcGxheVRhc2tzSW5Qcm9qZWN0IGFnYWluXG4gKi9cblxuXG5cblxuXG5cbi8vZWRpdCBmdW5jdGlvbiB3b3JrcyBub3cgYnV0IGFmdGVyIGVkaXRpbmcgdGhlbSwgdGhlIHRhc2tzIGFyZSBzdGlsbCBpbiB0aGUgZnV0dXJlVG9kb3MvVG9kYXkgdG9kb3MgZXZlbiBpZiB0aGVpciBkYXRlcyBoYXZlIGNoYW5nZWRcbi8vaXQgaXMgYmVjYXVzZSBJIGhhdmVuJ3QgdGFrZW4gdGhlbSBvdXQgb3IgY2hlY2tlZCBpZiBpIHNob3VsZCB0YWtlIHRoZW0gb3V0IG9mIHRob3NlIGNvcnJlc3BvbmRpbmcgYXJyYXlzXG5jb25zdCBlZGl0VGFza0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBcbiAgICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLWVkaXQtYnV0dG9uJyk7XG4gICAgY29uc3QgZWRpdFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1mb3JtJyk7XG5cbiAgICBlZGl0QnV0dG9ucy5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnaGknKVxuICAgICAgICBcbiAgICAgICAgZWRpdFRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJyk7XG5cbiAgICAgICAgdGl0bGUudmFsdWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgwKS50ZXh0Q29udGVudDtcbiAgICAgICAgZGVzY3JpcHRpb24udmFsdWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgxKS50ZXh0Q29udGVudDtcbiAgICAgICAgZHVlRGF0ZS52YWx1ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDIpLnRleHRDb250ZW50O1xuXG4gICAgICAgIGxldCBvbGRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDApLnRleHRDb250ZW50O1xuXG4gICAgICAgIGVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdHRlZCcpO1xuXG4gICAgICAgICAgICBsZXQgbmV3VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgbGV0IG5ld0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGxldCBuZXdEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGF0ZScpLnZhbHVlO1xuXG4gICAgICAgICAgICB0b2RvLmVkaXRUb2RvKG9sZFRpdGxlLCBuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24sIG5ld0R1ZURhdGUpO1xuXG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXG4gICAgfSkpXG5cbn1cblxuXG5cblxuXG5jb25zdCBkZWxldGVUYXNrSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLWRlbGV0ZS1idXR0b24nKTtcblxuICAgIGRlbGV0ZUJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndGFzayBkZWxldGVkJylcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkpXG4gICAgICAgIHRvZG8uZGVsZXRlVG9kbyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIHRvZG8uZGVsZXRlVG9kb0luQWxsVG9kb3NBcnJheShlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCk7XG4gICAgICAgIHRvZG8uZGVsZXRlVG9kYXlUb2RvKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgdG9kby5kZWxldGVGdXR1cmVUb2RvKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVRhc2tzSW5Qcm9qZWN0KCk7XG4gICAgfSkpXG59XG5cblxuXG5cbi8qXG5lZGl0aW5nIGEgdGFzayBvbmNlIHdvcmtzLCBidXQgYWZ0ZXIgY29ycmVjdGx5IGVkaXRpbmcsIHdoZW4gaSB0cnkgdG8gZWRpdCBhIHNlY29uZCB0aW1lIFxuLSBldmVuIGlmIHRoZSB0YXNrIGlzIGluIGEgZGlmZmVyZW50IHByb2plY3QtaXQgYnJlYWtzIFxuXG5JdCdzIGJlY2F1c2UgdGhlIGV2ZW50TGlzdGVuZXIgZm9yIHN1Ym1pdHRpbmcgdGhlIGZvcm0gcnVuIHR3aWNlIG9uIHRoZSBzZWNvbmQgdGltZSBpIHRyeSB0byBzdWJtaXQgYSBmb3JtIChzZWNvbmQgdGltZSBlZGl0aW5nKVxuc28gaXQgbWFrZXMgdGhlIHRhc2sgYmxhbmsgYmVjYXVzZSBpdCBydW5zIHR3aWNlXG5cbk1heWJlIGxlYXJuIGFib3V0IGJ1YmJsaW5nIGFuZCBwcm9wYWdhdGlvbiB0byBob3BlZnVsbHkgZml4IHRoaXNcbiovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiLi9tb2R1bGVzL2NvbnRyb2xsZXJcIjtcbmV2ZW50SGFuZGxlcnMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==