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
       // console.log(project.getCurrentProject().projectName)
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
    //need to set a default one to not create bugs
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

    return { createProject, getProjects, getCurrentProject, setCurrentProject }
})()

//get the tasks that are in that project and display them
    //to do this ^^^ maybe have an array in each project item that contains all the tasks in that project
    //and also have a function called get current project/directory to set the current project everytime a project is clicked
    //so that when we display the project, we can get the correct tasks

    //big question for this, how are we going to track every task in a project or how are we going to know which
    // is the current project so that we can display the correct tasks

    //another idea: have an array in each projectItem object and a function that adds tasks to that project 
    //(which is why current project function is needed)


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
      //  displayTodos();
        displayTasksInProject();
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
        //make the right side content's tasks-container blank, but leave the 'add-task' button
        console.log('hi magandang ppl')
        clearTaskContainer();
        
        //get the tasks that are in that project and display them
    //to do this ^^^ maybe have an array in each project item that contains all the tasks in that project
    //and also have a function called get current project/directory to set the current project everytime a project is clicked
    //so that when we display the project, we can get the correct tasks
        _todo__WEBPACK_IMPORTED_MODULE_0__.project.setCurrentProject(e.target.textContent);
        displayTasksInProject();



    //big question for this, how are we going to track every task in a project or how are we going to know which
    // is the current project so that we can display the correct tasks

    //another idea: have an array in each projectItem object and a function that adds tasks to that project 
    //(which is why current project function is needed)

        
    }))
}

const displayTasksInProject = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
    let current = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getProjects();
    for (let i = 0; i < _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr.length; i++) {
        let taskContainer = document.createElement('div');
        let title = document.createElement('div');
        let description = document.createElement('div');
        let dueDate = document.createElement('div');

        title.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].title;
        description.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].description;
        dueDate.textContent = _todo__WEBPACK_IMPORTED_MODULE_0__.project.getCurrentProject().taskArr[i].dueDate;

        taskContainer.setAttribute('id', 'task-container');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate)

        tasks.appendChild(taskContainer);
    }
}

const clearTaskContainer = () => {
    const taskContainer = document.querySelector('#tasks');
    taskContainer.textContent = ' ';
}



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNpRTtBQUNuQzs7OztBQUl2QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLDhDQUFRO0FBQ1o7QUFDQTtBQUNBOztBQUVBLElBQUksZ0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2QyxLQUFLOztBQUVMLGFBQWE7QUFDYixDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ3VDOztBQUV2QztBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsdUNBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQVEsMENBQU87QUFDZjs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSSx1Q0FBSSxvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLHVDQUFJO0FBQ2hDLGtDQUFrQyx1Q0FBSTtBQUN0Qyw4QkFBOEIsdUNBQUk7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSSwwQ0FBTyx1QkFBdUI7QUFDdEQ7QUFDQSwwQkFBMEIsMENBQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwQ0FBTztBQUNmOzs7O0FBSUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwQ0FBTztBQUN6QixvQkFBb0IsSUFBSSwwQ0FBTyxxQ0FBcUM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLDBDQUFPO0FBQ25DLGtDQUFrQywwQ0FBTztBQUN6Qyw4QkFBOEIsMENBQU87O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7O1VDM0lBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDckQsa0VBQWEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9oYW5kbGVzIGlmIGEgRE9NIGNoYW5naW5nICh1aS5qcykgYW5kIGFwcGx5aW5nIHRoZSBjb3JyZWN0IGxvZ2luIGZyb20gdG9kby5qc1xuLy9mb3IgZXhhbXBsZSwgaWYgdGhpcyBidXR0b24gaXMgY2xpY2tlZCAoYW4gZXZlbnRMaXN0ZW5lcikgaXQgd2lsbCBydW4gdGhpcyBsb2dpYyBmcm9tIHRvZG8uanMgdGhlbiBjaGFuZ2UgdGhlIERPTSBhY2NvcmRpbmdseSBpbiB1aS5qc1xuaW1wb3J0IHsgbWFrZVRvZG8sIG1ha2VQcm9qZWN0LCBzaG93VGFza3NJblByb2plY3QgfSBmcm9tIFwiLi91aVwiO1xuaW1wb3J0IHsgdG9kbyB9IGZyb20gXCIuL3RvZG9cIjtcblxuXG5cbmV4cG9ydCBjb25zdCBldmVudEhhbmRsZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIGNvbnN0IGNhbmNlbFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsLXByb2plY3QtYnV0dG9uJyk7XG4gICAgY29uc3Qgc3VibWl0UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXQtcHJvamVjdC1idXR0b24nKVxuXG4gICAgbWFrZVRvZG8oKTtcbiAgICAvL21heWJlIGFkZCB0aGVzZSBldmVudExpc3RlbmVyZXMgaW4gdWkuanNcbiAgICAvL3B1dCB0aGVtIGluIGEgZnVuY3Rpb25cbiAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJykpO1xuXG4gICAgbWFrZVByb2plY3QoKTtcbiAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdoaScpXG4gICAgICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH0pO1xufTtcbiIsIi8vIGNhbiBjcmVhdGUgdG8gZG8gaXRlbSwgZGVsZXRlLCBlZGl0LCBldGMuIFxuXG5leHBvcnQgY29uc3QgdG9kbyA9ICgoKSA9PiB7XG4gICAgbGV0IHRvZG9zID0gW107XG4gICAgXG4gICAgY29uc3QgZ2V0VG9kb3MgPSAoKSA9PiB0b2RvcztcblxuICAgIGNvbnN0IGNyZWF0ZVRvZG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0ge1xuICAgICAgICAgICAgdGl0bGUsIFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sIFxuICAgICAgICAgICAgZHVlRGF0ZSwgXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0b2Rvcy5wdXNoKHRvZG9JdGVtKTtcbiAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0LmdldEN1cnJlbnRQcm9qZWN0KCkucHJvamVjdE5hbWUpXG4gICAgICAgIHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICAvLyByZXR1cm4gdG9kb0l0ZW0gPz8/IGlzIHRoaXMgbmVjZXNzYXJ5Pz8/XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodG9kb3NbaV0gPT0gdG9kb0l0ZW0pICB7XG4gICAgICAgICAgICAgICAgdG9kb3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypjb25zdCBlZGl0VG9kbyA9ICh0b2RvSXRlbSkgPT4geyBub3Qgc3VyZSBob3cgdG8gaW1wbGVtZW50IHRoaXNcbiAgICB9Ki9cblxuICAgIHJldHVybiB7IGdldFRvZG9zLCBjcmVhdGVUb2RvLCBkZWxldGVUb2RvfTtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0ID0gKCgpID0+IHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXVxuICAgIC8vbmVlZCB0byBzZXQgYSBkZWZhdWx0IG9uZSB0byBub3QgY3JlYXRlIGJ1Z3NcbiAgICBsZXQgY3VycmVudFByb2plY3Q7XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzO1xuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdCA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IHtcbiAgICAgICAgICAgIHByb2plY3ROYW1lLCBcbiAgICAgICAgICAgIHRhc2tBcnI6IFtdLFxuICAgICAgICB9XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdEl0ZW0pO1xuICAgIH1cblxuICAgIGNvbnN0IGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4gY3VycmVudFByb2plY3Q7XG5cbiAgICBjb25zdCBzZXRDdXJyZW50UHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0c1tpXS5wcm9qZWN0TmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzLCBnZXRDdXJyZW50UHJvamVjdCwgc2V0Q3VycmVudFByb2plY3QgfVxufSkoKVxuXG4vL2dldCB0aGUgdGFza3MgdGhhdCBhcmUgaW4gdGhhdCBwcm9qZWN0IGFuZCBkaXNwbGF5IHRoZW1cbiAgICAvL3RvIGRvIHRoaXMgXl5eIG1heWJlIGhhdmUgYW4gYXJyYXkgaW4gZWFjaCBwcm9qZWN0IGl0ZW0gdGhhdCBjb250YWlucyBhbGwgdGhlIHRhc2tzIGluIHRoYXQgcHJvamVjdFxuICAgIC8vYW5kIGFsc28gaGF2ZSBhIGZ1bmN0aW9uIGNhbGxlZCBnZXQgY3VycmVudCBwcm9qZWN0L2RpcmVjdG9yeSB0byBzZXQgdGhlIGN1cnJlbnQgcHJvamVjdCBldmVyeXRpbWUgYSBwcm9qZWN0IGlzIGNsaWNrZWRcbiAgICAvL3NvIHRoYXQgd2hlbiB3ZSBkaXNwbGF5IHRoZSBwcm9qZWN0LCB3ZSBjYW4gZ2V0IHRoZSBjb3JyZWN0IHRhc2tzXG5cbiAgICAvL2JpZyBxdWVzdGlvbiBmb3IgdGhpcywgaG93IGFyZSB3ZSBnb2luZyB0byB0cmFjayBldmVyeSB0YXNrIGluIGEgcHJvamVjdCBvciBob3cgYXJlIHdlIGdvaW5nIHRvIGtub3cgd2hpY2hcbiAgICAvLyBpcyB0aGUgY3VycmVudCBwcm9qZWN0IHNvIHRoYXQgd2UgY2FuIGRpc3BsYXkgdGhlIGNvcnJlY3QgdGFza3NcblxuICAgIC8vYW5vdGhlciBpZGVhOiBoYXZlIGFuIGFycmF5IGluIGVhY2ggcHJvamVjdEl0ZW0gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uIHRoYXQgYWRkcyB0YXNrcyB0byB0aGF0IHByb2plY3QgXG4gICAgLy8od2hpY2ggaXMgd2h5IGN1cnJlbnQgcHJvamVjdCBmdW5jdGlvbiBpcyBuZWVkZWQpXG4iLCIvL2NoYW5nZSB0aGUgZG9tXG5pbXBvcnQgeyB0b2RvLCBwcm9qZWN0IH0gZnJvbSBcIi4vdG9kb1wiO1xuXG4vL2FibGUgdG8gZ2V0IHRoZSBmb3JtJ3MgdmFsdWVzIHdoZW4gaXQgc3VibWl0cyBub3dcbmV4cG9ydCBjb25zdCBtYWtlVG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aXRsZS52YWx1ZSwgZGVzY3JpcHRpb24udmFsdWUsIGRhdGUudmFsdWUpO1xuICAgICAgICB0b2RvLmNyZWF0ZVRvZG8odGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLnZhbHVlKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0b2RvLmdldFRvZG9zKCkpO1xuICAgICAgLy8gIGRpc3BsYXlUb2RvcygpO1xuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfSlcbn0gICBcblxuZXhwb3J0IGNvbnN0IG1ha2VQcm9qZWN0ID0gKCkgPT4ge1xuLy8gb24gdGhlIGNsaWNrIG9mIHRoZSBhZGQgcHJvamVjdCBidXR0b25cbi8vIHNob3cgYSBtb2RhbCB0aGF0IGFza3MgZm9yIHRoZSBwcm9qZWN0IG5hbWUgd2l0aCAgJ2FkZCcgYW5kICdjYW5jZWwnIGJ1dHRvbnNcbi8vIGlmICdhZGQnIGlzIGNsaWNrZWQgY3JlYXRlIGEgbmV3IHByb2plY3QgZnJvbSB0b2RvLmpzIGFuZCBwdXNoIGl0IGludG8gJ3Byb2plY3RzJyBhcnJheVxuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKTtcblxuICAgICAgICBwcm9qZWN0LmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUudmFsdWUpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcblxuICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9KVxuLy8gYW5kIHRoZW4gY3JlYXRlIGEgZnVuY3Rpb24gdG8gZGlzcGxheSBhbGwgcHJvamVjdHNcblxufVxuXG5leHBvcnQgY29uc3QgZGlzcGxheVRvZG9zID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG5cbiAgICAvL2RlbGV0ZXMgYWxsIHRoZSBjdXJyZW50bHkgZGlzcGxheWVkIHRhc2tzXG4gICAgLy90aGVuIGRpc3BsYXlzIHRoZW0gdG8gYXZvaWQgZHVwbGljYXRpb24gb2YgdGFza3MgYmVpbmcgZGlzcGxheWVkXG4gICAgdGFza3MudGV4dENvbnRlbnQgPSAnICc7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvLmdldFRvZG9zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby5nZXRUb2RvcygpW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZ2V0VG9kb3MoKVtpXS5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcblxuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5UHJvamVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWNvbnRhaW5lcicpO1xuICAgIHByb2plY3RDb250YWluZXIudGV4dENvbnRlbnQgPSAnICc7XG4gLy8gICBsZXQgZGF0YXNldFZhbCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0LmdldFByb2plY3RzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0UHJvamVjdHMoKVtpXS5wcm9qZWN0TmFtZTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICAgIC8vICBkaXYuZGF0YXNldC5udW1iZXIgPSBkYXRhc2V0VmFsKys7XG4gICAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG4gICAgc2hvd1Rhc2tzSW5Qcm9qZWN0KCk7XG59XG5cbi8vd2hlbiBhbnkgb2YgdGhlIHByb2plY3RzIGFyZSBjbGlja2VkXG5leHBvcnQgY29uc3Qgc2hvd1Rhc2tzSW5Qcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcbiAgICBcbiAgICBwcm9qZWN0cy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vbWFrZSB0aGUgcmlnaHQgc2lkZSBjb250ZW50J3MgdGFza3MtY29udGFpbmVyIGJsYW5rLCBidXQgbGVhdmUgdGhlICdhZGQtdGFzaycgYnV0dG9uXG4gICAgICAgIGNvbnNvbGUubG9nKCdoaSBtYWdhbmRhbmcgcHBsJylcbiAgICAgICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgICAgIFxuICAgICAgICAvL2dldCB0aGUgdGFza3MgdGhhdCBhcmUgaW4gdGhhdCBwcm9qZWN0IGFuZCBkaXNwbGF5IHRoZW1cbiAgICAvL3RvIGRvIHRoaXMgXl5eIG1heWJlIGhhdmUgYW4gYXJyYXkgaW4gZWFjaCBwcm9qZWN0IGl0ZW0gdGhhdCBjb250YWlucyBhbGwgdGhlIHRhc2tzIGluIHRoYXQgcHJvamVjdFxuICAgIC8vYW5kIGFsc28gaGF2ZSBhIGZ1bmN0aW9uIGNhbGxlZCBnZXQgY3VycmVudCBwcm9qZWN0L2RpcmVjdG9yeSB0byBzZXQgdGhlIGN1cnJlbnQgcHJvamVjdCBldmVyeXRpbWUgYSBwcm9qZWN0IGlzIGNsaWNrZWRcbiAgICAvL3NvIHRoYXQgd2hlbiB3ZSBkaXNwbGF5IHRoZSBwcm9qZWN0LCB3ZSBjYW4gZ2V0IHRoZSBjb3JyZWN0IHRhc2tzXG4gICAgICAgIHByb2plY3Quc2V0Q3VycmVudFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpO1xuICAgICAgICBkaXNwbGF5VGFza3NJblByb2plY3QoKTtcblxuXG5cbiAgICAvL2JpZyBxdWVzdGlvbiBmb3IgdGhpcywgaG93IGFyZSB3ZSBnb2luZyB0byB0cmFjayBldmVyeSB0YXNrIGluIGEgcHJvamVjdCBvciBob3cgYXJlIHdlIGdvaW5nIHRvIGtub3cgd2hpY2hcbiAgICAvLyBpcyB0aGUgY3VycmVudCBwcm9qZWN0IHNvIHRoYXQgd2UgY2FuIGRpc3BsYXkgdGhlIGNvcnJlY3QgdGFza3NcblxuICAgIC8vYW5vdGhlciBpZGVhOiBoYXZlIGFuIGFycmF5IGluIGVhY2ggcHJvamVjdEl0ZW0gb2JqZWN0IGFuZCBhIGZ1bmN0aW9uIHRoYXQgYWRkcyB0YXNrcyB0byB0aGF0IHByb2plY3QgXG4gICAgLy8od2hpY2ggaXMgd2h5IGN1cnJlbnQgcHJvamVjdCBmdW5jdGlvbiBpcyBuZWVkZWQpXG5cbiAgICAgICAgXG4gICAgfSkpXG59XG5cbmNvbnN0IGRpc3BsYXlUYXNrc0luUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tzJyk7XG4gICAgdGFza0NvbnRhaW5lci50ZXh0Q29udGVudCA9ICcgJztcbiAgICBsZXQgY3VycmVudCA9IHByb2plY3QuZ2V0UHJvamVjdHMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLnRpdGxlO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0Q3VycmVudFByb2plY3QoKS50YXNrQXJyW2ldLmRlc2NyaXB0aW9uO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdCgpLnRhc2tBcnJbaV0uZHVlRGF0ZTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndGFzay1jb250YWluZXInKTtcblxuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcblxuICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhclRhc2tDb250YWluZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrcycpO1xuICAgIHRhc2tDb250YWluZXIudGV4dENvbnRlbnQgPSAnICc7XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZXZlbnRIYW5kbGVycyB9IGZyb20gXCIuL21vZHVsZXMvY29udHJvbGxlclwiO1xuZXZlbnRIYW5kbGVycygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==