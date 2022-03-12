const todoinput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todolist");
const filteroption = document.querySelector(".filter-todos");
todobutton.addEventListener("click", addtodo);
todolist.addEventListener("click", checkremove);
filteroption.addEventListener("click", filtertodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);

function addtodo(e) {
  e.preventDefault();
  if (todoinput.value != "") {
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    const newtodo = `
    <span><i class="bx bx-check-circle bx-sm"></i></span> 
    <li>${todoinput.value}</li>
    <span><i class="bx bx-trash bx-sm"></i></span>`;
    tododiv.innerHTML = newtodo;
    todolist.appendChild(tododiv);
    saveLocalTodos(todoinput.value);
  }
  todoinput.value = "";
}

function checkremove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  if (classList[1] === "bx-check-circle") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  } else if (classList[1] === "bx-trash") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}
function filtertodos(e) {
  const todos = [...todolist.childNodes];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  savedTodos.forEach((todo) => {
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    const newtodo = `
    <span><i class="bx bx-check-circle bx-sm"></i></span>
    <li class="todo-item">
    ${todo}</li>
    <span><i class="bx bx-trash bx-sm"></i></span>`;
    tododiv.innerHTML = newtodo;
    todolist.appendChild(tododiv);
  });
}

function removeLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedTodos.filter(
    (t) => t !== todo.children[1].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
