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
    const addTask = document.querySelector('#add-task');
    const taskForm = document.querySelector('#task-form');
    const addProject = document.querySelector('#add-project-button');
    const projectForm = document.querySelector('#project-form');
    const cancelProjectButton = document.querySelector('#cancel-project-button');
    const submitProjectButton = document.querySelector('#submit-project-button')

    ;(0,_ui__WEBPACK_IMPORTED_MODULE_0__.displayDefaultProject)();
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.makeTodo)();
    //maybe add these eventListeneres in ui.js
    //put them in a function
    addTask.addEventListener('click', () => taskForm.classList.toggle('hidden'));

    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.makeProject)();
    addProject.addEventListener('click', () => {
        //console.log('hi')
        projectForm.classList.toggle('hidden');
    });
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
    return { createProject, getProjects, getCurrentProject, setCurrentProject, createDefaultProject }
})()

/*
 * Task1: create a delete function that deletes a project and/or tasks
First I need to add the 3 dots as an option to each task and project
When delete is clicked
Delete that project/task from its corresponding array and then call displayProjects/displayTasksInProject again



 * Task2: create an edit function where you can edit project's name and/or a task
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
/* harmony export */   clearTaskContainer: () => (/* binding */ clearTaskContainer),
/* harmony export */   displayDefaultProject: () => (/* binding */ displayDefaultProject),
/* harmony export */   displayProjects: () => (/* binding */ displayProjects),
/* harmony export */   displayTodos: () => (/* binding */ displayTodos),
/* harmony export */   makeProject: () => (/* binding */ makeProject),
/* harmony export */   makeTodo: () => (/* binding */ makeTodo),
/* harmony export */   showTasksInProject: () => (/* binding */ showTasksInProject)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");
/* harmony import */ var _icons_star_outline_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/star-outline.svg */ "./src/icons/star-outline.svg");
/* harmony import */ var _icons_more_vertical_alt_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/more-vertical-alt.svg */ "./src/icons/more-vertical-alt.svg");




const makeTodo = () => {
    const taskForm = document.querySelector('#task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#date');

      
        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.createTodo(title.value, description.value, dueDate.value);
       
      //  displayTodos();
        displayTasksInProject();
        taskForm.reset();
        taskForm.classList.toggle('hidden');
    })
}   

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
 //   let datasetVal = 0;
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects().length; i++) {
        const div = document.createElement('div');
        div.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects()[i].projectName;
        div.classList.add('project');
      //  div.dataset.number = datasetVal++;
        projectContainer.appendChild(div);
    }
    showTasksInProject();
}

//when any of the projects are clicked
const showTasksInProject = () => {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(item => item.addEventListener('click', (e) => {
        console.log('project clicked')
        clearTaskContainer();
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.setCurrentProject(e.target.textContent);
        displayTasksInProject();
    }))
}

const displayTasksInProject = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
    
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr.length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');
        let important = document.createElement('img');
        let options = document.createElement('img');

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].dueDate;
        important.src = _icons_star_outline_svg__WEBPACK_IMPORTED_MODULE_1__;
        options.src = _icons_more_vertical_alt_svg__WEBPACK_IMPORTED_MODULE_2__;

        taskContainer.setAttribute('id', 'task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate);
        taskContainer.appendChild(important);
        taskContainer.appendChild(options);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7O0FDbEJxRDtBQUNyRCxrRUFBYSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oYW5kbGVzIGlmIGEgRE9NIGNoYW5naW5nICh1aS5qcykgYW5kIGFwcGx5aW5nIHRoZSBjb3JyZWN0IGxvZ2luIGZyb20gdG9kby5qc1xuLy9mb3IgZXhhbXBsZSwgaWYgdGhpcyBidXR0b24gaXMgY2xpY2tlZCAoYW4gZXZlbnRMaXN0ZW5lcikgaXQgd2lsbCBydW4gdGhpcyBsb2dpYyBmcm9tIHRvZG8uanMgdGhlbiBjaGFuZ2UgdGhlIERPTSBhY2NvcmRpbmdseSBpbiB1aS5qc1xuaW1wb3J0IHsgbWFrZVRvZG8sIG1ha2VQcm9qZWN0LCBzaG93VGFza3NJblByb2plY3QsIGRpc3BsYXlEZWZhdWx0UHJvamVjdCB9IGZyb20gXCIuL3VpXCI7XG5pbXBvcnQgeyB0b2RvIH0gZnJvbSBcIi4vdG9kb1wiO1xuXG5cblxuZXhwb3J0IGNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnV0dG9uJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgY29uc3QgY2FuY2VsUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwtcHJvamVjdC1idXR0b24nKTtcbiAgICBjb25zdCBzdWJtaXRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1pdC1wcm9qZWN0LWJ1dHRvbicpXG5cbiAgICBkaXNwbGF5RGVmYXVsdFByb2plY3QoKTtcbiAgICBtYWtlVG9kbygpO1xuICAgIC8vbWF5YmUgYWRkIHRoZXNlIGV2ZW50TGlzdGVuZXJlcyBpbiB1aS5qc1xuICAgIC8vcHV0IHRoZW0gaW4gYSBmdW5jdGlvblxuICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKSk7XG5cbiAgICBtYWtlUHJvamVjdCgpO1xuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2hpJylcbiAgICAgICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSk7XG59O1xuIiwiLy8gY2FuIGNyZWF0ZSB0byBkbyBpdGVtLCBkZWxldGUsIGVkaXQsIGV0Yy4gXG5cbmV4cG9ydCBjb25zdCB0b2RvID0gKCgpID0+IHtcbiAgICBsZXQgdG9kb3MgPSBbXTtcbiAgICBcbiAgICBjb25zdCBnZXRUb2RvcyA9ICgpID0+IHRvZG9zO1xuXG4gICAgY29uc3QgY3JlYXRlVG9kbyA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUpID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB7XG4gICAgICAgICAgICB0aXRsZSwgXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiwgXG4gICAgICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRvZG9zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgLy8gIGlmKHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKT09PXVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgLy8gcmV0dXJuIHRvZG9JdGVtID8/PyBpcyB0aGlzIG5lY2Vzc2FyeT8/P1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRvZG9zW2ldID09IHRvZG9JdGVtKSAge1xuICAgICAgICAgICAgICAgIHRvZG9zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKmNvbnN0IGVkaXRUb2RvID0gKHRvZG9JdGVtKSA9PiB7IG5vdCBzdXJlIGhvdyB0byBpbXBsZW1lbnQgdGhpc1xuICAgIH0qL1xuXG4gICAgcmV0dXJuIHsgZ2V0VG9kb3MsIGNyZWF0ZVRvZG8sIGRlbGV0ZVRvZG99O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IHByb2plY3QgPSAoKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgbGV0IGN1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEl0ZW0gPSB7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZSwgXG4gICAgICAgICAgICB0YXNrQXJyOiBbXSxcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3RJdGVtKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDdXJyZW50UHJvamVjdCA9ICgpID0+IGN1cnJlbnRQcm9qZWN0O1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdHNbaV0ucHJvamVjdE5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgY3JlYXRlUHJvamVjdCgnRGVmYXVsdCcpO1xuICAgICAgICBzZXRDdXJyZW50UHJvamVjdCgnRGVmYXVsdCcpXG4gICAgfVxuICAgIHJldHVybiB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzLCBnZXRDdXJyZW50UHJvamVjdCwgc2V0Q3VycmVudFByb2plY3QsIGNyZWF0ZURlZmF1bHRQcm9qZWN0IH1cbn0pKClcblxuLypcbiAqIFRhc2sxOiBjcmVhdGUgYSBkZWxldGUgZnVuY3Rpb24gdGhhdCBkZWxldGVzIGEgcHJvamVjdCBhbmQvb3IgdGFza3NcbkZpcnN0IEkgbmVlZCB0byBhZGQgdGhlIDMgZG90cyBhcyBhbiBvcHRpb24gdG8gZWFjaCB0YXNrIGFuZCBwcm9qZWN0XG5XaGVuIGRlbGV0ZSBpcyBjbGlja2VkXG5EZWxldGUgdGhhdCBwcm9qZWN0L3Rhc2sgZnJvbSBpdHMgY29ycmVzcG9uZGluZyBhcnJheSBhbmQgdGhlbiBjYWxsIGRpc3BsYXlQcm9qZWN0cy9kaXNwbGF5VGFza3NJblByb2plY3QgYWdhaW5cblxuXG5cbiAqIFRhc2syOiBjcmVhdGUgYW4gZWRpdCBmdW5jdGlvbiB3aGVyZSB5b3UgY2FuIGVkaXQgcHJvamVjdCdzIG5hbWUgYW5kL29yIGEgdGFza1xuV2hlbiB0aGUgZWRpdCBidXR0b24gaXMgY2xpY2tlZCwgXG5zaG93IGEgY29udGFpbmVyL2Rpdi9mb3JtIHRoYXQgY29udGFpbnMgdGhhdCB0YXNrJ3MgY3VycmVudCBuYW1lLCBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxud2lsbCBoYXZlIHRvIGFkZCB0aGUgY3VycmVudCBuYW1lLCBkZXNjcmlwdGlvbiBhbmQgZGF0ZSB0byB0aGF0IGZvcm0gXG5hbmQgdGhlbiB3aGVuIGZvcm0gaXMgc3VibWl0dGVkXG5kaXNwbGF5IHRhc2tzIG9yIHByb2plY3QgYWdhaW4gc28gdGhhdCBpdCBzZWVtcyBpdCB3YXMgZWRpdGVkXG5cblxuXG4gKiBUYXNrMzogY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHRoZSBjb2xvciBvZiB0aGUgY3VycmVudCBwcm9qZWN0IHNvIHRoYXQgd2Uga25vdyB3aGljaCBwcm9qZWN0IHRoZSB0YXNrcyBhcmUgZ29pbmcgaW50b1xuVGhpcyB3aWxsIGJlIGVhc3k7IGp1c3QgdXNlIHRoZSBnZXRDdXJyZW50UHJvamVjdCBhbmQgY2hhbmdlIHRoZSBjb2xvciBvZiB0aGF0XG4gKi8iLCJpbXBvcnQgeyB0b2RvLCBwcm9qZWN0IH0gZnJvbSBcIi4vdG9kb1wiO1xuaW1wb3J0IHN0YXIgZnJvbSAnLi4vaWNvbnMvc3Rhci1vdXRsaW5lLnN2ZydcbmltcG9ydCBvcHRpb25CdXR0b24gZnJvbSAnLi4vaWNvbnMvbW9yZS12ZXJ0aWNhbC1hbHQuc3ZnJ1xuXG5leHBvcnQgY29uc3QgbWFrZVRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xuXG4gICAgICBcbiAgICAgICAgdG9kby5jcmVhdGVUb2RvKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZS52YWx1ZSk7XG4gICAgICAgXG4gICAgICAvLyAgZGlzcGxheVRvZG9zKCk7XG4gICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9KVxufSAgIFxuXG5leHBvcnQgY29uc3QgbWFrZVByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgcHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuXG4gICAgICAgIHByb2plY3QuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuXG4gICAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pXG59XG5cbi8vbWFrZSB0aGlzIHRoZSBkaXNwbGF5ICdBTEwgVE9ET1MnIGZ1bmN0aW9uIHdoZW4gJ0FMTCBUQVNLUycgaXMgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IGRpc3BsYXlUb2RvcyA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpO1xuXG4gICAgLy9kZWxldGVzIGFsbCB0aGUgY3VycmVudGx5IGRpc3BsYXllZCB0YXNrc1xuICAgIHRhc2tzLnRleHRDb250ZW50ID0gJyAnO1xuICAgIC8vdGhlbiBkaXNwbGF5cyB0aGVtIHRvIGF2b2lkIGR1cGxpY2F0aW9uIG9mIHRhc2tzIGJlaW5nIGRpc3BsYXllZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kby5nZXRUb2RvcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZG9zKClbaV0uZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmdldFRvZG9zKClbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGR1ZURhdGUpXG5cbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5UHJvamVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWNvbnRhaW5lcicpO1xuICAgIHByb2plY3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnICc7XG4gLy8gICBsZXQgZGF0YXNldFZhbCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldFByb2plY3RzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0UHJvamVjdHMoKVtpXS5wcm9qZWN0TmFtZTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICAgIC8vICBkaXYuZGF0YXNldC5udW1iZXIgPSBkYXRhc2V0VmFsKys7XG4gICAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG4gICAgc2hvd1Rhc2tzSW5Qcm9qZWN0KCk7XG59XG5cbi8vd2hlbiBhbnkgb2YgdGhlIHByb2plY3RzIGFyZSBjbGlja2VkXG5leHBvcnQgY29uc3Qgc2hvd1Rhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcbiAgICBcbiAgICBwcm9qZWN0cy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0IGNsaWNrZWQnKVxuICAgICAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICAgICAgcHJvamVjdC5zZXRDdXJyZW50UHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgICAgIGRpc3BsYXlUYXNrc0luUHJvamVjdCgpO1xuICAgIH0pKVxufVxuXG5jb25zdCBkaXNwbGF5VGFza3NJblByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpO1xuICAgIHRhc2tDb250YWluZXIudGV4dENvbnRlbnQgPSAnICc7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkudGFza0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBpbXBvcnRhbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZHVlRGF0ZTtcbiAgICAgICAgaW1wb3J0YW50LnNyYyA9IHN0YXI7XG4gICAgICAgIG9wdGlvbnMuc3JjID0gb3B0aW9uQnV0dG9uO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbXBvcnRhbnQpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyVGFza0NvbnRhaW5lciA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG4gICAgdGFza0NvbnRhaW5lci50ZXh0Q29udGVudCA9ICcgJztcbn1cblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlEZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgICBwcm9qZWN0LmNyZWF0ZURlZmF1bHRQcm9qZWN0KCk7XG4gICAgZGlzcGxheVByb2plY3RzKCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgZXZlbnRIYW5kbGVycyB9IGZyb20gXCIuL21vZHVsZXMvY29udHJvbGxlclwiO1xuZXZlbnRIYW5kbGVycygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==