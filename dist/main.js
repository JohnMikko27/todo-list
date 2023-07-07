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

    ;(0,_ui__WEBPACK_IMPORTED_MODULE_0__.makeTodo)();
    //maybe add these eventListeneres in ui.js
    //put them in a function
    addTask.addEventListener('click', () => taskForm.classList.toggle('hidden'));

    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.makeProject)();
    addProject.addEventListener('click', () => {
        //console.log('hi')
        projectForm.classList.toggle('hidden');
    });
    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.showTasksInProject)();
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
    const getProjects = () => projects;

    const createProject = (projectName) => {
        const projectItem = {
            projectName
        }
        projects.push(projectItem);
    }

    return { createProject, getProjects }
})()



/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearTaskContainer: () => (/* binding */ clearTaskContainer),
/* harmony export */   displayProjects: () => (/* binding */ displayProjects),
/* harmony export */   displayTodos: () => (/* binding */ displayTodos),
/* harmony export */   makeProject: () => (/* binding */ makeProject),
/* harmony export */   makeTodo: () => (/* binding */ makeTodo),
/* harmony export */   showTasksInProject: () => (/* binding */ showTasksInProject)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");
//change the dom


//able to get the form's values when it submits now
const makeTodo = () => {
    const taskForm = document.querySelector('#task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#date');

        //console.log(title.value, description.value, date.value);
        _todo__WEBPACK_IMPORTED_MODULE_0__.todo.createTodo(title.value, description.value, dueDate.value);
        //console.log(todo.getTodos());
        displayTodos();

        taskForm.reset();
        taskForm.classList.toggle('hidden');
    })
}   

const makeProject = () => {
// on the click of the add project button
// show a modal that asks for the project name with  'add' and 'cancel' buttons
// if 'add' is clicked create a new project from todo.js and push it into 'projects' array
    const projectForm = document.querySelector('#project-form');
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.querySelector('#project-name');

        _todo__WEBPACK_IMPORTED_MODULE_0__.project.createProject(projectName.value);
        displayProjects();

        projectForm.reset();
        projectForm.classList.toggle('hidden');
    })
// and then create a function to display all projects

}

const displayTodos = () => {
    const tasks = document.querySelector('#tasks');

    //deletes all the currently displayed tasks
    //then displays them to avoid duplication of tasks being displayed
    tasks.textContent = ' ';
    
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos().length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos()[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos()[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.todo.getTodos()[i].dueDate;

        taskContainer.setAttribute('id', 'task-container');

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
        const div = document.createElement('div');
        div.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects()[i].projectName;
        div.classList.add('project');
        projectContainer.appendChild(div);
    }
}

//when any of the projects are clicked
const showTasksInProject = () => {
    console.log('hi')
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => project.addEventListener('click', (e) => {
        //make the right side content's tasks-container blank, but leave the 'add-task' button
        clearTaskContainer();
        console.log('hi im a project')
    }))
}

const clearTaskContainer = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
}
//get the tasks that are in that project and display them
//to do this ^^^ maybe have an array in each project item that contains all the tasks in that project
//and also have a function called get current project/directory to set the current project everytime a project is clicked
//so that when we display the project, we can get the correct tasks

//big question for this, how are we going to track every task in a project or how are we going to know which
// is the current project so that we can display the correct tasks

//another idea: have an array in each projectItem object and a function that adds tasks to that project 
//(which is why current project function is needed)



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNpRTtBQUNuQzs7OztBQUl2QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLDhDQUFRO0FBQ1o7QUFDQTtBQUNBOztBQUVBLElBQUksZ0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSx1REFBa0I7QUFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDO0FBQ3ZDLEtBQUs7O0FBRUw7OztBQUdBLGFBQWE7QUFDYixDQUFDOztBQUVNO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0Q7QUFDdUM7O0FBRXZDO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx1Q0FBSTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLDBDQUFPO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLElBQUksdUNBQUksb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0Qix1Q0FBSTtBQUNoQyxrQ0FBa0MsdUNBQUk7QUFDdEMsOEJBQThCLHVDQUFJOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQixJQUFJLDBDQUFPLHVCQUF1QjtBQUN0RDtBQUNBLDBCQUEwQiwwQ0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O1VDMUdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDckQsa0VBQWEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oYW5kbGVzIGlmIGEgRE9NIGNoYW5naW5nICh1aS5qcykgYW5kIGFwcGx5aW5nIHRoZSBjb3JyZWN0IGxvZ2luIGZyb20gdG9kby5qc1xuLy9mb3IgZXhhbXBsZSwgaWYgdGhpcyBidXR0b24gaXMgY2xpY2tlZCAoYW4gZXZlbnRMaXN0ZW5lcikgaXQgd2lsbCBydW4gdGhpcyBsb2dpYyBmcm9tIHRvZG8uanMgdGhlbiBjaGFuZ2UgdGhlIERPTSBhY2NvcmRpbmdseSBpbiB1aS5qc1xuaW1wb3J0IHsgbWFrZVRvZG8sIG1ha2VQcm9qZWN0LCBzaG93VGFza3NJblByb2plY3QgfSBmcm9tIFwiLi91aVwiO1xuaW1wb3J0IHsgdG9kbyB9IGZyb20gXCIuL3RvZG9cIjtcblxuXG5cbmV4cG9ydCBjb25zdCBldmVudEhhbmRsZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIGNvbnN0IGNhbmNlbFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsLXByb2plY3QtYnV0dG9uJyk7XG4gICAgY29uc3Qgc3VibWl0UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXQtcHJvamVjdC1idXR0b24nKVxuXG4gICAgbWFrZVRvZG8oKTtcbiAgICAvL21heWJlIGFkZCB0aGVzZSBldmVudExpc3RlbmVyZXMgaW4gdWkuanNcbiAgICAvL3B1dCB0aGVtIGluIGEgZnVuY3Rpb25cbiAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJykpO1xuXG4gICAgbWFrZVByb2plY3QoKTtcbiAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdoaScpXG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pO1xuICAgIHNob3dUYXNrc0luUHJvamVjdCgpO1xufTtcbiIsIi8vIGNhbiBjcmVhdGUgdG8gZG8gaXRlbSwgZGVsZXRlLCBlZGl0LCBldGMuIFxuXG5leHBvcnQgY29uc3QgdG9kbyA9ICgoKSA9PiB7XG4gICAgbGV0IHRvZG9zID0gW107XG4gICAgXG4gICAgY29uc3QgZ2V0VG9kb3MgPSAoKSA9PiB0b2RvcztcblxuICAgIGNvbnN0IGNyZWF0ZVRvZG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0ge1xuICAgICAgICAgICAgdGl0bGUsIFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sIFxuICAgICAgICAgICAgZHVlRGF0ZSwgXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0b2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAgLy8gcmV0dXJuIHRvZG9JdGVtID8/PyBpcyB0aGlzIG5lY2Vzc2FyeT8/P1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0l0ZW0pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRvZG9zW2ldID09IHRvZG9JdGVtKSAge1xuICAgICAgICAgICAgICAgIHRvZG9zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qY29uc3QgZWRpdFRvZG8gPSAodG9kb0l0ZW0pID0+IHsgbm90IHN1cmUgaG93IHRvIGltcGxlbWVudCB0aGlzXG4gICAgfSovXG5cbiAgICBcblxuXG4gICAgcmV0dXJuIHsgZ2V0VG9kb3MsIGNyZWF0ZVRvZG8sIGRlbGV0ZVRvZG99O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IHByb2plY3QgPSAoKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0cztcblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEl0ZW0gPSB7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZVxuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdEl0ZW0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzIH1cbn0pKClcblxuIiwiLy9jaGFuZ2UgdGhlIGRvbVxuaW1wb3J0IHsgdG9kbywgcHJvamVjdCB9IGZyb20gXCIuL3RvZG9cIjtcblxuLy9hYmxlIHRvIGdldCB0aGUgZm9ybSdzIHZhbHVlcyB3aGVuIGl0IHN1Ym1pdHMgbm93XG5leHBvcnQgY29uc3QgbWFrZVRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBkYXRlLnZhbHVlKTtcbiAgICAgICAgdG9kby5jcmVhdGVUb2RvKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZS52YWx1ZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2codG9kby5nZXRUb2RvcygpKTtcbiAgICAgICAgZGlzcGxheVRvZG9zKCk7XG5cbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSlcbn0gICBcblxuZXhwb3J0IGNvbnN0IG1ha2VQcm9qZWN0ID0gKCkgPT4ge1xuLy8gb24gdGhlIGNsaWNrIG9mIHRoZSBhZGQgcHJvamVjdCBidXR0b25cbi8vIHNob3cgYSBtb2RhbCB0aGF0IGFza3MgZm9yIHRoZSBwcm9qZWN0IG5hbWUgd2l0aCAgJ2FkZCcgYW5kICdjYW5jZWwnIGJ1dHRvbnNcbi8vIGlmICdhZGQnIGlzIGNsaWNrZWQgY3JlYXRlIGEgbmV3IHByb2plY3QgZnJvbSB0b2RvLmpzIGFuZCBwdXNoIGl0IGludG8gJ3Byb2plY3RzJyBhcnJheVxuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKTtcblxuICAgICAgICBwcm9qZWN0LmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUudmFsdWUpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcblxuICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9KVxuLy8gYW5kIHRoZW4gY3JlYXRlIGEgZnVuY3Rpb24gdG8gZGlzcGxheSBhbGwgcHJvamVjdHNcblxufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheVRvZG9zID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG5cbiAgICAvL2RlbGV0ZXMgYWxsIHRoZSBjdXJyZW50bHkgZGlzcGxheWVkIHRhc2tzXG4gICAgLy90aGVuIGRpc3BsYXlzIHRoZW0gdG8gYXZvaWQgZHVwbGljYXRpb24gb2YgdGFza3MgYmVpbmcgZGlzcGxheWVkXG4gICAgdGFza3MudGV4dENvbnRlbnQgPSAnICc7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldFRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKVxuXG4gICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtY29udGFpbmVyJyk7XG4gICAgcHJvamVjdENvbnRhaW5lci50ZXh0Q29udGVudCA9ICcgJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0UHJvamVjdHMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRQcm9qZWN0cygpW2ldLnByb2plY3ROYW1lO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufVxuXG4vL3doZW4gYW55IG9mIHRoZSBwcm9qZWN0cyBhcmUgY2xpY2tlZFxuZXhwb3J0IGNvbnN0IHNob3dUYXNrc0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnaGknKVxuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcbiAgICBcbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vbWFrZSB0aGUgcmlnaHQgc2lkZSBjb250ZW50J3MgdGFza3MtY29udGFpbmVyIGJsYW5rLCBidXQgbGVhdmUgdGhlICdhZGQtdGFzaycgYnV0dG9uXG4gICAgICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgICAgICBjb25zb2xlLmxvZygnaGkgaW0gYSBwcm9qZWN0JylcbiAgICB9KSlcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyVGFza0NvbnRhaW5lciA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG4gICAgdGFza0NvbnRhaW5lci50ZXh0Q29udGVudCA9ICcgJztcbn1cbi8vZ2V0IHRoZSB0YXNrcyB0aGF0IGFyZSBpbiB0aGF0IHByb2plY3QgYW5kIGRpc3BsYXkgdGhlbVxuLy90byBkbyB0aGlzIF5eXiBtYXliZSBoYXZlIGFuIGFycmF5IGluIGVhY2ggcHJvamVjdCBpdGVtIHRoYXQgY29udGFpbnMgYWxsIHRoZSB0YXNrcyBpbiB0aGF0IHByb2plY3Rcbi8vYW5kIGFsc28gaGF2ZSBhIGZ1bmN0aW9uIGNhbGxlZCBnZXQgY3VycmVudCBwcm9qZWN0L2RpcmVjdG9yeSB0byBzZXQgdGhlIGN1cnJlbnQgcHJvamVjdCBldmVyeXRpbWUgYSBwcm9qZWN0IGlzIGNsaWNrZWRcbi8vc28gdGhhdCB3aGVuIHdlIGRpc3BsYXkgdGhlIHByb2plY3QsIHdlIGNhbiBnZXQgdGhlIGNvcnJlY3QgdGFza3NcblxuLy9iaWcgcXVlc3Rpb24gZm9yIHRoaXMsIGhvdyBhcmUgd2UgZ29pbmcgdG8gdHJhY2sgZXZlcnkgdGFzayBpbiBhIHByb2plY3Qgb3IgaG93IGFyZSB3ZSBnb2luZyB0byBrbm93IHdoaWNoXG4vLyBpcyB0aGUgY3VycmVudCBwcm9qZWN0IHNvIHRoYXQgd2UgY2FuIGRpc3BsYXkgdGhlIGNvcnJlY3QgdGFza3NcblxuLy9hbm90aGVyIGlkZWE6IGhhdmUgYW4gYXJyYXkgaW4gZWFjaCBwcm9qZWN0SXRlbSBvYmplY3QgYW5kIGEgZnVuY3Rpb24gdGhhdCBhZGRzIHRhc2tzIHRvIHRoYXQgcHJvamVjdCBcbi8vKHdoaWNoIGlzIHdoeSBjdXJyZW50IHByb2plY3QgZnVuY3Rpb24gaXMgbmVlZGVkKVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiLi9tb2R1bGVzL2NvbnRyb2xsZXJcIjtcbmV2ZW50SGFuZGxlcnMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=