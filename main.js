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
    let todos = [];
    
    const getTodos = () => todos;

    const createTodo = (title, description, dueDate) => {
        const todoItem = {
            title, 
            description, 
            dueDate, 
        };
        
        todos.push(todoItem);
      //  if(project.getCurrentProject()===undefined) return;
        project.getCurrentProject().taskArr.push(todoItem);
        // return todoItem ??? is this necessary???
    }

    const deleteTodo = (todoItem) => {
        for (let i = 0; i < project.getCurrentProject().taskArr.length; i++) {
            if (project.getCurrentProject().taskArr[i].title == todoItem)  {
                project.getCurrentProject().taskArr.splice(i, 1);
            }
        }
    }
    /*const editTodo = (todoItem) => { not sure how to implement this
    }*/

    return { getTodos, createTodo, deleteTodo};
})();

const project = (() => {
    let projects = []
    let currentProject;

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
        createProject('Default');
        setCurrentProject('Default')
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
/* harmony export */   clearTaskContainer: () => (/* binding */ clearTaskContainer),
/* harmony export */   deleteProject: () => (/* binding */ deleteProject),
/* harmony export */   displayDefaultProject: () => (/* binding */ displayDefaultProject),
/* harmony export */   displayProjects: () => (/* binding */ displayProjects),
/* harmony export */   displayTodos: () => (/* binding */ displayTodos),
/* harmony export */   makeProject: () => (/* binding */ makeProject),
/* harmony export */   makeTodo: () => (/* binding */ makeTodo),
/* harmony export */   showTasksInProject: () => (/* binding */ showTasksInProject),
/* harmony export */   taskOptionClicked: () => (/* binding */ taskOptionClicked)
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
    })
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
    })
}

//make this the display 'ALL TODOS' function when 'ALL TASKS' is clicked
const displayTodos = () => {
    const tasks = document.querySelector('#tasks');

    //deletes all the currently displayed tasks
    tasks.textContent = ' ';
    //then displays them to avoid duplication of tasks being displayed
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos()[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos()[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos()[i].dueDate;

        taskContainer.classList.add('task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}

const displayProjects = () => {
    const projectContainer = document.querySelector('#project-container');
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
    const projectNameHeader = document.querySelector('#project-name-header')

    projects.forEach(item => item.addEventListener('click', (e) => {
        projectNameHeader.textContent = `${e.target.textContent}`
        console.log('project clicked')
        clearTaskContainer();
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.setCurrentProject(e.target.textContent);
        displayTasksInProject();
    }))
}
//have to add a delete tasks function that deletes the tasks on the page if the current project is the one that got deleted
//because it still shows the previous tasks even if that project got deleted
const displayTasksInProject = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
    
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr.length; i++) {
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

const clearTaskContainer = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
}

const displayDefaultProject = () => {
    _todo__WEBPACK_IMPORTED_MODULE_0__.project.createDefaultProject();
    displayProjects();
}

//when you delete a project, it still shows the current tasks in that project (if you clicked it before deleting)
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
    addTask.addEventListener('click', () => taskForm.classList.toggle('hidden'));
    makeTodo();
}

//shows hidden project form
const addProject = () => {
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

            for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr.length; i++) {
                if (_todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].title == title) {
                    _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].title = title;
                    _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].description = description;
                    _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].dueDate = dueDate;
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
        console.log(_todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject())
        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.deleteTodo(e.target.parentNode.parentNode.firstChild.textContent);
        displayTasksInProject();
    }))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7OztBQ2xCcUQ7QUFDckQsa0VBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2hhbmRsZXMgaWYgYSBET00gY2hhbmdpbmcgKHVpLmpzKSBhbmQgYXBwbHlpbmcgdGhlIGNvcnJlY3QgbG9naW4gZnJvbSB0b2RvLmpzXG4vL2ZvciBleGFtcGxlLCBpZiB0aGlzIGJ1dHRvbiBpcyBjbGlja2VkIChhbiBldmVudExpc3RlbmVyKSBpdCB3aWxsIHJ1biB0aGlzIGxvZ2ljIGZyb20gdG9kby5qcyB0aGVuIGNoYW5nZSB0aGUgRE9NIGFjY29yZGluZ2x5IGluIHVpLmpzXG5pbXBvcnQgeyBtYWtlVG9kbywgbWFrZVByb2plY3QsIHNob3dUYXNrc0luUHJvamVjdCwgZGlzcGxheURlZmF1bHRQcm9qZWN0LCBkZWxldGVQcm9qZWN0LCBhZGRQcm9qZWN0LCBhZGRUYXNrIH0gZnJvbSBcIi4vdWlcIjtcbmltcG9ydCB7IHRvZG8gfSBmcm9tIFwiLi90b2RvXCI7XG5cblxuXG5leHBvcnQgY29uc3QgZXZlbnRIYW5kbGVycyA9ICgpID0+IHtcbiAgICBcbiAgICBkaXNwbGF5RGVmYXVsdFByb2plY3QoKTtcbiAgICBhZGRUYXNrKCk7XG4gICAgYWRkUHJvamVjdCgpO1xuICAgXG4gICAgXG4gICAgXG59O1xuIiwiLy8gY2FuIGNyZWF0ZSB0byBkbyBpdGVtLCBkZWxldGUsIGVkaXQsIGV0Yy4gXG5cbmV4cG9ydCBjb25zdCB0b2RvID0gKCgpID0+IHtcbiAgICBsZXQgdG9kb3MgPSBbXTtcbiAgICBcbiAgICBjb25zdCBnZXRUb2RvcyA9ICgpID0+IHRvZG9zO1xuXG4gICAgY29uc3QgY3JlYXRlVG9kbyA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUpID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB7XG4gICAgICAgICAgICB0aXRsZSwgXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiwgXG4gICAgICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgLy8gIGlmKHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKT09PXVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgLy8gcmV0dXJuIHRvZG9JdGVtID8/PyBpcyB0aGlzIG5lY2Vzc2FyeT8/P1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlID09IHRvZG9JdGVtKSAge1xuICAgICAgICAgICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKmNvbnN0IGVkaXRUb2RvID0gKHRvZG9JdGVtKSA9PiB7IG5vdCBzdXJlIGhvdyB0byBpbXBsZW1lbnQgdGhpc1xuICAgIH0qL1xuXG4gICAgcmV0dXJuIHsgZ2V0VG9kb3MsIGNyZWF0ZVRvZG8sIGRlbGV0ZVRvZG99O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IHByb2plY3QgPSAoKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgbGV0IGN1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEl0ZW0gPSB7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZSwgXG4gICAgICAgICAgICB0YXNrQXJyOiBbXSxcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3RJdGVtKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDdXJyZW50UHJvamVjdCA9ICgpID0+IGN1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgY3JlYXRlUHJvamVjdCgnRGVmYXVsdCcpO1xuICAgICAgICBzZXRDdXJyZW50UHJvamVjdCgnRGVmYXVsdCcpXG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0c1tpXS5wcm9qZWN0TmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4geyBjcmVhdGVQcm9qZWN0LCBnZXRQcm9qZWN0cywgZ2V0Q3VycmVudFByb2plY3QsIHNldEN1cnJlbnRQcm9qZWN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCwgZGVsZXRlUHJvamVjdCB9XG59KSgpXG5cbi8qXG4gKiBUYXNrMTogY3JlYXRlIGEgZGVsZXRlIGZ1bmN0aW9uIHRoYXQgZGVsZXRlcyBhIHByb2plY3QgYW5kL29yIHRhc2tzXG5GaXJzdCBJIG5lZWQgdG8gYWRkIHRoZSAzIGRvdHMgYXMgYW4gb3B0aW9uIHRvIGVhY2ggdGFzayBhbmQgcHJvamVjdFxuV2hlbiBkZWxldGUgaXMgY2xpY2tlZFxuRGVsZXRlIHRoYXQgcHJvamVjdC90YXNrIGZyb20gaXRzIGNvcnJlc3BvbmRpbmcgYXJyYXkgYW5kIHRoZW4gY2FsbCBkaXNwbGF5UHJvamVjdHMvZGlzcGxheVRhc2tzSW5Qcm9qZWN0IGFnYWluXG4qL1xuXG5cblxuXG5cbiAvKiBUYXNrMjogY3JlYXRlIGFuIGVkaXQgZnVuY3Rpb24gd2hlcmUgeW91IGNhbiBlZGl0IHByb2plY3QncyBuYW1lIGFuZC9vciBhIHRhc2tcbldoZW4gdGhlIGVkaXQgYnV0dG9uIGlzIGNsaWNrZWQsIFxuc2hvdyBhIGNvbnRhaW5lci9kaXYvZm9ybSB0aGF0IGNvbnRhaW5zIHRoYXQgdGFzaydzIGN1cnJlbnQgbmFtZSwgZGVzY3JpcHRpb24gYW5kIGRhdGVcbndpbGwgaGF2ZSB0byBhZGQgdGhlIGN1cnJlbnQgbmFtZSwgZGVzY3JpcHRpb24gYW5kIGRhdGUgdG8gdGhhdCBmb3JtIFxuYW5kIHRoZW4gd2hlbiBmb3JtIGlzIHN1Ym1pdHRlZFxuZGlzcGxheSB0YXNrcyBvciBwcm9qZWN0IGFnYWluIHNvIHRoYXQgaXQgc2VlbXMgaXQgd2FzIGVkaXRlZFxuXG5cblxuICogVGFzazM6IGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0aGUgY29sb3Igb2YgdGhlIGN1cnJlbnQgcHJvamVjdCBzbyB0aGF0IHdlIGtub3cgd2hpY2ggcHJvamVjdCB0aGUgdGFza3MgYXJlIGdvaW5nIGludG9cblRoaXMgd2lsbCBiZSBlYXN5OyBqdXN0IHVzZSB0aGUgZ2V0Q3VycmVudFByb2plY3QgYW5kIGNoYW5nZSB0aGUgY29sb3Igb2YgdGhhdFxuICovIiwiaW1wb3J0IHsgdG9kbywgcHJvamVjdCB9IGZyb20gXCIuL3RvZG9cIjtcbmltcG9ydCBzdGFyIGZyb20gJy4uL2ljb25zL3N0YXItb3V0bGluZS5zdmcnXG5pbXBvcnQgY2xvc2UgZnJvbSAnLi4vaWNvbnMvY2xvc2UucG5nJ1xuaW1wb3J0IG9wdGlvbiBmcm9tICcuLi9pY29ucy9tb3JlLXZlcnRpY2FsLWFsdC5zdmcnXG5cbi8vYXR0YWNoZXMgZXZlbnRMaXN0ZW5lciBmb3Igd2hlbiB0YXNrRm9ybSBpcyBzdWJtaXR0ZWRcbmV4cG9ydCBjb25zdCBtYWtlVG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XG5cbiAgICAgICAgdG9kby5jcmVhdGVUb2RvKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZS52YWx1ZSk7XG4gICAgICAgXG4gICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuXG4gICAgICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICAgIHRhc2tGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pXG59ICAgXG5cbi8vYXR0YWNoZXMgZXZlbnRMaXN0ZW5lciBmb3Igd2hlbiBwcm9qZWN0Rm9ybSBpcyBzdWJtaXR0ZWRcbmV4cG9ydCBjb25zdCBtYWtlUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICBwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJyk7XG5cbiAgICAgICAgcHJvamVjdC5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG5cbiAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSlcbn1cblxuLy9tYWtlIHRoaXMgdGhlIGRpc3BsYXkgJ0FMTCBUT0RPUycgZnVuY3Rpb24gd2hlbiAnQUxMIFRBU0tTJyBpcyBjbGlja2VkXG5leHBvcnQgY29uc3QgZGlzcGxheVRvZG9zID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG5cbiAgICAvL2RlbGV0ZXMgYWxsIHRoZSBjdXJyZW50bHkgZGlzcGxheWVkIHRhc2tzXG4gICAgdGFza3MudGV4dENvbnRlbnQgPSAnICc7XG4gICAgLy90aGVuIGRpc3BsYXlzIHRoZW0gdG8gYXZvaWQgZHVwbGljYXRpb24gb2YgdGFza3MgYmVpbmcgZGlzcGxheWVkXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldFRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcblxuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5UHJvamVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWNvbnRhaW5lcicpO1xuICAgIHByb2plY3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnICc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0UHJvamVjdHMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgIFxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRQcm9qZWN0cygpW2ldLnByb2plY3ROYW1lO1xuICAgICAgICBvcHRpb25zLnNyYyA9IGNsb3NlO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBvcHRpb25zLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3Qtb3B0aW9ucycpO1xuICAgICAgICAvL29wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG5cbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuICAgIGRlbGV0ZVByb2plY3QoKTtcbiAgICBzaG93VGFza3NJblByb2plY3QoKTtcbiAgICBcbn1cbi8vcmVuYW1lIHRoaXMgZnVuY3Rpb24gbGF0ZXJcbi8vd2hlbiBhbnkgb2YgdGhlIHByb2plY3RzIGFyZSBjbGlja2VkXG5leHBvcnQgY29uc3Qgc2hvd1Rhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaGVhZGVyJylcblxuICAgIHByb2plY3RzLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgcHJvamVjdE5hbWVIZWFkZXIudGV4dENvbnRlbnQgPSBgJHtlLnRhcmdldC50ZXh0Q29udGVudH1gXG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0IGNsaWNrZWQnKVxuICAgICAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICAgICAgcHJvamVjdC5zZXRDdXJyZW50UHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgIH0pKVxufVxuLy9oYXZlIHRvIGFkZCBhIGRlbGV0ZSB0YXNrcyBmdW5jdGlvbiB0aGF0IGRlbGV0ZXMgdGhlIHRhc2tzIG9uIHRoZSBwYWdlIGlmIHRoZSBjdXJyZW50IHByb2plY3QgaXMgdGhlIG9uZSB0aGF0IGdvdCBkZWxldGVkXG4vL2JlY2F1c2UgaXQgc3RpbGwgc2hvd3MgdGhlIHByZXZpb3VzIHRhc2tzIGV2ZW4gaWYgdGhhdCBwcm9qZWN0IGdvdCBkZWxldGVkXG5jb25zdCBkaXNwbGF5VGFza3NJblByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpO1xuICAgIHRhc2tDb250YWluZXIudGV4dENvbnRlbnQgPSAnICc7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBidG5Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbGV0IGltcG9ydGFudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZHVlRGF0ZTtcbiAgICAgICAgaW1wb3J0YW50LnNyYyA9IHN0YXI7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gb3B0aW9uO1xuXG4gICAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3B0aW9uYWwtYnV0dG9ucycpXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRhaW5lcicpXG4gICAgICAgIGltcG9ydGFudC5jbGFzc0xpc3QuYWRkKCdpbXBvcnRhbnQnKTtcbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCd0YXNrLW9wdGlvbnMnKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWVkaXQtYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlbGV0ZS1idXR0b24nKTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICBidG5Db250LmFwcGVuZENoaWxkKGltcG9ydGFudCk7XG4gICAgICAgIGJ0bkNvbnQuYXBwZW5kQ2hpbGQob3B0aW9ucylcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bkNvbnQpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbiAgICB0YXNrT3B0aW9uQ2xpY2tlZCgpO1xuICAgIC8vZGVsZXRlVGFza0luUHJvamVjdCgpO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJUYXNrQ29udGFpbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKTtcbiAgICB0YXNrQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyAnO1xufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheURlZmF1bHRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIHByb2plY3QuY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcbiAgICBkaXNwbGF5UHJvamVjdHMoKTtcbn1cblxuLy93aGVuIHlvdSBkZWxldGUgYSBwcm9qZWN0LCBpdCBzdGlsbCBzaG93cyB0aGUgY3VycmVudCB0YXNrcyBpbiB0aGF0IHByb2plY3QgKGlmIHlvdSBjbGlja2VkIGl0IGJlZm9yZSBkZWxldGluZylcbmV4cG9ydCBjb25zdCBkZWxldGVQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3Qtb3B0aW9ucycpO1xuXG4gICAgcHJvamVjdE9wdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZVByb2plY3QoZS50YXJnZXQucHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG4gICAgfSkpXG59XG5cbi8vc2hvd3MgaGlkZGVuIHRhc2sgZm9ybVxuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKSk7XG4gICAgbWFrZVRvZG8oKTtcbn1cblxuLy9zaG93cyBoaWRkZW4gcHJvamVjdCBmb3JtXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKSk7XG4gICAgbWFrZVByb2plY3QoKTtcbn1cblxuLy9zaG93IGNsb3NlIGJ1dHRvbiB3aGVuIGhvdmVyIG92ZXIgcHJvamVjdCBsYXRlclxuLypcbmNvbnN0IHNob3dDbG9zZUJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcbiAgICAgICAgZS50YXJnZXQubGFzdENoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pKVxufSovXG5cblxuZXhwb3J0IGNvbnN0IHRhc2tPcHRpb25DbGlja2VkID0gKCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IHRhc2tPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stb3B0aW9ucycpXG5cbiAgICB0YXNrT3B0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmxhc3RDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgZGVsZXRlVGFza0luUHJvamVjdCgpO1xuICAgICAgICBlZGl0VGFza0luUHJvamVjdCgpO1xuICAgICAgICAvKiBcbiAgICAgICAgICogXG4gICAgICAgICAqIGlmIGNsaWNrZWQgb3V0c2lkZSBvZiB0aGUgZWxlbWVudCwgdGhlbiBtYWtlIGl0IGhpZGRlbi9vciBkZWxldGUgaXRcbiAgICAgICAgICogZG8gdGhpcyBzbyB0aGF0IHRoZSB1c2VyIGNhbiBleGl0IHRoZSBvcHRpb25zQnV0dG9ucyBpZiB0aGV5IGNsaWNrIHNvbWV3aGVyZSBlbHNlXG4gICAgICAgICAqIFxuICAgICAgICAgKi9cbiAgICB9KSlcbn1cblxuXG4vKlxuICogV2hlbiBlYWNoIHRhc2stb3B0aW9ucyBpcyBjbGlja2VkLCBzaG93IGFuIGVkaXQvZGVsZXRlIGJ1dHRvbiB3aGljaCBhbGxvd3MgeW91IHRvIGVpdGhlciBlZGl0IHRoZSB0YXNrIG9yIGRlbGV0ZSB0aGUgdGFza1xuICogRWRpdDogXG4gKiBXaGVuIGVkaXQgYnV0dG9uIGlzIGNsaWNrZWQsIFxuICogc2hvdyBhIHBvcCB1cCBmb3JtIHdpdGggdGhlIGlucHV0cyAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSBiZWluZyB0aGUgdmFsdWUgb2YgdGhhdCBjdXJyZW50IHRhc2tcbiAqIG1ha2UgdGhpcyBpbnRvIGEgZm9ybSB0aGF0IHNob3dzIG92ZXIgZXZlcnl0aGluZyBlbHNlXG4gKiB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZCwgY2hhbmdlIHRoYXQgdGFzaydzIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgZXRjLiBcbiAqIERvIHRoaXMgXl5eIGJ5IGdvaW5nIHRocm91Z2ggdGhlIGN1cnJlbnRQcm9qZWN0J3MgdGFza0FyciBhbmQgdGhlbiBjaGFuZ2UgdGhlIGNvcnJlc3BvbmRpbmcgdGFzaydzIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZVxuICogdGhlbiBkaXNwbGF5VGFza3NJblByb2plY3QgYWdhaW5cbiAqL1xuXG5jb25zdCBlZGl0VGFza0luUHJvamVjdCA9ICgpID0+IHtcblxuICAgIC8vZm9yIGVhY2ggZWRpdFRhc2sgYnV0dG9uIGNsY2lja2VkLCBzaG93IHRoZSBmb3JtIHdpdGggaXRzIGN1cnJlbnQgdmFsdWVzIHRoZW4gYXR0YWNoIGZvcm0gZXZlbnRMaXN0ZW5lclxuICAgIGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZm9ybScpXG4gICAgY29uc3QgZWRpdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1lZGl0LWJ1dHRvbicpO1xuICAgIGVkaXRCdXR0b25zLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgICAgIGVkaXRUYXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTsgICAgXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKS52YWx1ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50O1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kZXNjcmlwdGlvbicpLnZhbHVlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMSkudGV4dENvbnRlbnQ7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWRhdGUnKS52YWx1ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDIpLnRleHRDb250ZW50O1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kZXNjcmlwdGlvbicpO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGF0ZScpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSlcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMSkpXG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbi5pdGVtKDIpKVxuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLml0ZW0oMSkudGV4dENvbnRlbnQ7XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbSgyKS50ZXh0Q29udGVudDtcblxuICAgICAgICBlZGl0VGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWR1ZURhdGUnKS52YWx1ZTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS50aXRsZSA9PSB0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0FycltpXS5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgZWRpdFRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgIH0pXG4gICAgfSkpXG5cbn1cbi8qXG5jb25zdCBjcmVhdGVFZGl0VGFza0Zvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCB0aXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjb25zdCBkdWVEYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgZGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBkaXYzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aXRsZUxhYmVsLnRleHRDb250ZW50ID0gJ1RpdGxlJztcbiAgICBkZXNjcmlwdGlvbkxhYmVsLnRleHRDb250ZW50ID0gJ0Rlc2NyaXB0aW9uJztcbiAgICBkdWVEYXRlTGFiZWwudGV4dENvbnRlbnQgPSAnRHVlIERhdGUnO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdWJtaXQnO1xuXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2VkaXQtdGFzay1mb3JtJyk7XG4gICAgdGl0bGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdlZGl0LXRpdGxlJyk7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2VkaXQtdGl0bGUnKTtcbiAgICBkZXNjcmlwdGlvbkxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2VkaXQtZGVzY3JpcHRpb24nKTtcbiAgICBkZXNjcmlwdGlvbklucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAnZWRpdC1kZXNjcmlwdGlvbicpXG4gICAgZHVlRGF0ZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdkYXRlJyk7XG4gICAgZHVlRGF0ZUlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAnZWRpdC1kdWVEYXRlJyk7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdlZGl0LXRhc2stYnV0dG9uJyk7XG5cbiAgICBkaXYxLmFwcGVuZENoaWxkKHRpdGxlTGFiZWwpO1xuICAgIGRpdjEuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG4gICAgZGl2Mi5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkxhYmVsKTtcbiAgICBkaXYyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuICAgIGRpdjMuYXBwZW5kQ2hpbGQoZHVlRGF0ZUxhYmVsKTtcbiAgICBkaXYzLmFwcGVuZENoaWxkKGR1ZURhdGVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkaXYxKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRpdjIpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGl2Myk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgcmV0dXJuIGZvcm07XG59Ki9cblxuY29uc3QgZGVsZXRlVGFza0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1kZWxldGUtYnV0dG9uJyk7XG5cbiAgICBkZWxldGVCdXR0b24uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Rhc2sgZGVsZXRlZCcpXG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpKVxuICAgICAgICB0b2RvLmRlbGV0ZVRvZG8oZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpO1xuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcbiAgICB9KSlcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgZXZlbnRIYW5kbGVycyB9IGZyb20gXCIuL21vZHVsZXMvY29udHJvbGxlclwiO1xuZXZlbnRIYW5kbGVycygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9