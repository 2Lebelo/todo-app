const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("to-list");

//Create an array to contain todo tasks.
let allTodos = getTodos();
updateTodoList();
//An eventListener that adds fires a todo function on submition click.
todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

//A function add a task into a todo array.
function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoOject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoOject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";  //Set a value to an empty string
    }
}

function updateTodoList(){
    todoListUl.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    })
}
//A function that create an item in a todo unordered list.
function createTodoItem(todo, todoIndex){
    const todoID = "todo-"+todoIndex;
    const todoLi = document.createElement("li");
    const todoText = todo.text;
    todoLi.className = "todo";
    todoLi.innerHTML = '<input id="'+todoID+'" type="checkbox" class="todo-1"> ' +
               ' <label class="custom-checkbox" for="'+todoID+'"> ' +
                    '<!-- checkbox icon svg -->' +
                    '<svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" aria-hidden="true" focusable="false">'+
                       '<path  d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />'+
                    '</svg>'+
               '</label>'+
                '<label for="'+todoID+'" class="todo-text">'+
                    todoText+
                '</label>'+
                '<button class="delete-button">'+
                    '<!-- delete icon svg -->'+
                     '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" aria-hidden="true" focusable="false">'+
                        '<path fill="#e3e3e3" d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />'+
                    '</svg>'+
                '</button>';

    const deleteButton = todoLi.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })

    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })

    checkbox.checked = todo.completed;
    return todoLi;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    const todosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJSON);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[ ]";
    return JSON.parse(todos);
}