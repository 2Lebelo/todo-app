
// Encapsulate all logic in an IIFE to avoid polluting the global namespace
(function () {
    // DOM element references
    const todoForm = document.querySelector('form');
    const todoInput = document.getElementById('todo-input');
    const todoListUl = document.getElementById('to-list');

    // Retrieve todos from localStorage or initialize as empty array
    let allTodos = getTodos();
    updateTodoList();

    // Handle form submission to add a new todo
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo();
    });

    //  Add a new todo to the list and update UI/storage
     
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText.length > 0) {
            const todoObject = {
                text: todoText,
                completed: false
            };
            allTodos.push(todoObject);
            updateTodoList();
            saveTodos();
            todoInput.value = '';
        }
    }

    //  Render the todo list in the DOM
     
    function updateTodoList() {
        todoListUl.innerHTML = '';
        allTodos.forEach((todo, todoIndex) => {
            const todoItem = createTodoItem(todo, todoIndex);
            todoListUl.append(todoItem);
        });
    }

    /**
     * Create a single todo list item element
     * @param {Object} todo - The todo object
     * @param {number} todoIndex - The index of the todo in the array
     * @returns {HTMLElement} The list item element
     */
    function createTodoItem(todo, todoIndex) {
        const todoID = `todo-${todoIndex}`;
        const todoLi = document.createElement('li');
        todoLi.className = 'todo';
        todoLi.innerHTML = `
            <input id="${todoID}" type="checkbox" class="todo-1">
            <label class="custom-checkbox" for="${todoID}">
                <!-- checkbox icon svg -->
                <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" aria-hidden="true" focusable="false">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
            </label>
            <label for="${todoID}" class="todo-text">${todo.text}</label>
            <button class="delete-button" aria-label="Delete todo">
                <!-- delete icon svg -->
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" aria-hidden="true" focusable="false">
                    <path fill="#e3e3e3" d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </button>
        `;

        // Delete button event
        const deleteButton = todoLi.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTodoItem(todoIndex);
        });

        // Checkbox event
        const checkbox = todoLi.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            allTodos[todoIndex].completed = checkbox.checked;
            saveTodos();
        });
        checkbox.checked = todo.completed;

        return todoLi;
    }

    /**
     * Delete a todo by index
     * @param {number} todoIndex
     */
    function deleteTodoItem(todoIndex) {
        allTodos = allTodos.filter((_, i) => i !== todoIndex);
        saveTodos();
        updateTodoList();
    }

    /**
     * Save todos to localStorage
     */
    function saveTodos() {
        const todosJSON = JSON.stringify(allTodos);
        localStorage.setItem('todos', todosJSON);
    }

    /**
     * Get todos from localStorage, with error handling
     * @returns {Array} Array of todo objects
     */
    function getTodos() {
        try {
            const todos = localStorage.getItem('todos');
            return todos ? JSON.parse(todos) : [];
        } catch (e) {
            // If parsing fails, clear storage and return empty array
            localStorage.removeItem('todos');
            return [];
        }
    }

})();