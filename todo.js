const todoCheck = document.querySelector('.todo-visile');
const todoContainer = document.querySelector('.todo_list');
const todo = document.querySelector('.todo');
const buttonTodo = document.querySelector('.add');
const inputTodo = document.querySelector('.input-todo-text');

todoCheck.addEventListener('click', () => {
    todoContainer.classList.toggle('visible');
})
let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}


buttonTodo.addEventListener('click', () => {
    let newTodo = {
        todo: inputTodo.value,
        checked: false
    };
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))
})


function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
        displayMessage += `
        <li>
           <input type ='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
           <label for='item_${i}' class = '${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    })
}

todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            todoList.splice(i, 1)
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})