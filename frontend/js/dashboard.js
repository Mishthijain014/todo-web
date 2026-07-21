const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const todoList = document.getElementById("todoList");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoInput = document.getElementById("todoInput");


async function getTodos() {
    try {
        const response = await fetch("http://localhost:5000/api/todos", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const todos = await response.json();

        displayTodos(todos);

    } catch (error) {
        console.log(error);
    }
}


function displayTodos(todos) {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        todoList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">

                <span>${todo.title}</span>

                <div>

                    <button
                        class="btn btn-warning btn-sm me-2"
                        onclick="editTodo('${todo._id}', '${todo.title}')"
                    >
                        Edit
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteTodo('${todo._id}')"
                    >
                        Delete
                    </button>

                </div>

            </li>
        `;
    });
}


addTodoBtn.addEventListener("click", addTodo);

async function addTodo() {

    const title = todoInput.value.trim();

    if (!title) {
        alert("Please enter a todo");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            todoInput.value = "";
            getTodos();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
    }
}



async function deleteTodo(id) {

    try {

        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            getTodos();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
    }

}

async function editTodo(id, currentTitle) {

    const newTitle = prompt("Edit Todo", currentTitle);

    if (!newTitle || newTitle.trim() === "") {
        return;
    }

    try {

        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: newTitle,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            getTodos();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
    }
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});


getTodos();