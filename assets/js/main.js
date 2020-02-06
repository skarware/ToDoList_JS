const form = document.querySelector('form');
const inputValue = document.getElementById('newTask');
const clearButton = document.getElementById('clearButton');
const divTasksContainer = document.getElementById('tasks-container');
const ulTodo = document.querySelector('#toDoTasks ul');
const ulDone = document.querySelector('#completedTasks ul');
const h2Todo = document.querySelector('#toDoTasks h2');
const h2Done = document.querySelector('#completedTasks h2');

// load array if localStorage not empty
let tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []; // localStorage.getItem('key');

// setup NewId
let nextId = tasksArray.length;

// save tasksArray into localStorage
function saveTasksArray() {
    localStorage.setItem('tasks', JSON.stringify(tasksArray))   // localStorage.setItem('key', 'value')
}

// event listener for input form
form.addEventListener("submit", ev => {
    ev.preventDefault();
    // push new task into array
    tasksArray.push(
        {
            id: nextId,
            title: inputValue.value,
            done: false
        }
    );
    // increase Id number
    nextId++;
    // save to localStorage
    saveTasksArray();
    // render all ul list elements on submit
    getTaskList();
    // reset inputValue to empty string
    inputValue.value = '';
});

clearButton.addEventListener("click", clearTaskList);

// Arrow function for creating li element
const liMaker = task => {
    // check if task is not null
    if (task === null) {
        console.error("Error: Got null instead of information!");
    }
    // append li element inside ul
    const li = document.createElement('li');
    // set task title from tasks array
    li.textContent = task.title;
    // append id from task object to li element
    li.id = task.id;
    // if checked then add class checked to li element and append to completed ul list
    if (task.done) {
        li.className = "checked";
        ulDone.append(li);
    } else {
        // if task unchecked then append it ToDo ul list
        ulTodo.append(li);
    }
    // append Edit button to li element
    const spanEdit = document.createElement('span');
    const editTextButton = document.createTextNode("\u2056");
    spanEdit.className = "edit";
    spanEdit.append(editTextButton);
    li.append(spanEdit);
    // append Close button to li element
    const spanClose = document.createElement('span');
    const xTextButton = document.createTextNode("\u00D7");
    spanClose.className = "close";
    spanClose.append(xTextButton);
    li.append(spanClose);
};

function getTaskList() {
    // initialize some local variables
    let isToDoListEmpty = true;
    let isDoneListEmpty = true;
    // clean the both ul lists before printing
    ulTodo.innerText = "";
    ulDone.innerText = "";
    // Set/reset h2s content
    h2Todo.textContent = "Tasks To Do";
    h2Done.textContent = "Completed Tasks";
    // show localStorage tasks if not empty
    if (localStorage.tasks.length > 2) { // not empty is more than 2
        // create list of persons
        tasksArray.forEach(task => {
            if (task != null) {
                liMaker(task);
                if (task.done) {
                    isDoneListEmpty = false;
                } else {
                    isToDoListEmpty = false;
                }
            }
        })
    }
    // Check if To Do or Completed tasks list is empty and should not be displayed
    if (isToDoListEmpty) {
        h2Todo.style.display = "none";
    } else {
        h2Todo.style.display = "block";
    }
    if (isDoneListEmpty) {
        h2Done.style.display = "none";
    } else {
        h2Done.style.display = "block";
    }
    // if both lists empty inform the user
    if (isToDoListEmpty && isDoneListEmpty) {
        h2Todo.textContent = "Task list is empty";
        h2Todo.style.display = "block";
    }
}

function clearTaskList(e) {
    // remove list from localStorage
    localStorage.clear();
    // clear list of array
    tasksArray.length = 0;
    // override tasksArray list from localStorage
    saveTasksArray();
    // remove list from DOM
    while (ulTodo.firstChild) {
        ulTodo.removeChild(ulTodo.firstChild)
    }
    while (ulDone.firstChild) {
        ulDone.removeChild(ulDone.firstChild)
    }
    // Render DOM after modification
    getTaskList();
}

// Event Listener for mark task as done or delete it
divTasksContainer.addEventListener('click', ev => {
    // Add a "checked" symbol and strike out task when clicking on a list task
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        // update done flag/property in array's object
        tasksArray.forEach(task => {
            if (task != null) {
                if (task.id.toString() === ev.target.id.toString()) {
                    task.done = !task.done;
                }
            }
        });
    }
    // Edit task when clicking on a list tasks's edit button
    if (ev.target.className === 'edit') {
        // edit clicked task in array
        tasksArray.forEach(task => {
            if (task != null) {
                if (task.id.toString() === ev.target.parentElement.id.toString()) {
                    // functionToEditTaskInArray();
                    // delete tasksArray[tasksArray.indexOf(task)];
                    console.log("edit button clicked for id: ", tasksArray.indexOf(task))
                }
            }
        });
    }
    // Delete task when clicking on a list tasks's delete button
    if (ev.target.className === 'close') {
        // delete clicked task from array
        tasksArray.forEach(task => {
            if (task != null) {
                if (task.id.toString() === ev.target.parentElement.id.toString()) {
                    delete tasksArray[tasksArray.indexOf(task)];
                }
            }
        });
    }
    // After any modification on array save changes to localStorage and rerender DOM
    // save modified array to localStorage
    saveTasksArray();
    // Render DOM after modification
    getTaskList();

}, false);


// on first load show to do list
getTaskList();