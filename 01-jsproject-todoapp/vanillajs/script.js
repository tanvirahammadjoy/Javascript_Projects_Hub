// script.js

let todoContainer = document.querySelector(".content-box");
let addBtn = document.querySelector(".add-todo");
let deleteBtn = document.querySelector(".fa-trash");
let saveBtn = document.querySelector(".save-note");
// Removed the global editInput
// let editInput = document.querySelector(".edit-text");

let todoText = [];
console.log(todoText);

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todoText));
}

saveBtn.addEventListener("click", () => {
  saveToLocalStorage();
  console.log("I am save button...");
});

addBtn.addEventListener("click", function () {
  addTodo();
});

function addTodo() {
  let inputTodo = document.querySelector(".text-input").value;

  if (inputTodo === "") {
    let message = document.querySelector(".message-modal");
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
    return;
  }

  let todoList = `
    <li class="todo-list">
      <input
        class="edit-text"
        type="text"
        placeholder="Enter your text..."
        style="display: none;"
      />
      <span class="todo-text">${inputTodo}</span>
      <div>
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i>
      </div>
    </li>
  `;
  todoText.push(inputTodo);
  console.log(todoText);
  saveToLocalStorage();

  todoContainer.insertAdjacentHTML("beforeend", todoList);

  document.querySelector(".text-input").value = "";
}

// Event listener for the entire todoContainer
todoContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-trash")) {
    // Delete the todo item
    const todoItem = event.target.closest(".todo-list");
    const todoIndex = Array.from(todoContainer.children).indexOf(todoItem);
    if (todoItem) {
      todoContainer.removeChild(todoItem);
      todoText.splice(todoIndex, 1);
      saveToLocalStorage();
      console.log(todoText);
    }
  }

  if (event.target.classList.contains("fa-pen-to-square")) {
    // Edit the todo item
    const todoItem = event.target.closest(".todo-list");
    if (todoItem) {
      const todoSpan = todoItem.querySelector(".todo-text");
      const editInput = todoItem.querySelector(".edit-text");

      todoSpan.style.display = "none";
      editInput.style.display = "block";
      editInput.value = todoSpan.textContent;
      editInput.focus();

      // Save changes on Enter key
      editInput.addEventListener(
        "keypress",
        function (e) {
          if (e.key === "Enter") {
            console.log(e.key);
            const newTodo = editInput.value.trim();
            if (newTodo) {
              todoSpan.textContent = newTodo;
              todoSpan.style.display = "block";
              editInput.style.display = "none";
              const todoIndex = Array.from(todoContainer.children).indexOf(
                todoItem
              );
              todoText[todoIndex] = newTodo;
              saveToLocalStorage();
            }
          }
        }
        // { once: true }
      );

      // Save changes on blur
      editInput.addEventListener(
        "blur",
        function () {
          const newTodo = editInput.value.trim();
          if (newTodo) {
            todoSpan.textContent = newTodo;
            todoSpan.style.display = "block";
            editInput.style.display = "none";
            const todoIndex = Array.from(todoContainer.children).indexOf(
              todoItem
            );
            todoText[todoIndex] = newTodo;
            saveToLocalStorage();
          } else {
            // If input is empty, revert to original text
            todoSpan.style.display = "block";
            editInput.style.display = "none";
          }
        }
        // { once: true }
      );

      // save clicking on save button
      saveBtn.addEventListener("click", () => {
        const newTodo = editInput.value.trim();
        if (newTodo) {
          todoSpan.textContent = newTodo;
          todoSpan.style.display = "block";
          editInput.style.display = "none";
          const todoIndex = Array.from(todoContainer.children).indexOf(
            todoItem
          );
          todoText[todoIndex] = newTodo;
          saveToLocalStorage();
        } else {
          // If input is empty, revert to original text
          todoSpan.style.display = "block";
          editInput.style.display = "none";
        }
      });
    }
  }
});

function loadTodo() {
  let savedTodos = JSON.parse(localStorage.getItem("todo"));
  if (savedTodos) {
    todoText = savedTodos;
    console.log(todoText);

    todoText.forEach((element) => {
      renderTodo(element);
    });
  }
}

function renderTodo(inputTodo) {
  let todoList = `
    <li class="todo-list">
      <input
        class="edit-text"
        type="text"
        placeholder="Enter your text..."
        style="display: none;"
      />
      <span class="todo-text">${inputTodo}</span>
      <div>
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i>
      </div>
    </li>
  `;
  todoContainer.insertAdjacentHTML("beforeend", todoList);
}

document.addEventListener("DOMContentLoaded", loadTodo);
