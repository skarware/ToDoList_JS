const form = document.querySelector('form');
const inputValue = document.getElementById('newTask');
const clearButton = document.getElementById('clearButton');
const ul = document.querySelector('ul');

// load array if localStorage not empty
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
// save itemsArray into localStorage
function saveItemsArray() {
    localStorage.setItem('items', JSON.stringify(itemsArray))
}
saveItemsArray();

// event listener for input form
form.addEventListener("submit", ev => {
    ev.preventDefault()
    itemsArray.push(inputValue.value) // push input into array
    localStorage.setItem('items', JSON.stringify(itemsArray)) // localStorage.setItem('key', 'value')
    // liMaker(input.value) // create new ul list element only on submit
    getTaskList(); // render all ul list elements on submit
    inputValue.value = ''
});

clearButton.addEventListener("click", clearTaskList);

// Arrow function for creating li element
const liMaker = text => {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
}

function getTaskList() {
    // clean the list before printing
    ul.innerText = ""
    // show localStorage items if not empty
    if (localStorage.items.length > 2) { // not empty is more than 2
        // localStorage.getItem('key');
        const data = JSON.parse(localStorage.getItem('items'));
        // create list of persons
        data.forEach(item => {
            liMaker(item)
        })
    } else {
        ul.innerText = "Guest List is empty"
    }
}

function clearTaskList(e) {
    // remove list from localStorage
    localStorage.clear();
    // clear list of array
    itemsArray.length = 0;
    // override itemsArray list from localStorage
    saveItemsArray();
    // remove list from DOM
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
}


// on first load show to do list
getTaskList();
