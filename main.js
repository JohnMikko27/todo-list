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
        for (let i = 0; i < todos.length; i++) {
            if (todos[i] == todoItem)  {
                todos.splice(i, 1);
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
/* harmony export */   showTasksInProject: () => (/* binding */ showTasksInProject)
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

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].dueDate;
        important.src = _icons_star_outline_svg__WEBPACK_IMPORTED_MODULE_1__;
        options.src = _icons_more_vertical_alt_svg__WEBPACK_IMPORTED_MODULE_3__;

        taskContainer.classList.add('task-container')
        important.classList.add('important');
        options.classList.add('task-options');

        btnCont.appendChild(important);
        btnCont.appendChild(options)
        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate);
        taskContainer.appendChild(btnCont);
    
        tasks.appendChild(taskContainer);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUM0SDtBQUM5Rjs7OztBQUl2QjtBQUNQO0FBQ0EsSUFBSSwwREFBcUI7QUFDekIsSUFBSSw0Q0FBTztBQUNYLElBQUksK0NBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxLQUFLOztBQUVMLGFBQWE7QUFDYixDQUFDOztBQUVNO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBLG1CQUFtQjtBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEd1QztBQUNLO0FBQ047QUFDYTs7QUFFbkQ7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSx1Q0FBSTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVEsMENBQU87QUFDZjs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSSx1Q0FBSSxvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLHVDQUFJO0FBQ2hDLGtDQUFrQyx1Q0FBSTtBQUN0Qyw4QkFBOEIsdUNBQUk7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBLG9CQUFvQixJQUFJLDBDQUFPLHVCQUF1QjtBQUN0RDtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLDBDQUFPO0FBQ2pDLHNCQUFzQiw2Q0FBSztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRTtBQUNBO0FBQ0EsUUFBUSwwQ0FBTztBQUNmO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLElBQUksMENBQU8scUNBQXFDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QiwwQ0FBTztBQUNuQyxrQ0FBa0MsMENBQU87QUFDekMsOEJBQThCLDBDQUFPO0FBQ3JDLHdCQUF3QixvREFBSTtBQUM1QixzQkFBc0IseURBQU07O0FBRTVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQLElBQUksMENBQU87QUFDWDtBQUNBOztBQUVBO0FBQ087QUFDUDs7QUFFQTtBQUNBLFFBQVEsMENBQU87QUFDZjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDeExEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNsQnFEO0FBQ3JELGtFQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oYW5kbGVzIGlmIGEgRE9NIGNoYW5naW5nICh1aS5qcykgYW5kIGFwcGx5aW5nIHRoZSBjb3JyZWN0IGxvZ2luIGZyb20gdG9kby5qc1xuLy9mb3IgZXhhbXBsZSwgaWYgdGhpcyBidXR0b24gaXMgY2xpY2tlZCAoYW4gZXZlbnRMaXN0ZW5lcikgaXQgd2lsbCBydW4gdGhpcyBsb2dpYyBmcm9tIHRvZG8uanMgdGhlbiBjaGFuZ2UgdGhlIERPTSBhY2NvcmRpbmdseSBpbiB1aS5qc1xuaW1wb3J0IHsgbWFrZVRvZG8sIG1ha2VQcm9qZWN0LCBzaG93VGFza3NJblByb2plY3QsIGRpc3BsYXlEZWZhdWx0UHJvamVjdCwgZGVsZXRlUHJvamVjdCwgYWRkUHJvamVjdCwgYWRkVGFzayB9IGZyb20gXCIuL3VpXCI7XG5pbXBvcnQgeyB0b2RvIH0gZnJvbSBcIi4vdG9kb1wiO1xuXG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoKSA9PiB7XG4gICAgXG4gICAgZGlzcGxheURlZmF1bHRQcm9qZWN0KCk7XG4gICAgYWRkVGFzaygpO1xuICAgIGFkZFByb2plY3QoKTtcbiAgIFxuICAgIFxuICAgIFxufTtcbiIsIi8vIGNhbiBjcmVhdGUgdG8gZG8gaXRlbSwgZGVsZXRlLCBlZGl0LCBldGMuIFxuXG5leHBvcnQgY29uc3QgdG9kbyA9ICgoKSA9PiB7XG4gICAgbGV0IHRvZG9zID0gW107XG4gICAgXG4gICAgY29uc3QgZ2V0VG9kb3MgPSAoKSA9PiB0b2RvcztcblxuICAgIGNvbnN0IGNyZWF0ZVRvZG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0ge1xuICAgICAgICAgICAgdGl0bGUsIFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sIFxuICAgICAgICAgICAgZHVlRGF0ZSwgXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0b2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgIC8vICBpZihwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCk9PT11bmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIucHVzaCh0b2RvSXRlbSk7XG4gICAgICAgIC8vIHJldHVybiB0b2RvSXRlbSA/Pz8gaXMgdGhpcyBuZWNlc3Nhcnk/Pz9cbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVUb2RvID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0b2Rvc1tpXSA9PSB0b2RvSXRlbSkgIHtcbiAgICAgICAgICAgICAgICB0b2Rvcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLypjb25zdCBlZGl0VG9kbyA9ICh0b2RvSXRlbSkgPT4geyBub3Qgc3VyZSBob3cgdG8gaW1wbGVtZW50IHRoaXNcbiAgICB9Ki9cblxuICAgIHJldHVybiB7IGdldFRvZG9zLCBjcmVhdGVUb2RvLCBkZWxldGVUb2RvfTtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0ID0gKCgpID0+IHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXVxuICAgIGxldCBjdXJyZW50UHJvamVjdDtcblxuICAgIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0ge1xuICAgICAgICAgICAgcHJvamVjdE5hbWUsIFxuICAgICAgICAgICAgdGFza0FycjogW10sXG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0SXRlbSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0Q3VycmVudFByb2plY3QgPSAoKSA9PiBjdXJyZW50UHJvamVjdDtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnByb2plY3ROYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlRGVmYXVsdFByb2plY3QgPSAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3QoJ0RlZmF1bHQnKTtcbiAgICAgICAgc2V0Q3VycmVudFByb2plY3QoJ0RlZmF1bHQnKVxuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHByb2plY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlUHJvamVjdCwgZ2V0UHJvamVjdHMsIGdldEN1cnJlbnRQcm9qZWN0LCBzZXRDdXJyZW50UHJvamVjdCwgY3JlYXRlRGVmYXVsdFByb2plY3QsIGRlbGV0ZVByb2plY3QgfVxufSkoKVxuXG4vKlxuICogVGFzazE6IGNyZWF0ZSBhIGRlbGV0ZSBmdW5jdGlvbiB0aGF0IGRlbGV0ZXMgYSBwcm9qZWN0IGFuZC9vciB0YXNrc1xuRmlyc3QgSSBuZWVkIHRvIGFkZCB0aGUgMyBkb3RzIGFzIGFuIG9wdGlvbiB0byBlYWNoIHRhc2sgYW5kIHByb2plY3RcbldoZW4gZGVsZXRlIGlzIGNsaWNrZWRcbkRlbGV0ZSB0aGF0IHByb2plY3QvdGFzayBmcm9tIGl0cyBjb3JyZXNwb25kaW5nIGFycmF5IGFuZCB0aGVuIGNhbGwgZGlzcGxheVByb2plY3RzL2Rpc3BsYXlUYXNrc0luUHJvamVjdCBhZ2FpblxuKi9cblxuXG5cblxuXG4gLyogVGFzazI6IGNyZWF0ZSBhbiBlZGl0IGZ1bmN0aW9uIHdoZXJlIHlvdSBjYW4gZWRpdCBwcm9qZWN0J3MgbmFtZSBhbmQvb3IgYSB0YXNrXG5XaGVuIHRoZSBlZGl0IGJ1dHRvbiBpcyBjbGlja2VkLCBcbnNob3cgYSBjb250YWluZXIvZGl2L2Zvcm0gdGhhdCBjb250YWlucyB0aGF0IHRhc2sncyBjdXJyZW50IG5hbWUsIGRlc2NyaXB0aW9uIGFuZCBkYXRlXG53aWxsIGhhdmUgdG8gYWRkIHRoZSBjdXJyZW50IG5hbWUsIGRlc2NyaXB0aW9uIGFuZCBkYXRlIHRvIHRoYXQgZm9ybSBcbmFuZCB0aGVuIHdoZW4gZm9ybSBpcyBzdWJtaXR0ZWRcbmRpc3BsYXkgdGFza3Mgb3IgcHJvamVjdCBhZ2FpbiBzbyB0aGF0IGl0IHNlZW1zIGl0IHdhcyBlZGl0ZWRcblxuXG5cbiAqIFRhc2szOiBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdGhlIGNvbG9yIG9mIHRoZSBjdXJyZW50IHByb2plY3Qgc28gdGhhdCB3ZSBrbm93IHdoaWNoIHByb2plY3QgdGhlIHRhc2tzIGFyZSBnb2luZyBpbnRvXG5UaGlzIHdpbGwgYmUgZWFzeTsganVzdCB1c2UgdGhlIGdldEN1cnJlbnRQcm9qZWN0IGFuZCBjaGFuZ2UgdGhlIGNvbG9yIG9mIHRoYXRcbiAqLyIsImltcG9ydCB7IHRvZG8sIHByb2plY3QgfSBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgc3RhciBmcm9tICcuLi9pY29ucy9zdGFyLW91dGxpbmUuc3ZnJ1xuaW1wb3J0IGNsb3NlIGZyb20gJy4uL2ljb25zL2Nsb3NlLnBuZydcbmltcG9ydCBvcHRpb24gZnJvbSAnLi4vaWNvbnMvbW9yZS12ZXJ0aWNhbC1hbHQuc3ZnJ1xuXG4vL2F0dGFjaGVzIGV2ZW50TGlzdGVuZXIgZm9yIHdoZW4gdGFza0Zvcm0gaXMgc3VibWl0dGVkXG5leHBvcnQgY29uc3QgbWFrZVRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xuXG4gICAgICAgIHRvZG8uY3JlYXRlVG9kbyh0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUudmFsdWUpO1xuICAgICAgIFxuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcblxuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9KVxufSAgIFxuXG4vL2F0dGFjaGVzIGV2ZW50TGlzdGVuZXIgZm9yIHdoZW4gcHJvamVjdEZvcm0gaXMgc3VibWl0dGVkXG5leHBvcnQgY29uc3QgbWFrZVByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgcHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuXG4gICAgICAgIHByb2plY3QuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuXG4gICAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pXG59XG5cbi8vbWFrZSB0aGlzIHRoZSBkaXNwbGF5ICdBTEwgVE9ET1MnIGZ1bmN0aW9uIHdoZW4gJ0FMTCBUQVNLUycgaXMgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IGRpc3BsYXlUb2RvcyA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpO1xuXG4gICAgLy9kZWxldGVzIGFsbCB0aGUgY3VycmVudGx5IGRpc3BsYXllZCB0YXNrc1xuICAgIHRhc2tzLnRleHRDb250ZW50ID0gJyAnO1xuICAgIC8vdGhlbiBkaXNwbGF5cyB0aGVtIHRvIGF2b2lkIGR1cGxpY2F0aW9uIG9mIHRhc2tzIGJlaW5nIGRpc3BsYXllZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kby5nZXRUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZG9zKClbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheVByb2plY3RzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1jb250YWluZXInKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gJyAnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldFByb2plY3RzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICBcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0UHJvamVjdHMoKVtpXS5wcm9qZWN0TmFtZTtcbiAgICAgICAgb3B0aW9ucy5zcmMgPSBjbG9zZTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW9wdGlvbnMnKTtcbiAgICAgICAgLy9vcHRpb25zLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25zKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgICBkZWxldGVQcm9qZWN0KCk7XG4gICAgc2hvd1Rhc2tzSW5Qcm9qZWN0KCk7XG4gICAgXG59XG4vL3JlbmFtZSB0aGlzIGZ1bmN0aW9uIGxhdGVyXG4vL3doZW4gYW55IG9mIHRoZSBwcm9qZWN0cyBhcmUgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IHNob3dUYXNrc0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWhlYWRlcicpXG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHByb2plY3ROYW1lSGVhZGVyLnRleHRDb250ZW50ID0gYCR7ZS50YXJnZXQudGV4dENvbnRlbnR9YFxuICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdCBjbGlja2VkJylcbiAgICAgICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgICAgIHByb2plY3Quc2V0Q3VycmVudFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpO1xuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcbiAgICB9KSlcbn1cbi8vaGF2ZSB0byBhZGQgYSBkZWxldGUgdGFza3MgZnVuY3Rpb24gdGhhdCBkZWxldGVzIHRoZSB0YXNrcyBvbiB0aGUgcGFnZSBpZiB0aGUgY3VycmVudCBwcm9qZWN0IGlzIHRoZSBvbmUgdGhhdCBnb3QgZGVsZXRlZFxuLy9iZWNhdXNlIGl0IHN0aWxsIHNob3dzIHRoZSBwcmV2aW91cyB0YXNrcyBldmVuIGlmIHRoYXQgcHJvamVjdCBnb3QgZGVsZXRlZFxuY29uc3QgZGlzcGxheVRhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKTtcbiAgICB0YXNrQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyAnO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgYnRuQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGxldCBpbXBvcnRhbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZHVlRGF0ZTtcbiAgICAgICAgaW1wb3J0YW50LnNyYyA9IHN0YXI7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gb3B0aW9uO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKVxuICAgICAgICBpbXBvcnRhbnQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgICAgIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgndGFzay1vcHRpb25zJyk7XG5cbiAgICAgICAgYnRuQ29udC5hcHBlbmRDaGlsZChpbXBvcnRhbnQpO1xuICAgICAgICBidG5Db250LmFwcGVuZENoaWxkKG9wdGlvbnMpXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChidG5Db250KTtcbiAgICBcbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xlYXJUYXNrQ29udGFpbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza3MnKTtcbiAgICB0YXNrQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyAnO1xufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheURlZmF1bHRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIHByb2plY3QuY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcbiAgICBkaXNwbGF5UHJvamVjdHMoKTtcbn1cblxuLy93aGVuIHlvdSBkZWxldGUgYSBwcm9qZWN0LCBpdCBzdGlsbCBzaG93cyB0aGUgY3VycmVudCB0YXNrcyBpbiB0aGF0IHByb2plY3QgKGlmIHlvdSBjbGlja2VkIGl0IGJlZm9yZSBkZWxldGluZylcbmV4cG9ydCBjb25zdCBkZWxldGVQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3Qtb3B0aW9ucycpO1xuXG4gICAgcHJvamVjdE9wdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZVByb2plY3QoZS50YXJnZXQucHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50KTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG4gICAgfSkpXG59XG5cbi8vc2hvd3MgaGlkZGVuIHRhc2sgZm9ybVxuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKSk7XG4gICAgbWFrZVRvZG8oKTtcbn1cblxuLy9zaG93cyBoaWRkZW4gcHJvamVjdCBmb3JtXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKSk7XG4gICAgbWFrZVByb2plY3QoKTtcbn1cblxuLy9zaG93IGNsb3NlIGJ1dHRvbiB3aGVuIGhvdmVyIG92ZXIgcHJvamVjdCBsYXRlclxuLypcbmNvbnN0IHNob3dDbG9zZUJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0Jyk7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcbiAgICAgICAgZS50YXJnZXQubGFzdENoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pKVxufSovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiLi9tb2R1bGVzL2NvbnRyb2xsZXJcIjtcbmV2ZW50SGFuZGxlcnMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==