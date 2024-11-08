// script.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".inputText");
  const addBtn = document.querySelector(".addBtn");
  const todoList = document.querySelector(".todo-list-container");

  const modalEmpty = document.querySelector(".message-modal-ifEmpty");
  const modalSuccess = document.querySelector(".message-modal-ifSuccess");
  const modalDeleted = document.querySelector(".message-modal-ifdeleted");
  const modalEdited = document.querySelector(".message-modal-ifEdited");

  let todos = [];
  let editMode = false;
  let editId = null;

  // Define the API base URL
  const API_BASE_URL = "http://localhost:5000/api/todos"; // Adjust the port if different

  // Fetch and display todos on page load
  fetchTodos();

  // Add Todo Event
  addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") {
      showModal(modalEmpty);
      return;
    }

    if (editMode) {
      // Edit existing todo
      updateTodo(editId, text);
    } else {
      // Add new todo
      createTodo(text);
    }
  });

  // Function to fetch todos from the server
  function fetchTodos() {
    fetch(API_BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        todos = data;
        renderTodos();
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        showModal(modalEmpty); // Optionally show an error modal
      });
  }

  // Function to create a new todo
  function createTodo(text) {
    fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((newTodo) => {
        todos.unshift(newTodo); // Add to the beginning
        renderTodos();
        input.value = "";
        showModal(modalSuccess);
      })
      .catch((err) => {
        console.error("Error creating todo:", err);
        showModal(modalEmpty); // Optionally show an error modal
      });
  }

  // Function to update an existing todo
  function updateTodo(id, text) {
    fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((updatedTodo) => {
        const index = todos.findIndex((todo) => todo._id === id);
        if (index !== -1) {
          todos[index] = updatedTodo;
          renderTodos();
          input.value = "";
          editMode = false;
          editId = null;
          addBtn.textContent = "Add";
          showModal(modalEdited);
        }
      })
      .catch((err) => {
        console.error("Error updating todo:", err);
        showModal(modalEmpty); // Optionally show an error modal
      });
  }

  // Function to delete a todo
  function deleteTodo(id) {
    fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        todos = todos.filter((todo) => todo._id !== id);
        renderTodos();
        showModal(modalDeleted);
      })
      .catch((err) => {
        console.error("Error deleting todo:", err);
        showModal(modalEmpty); // Optionally show an error modal
      });
  }

  // Function to render todos to the DOM
  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "list-item";

      const textBox = document.createElement("div");
      textBox.className = "li-text-box";

      const span = document.createElement("span");
      span.className = "span-text";
      span.textContent = todo.text;

      textBox.appendChild(span);

      const btnBox = document.createElement("div");
      btnBox.className = "li-btn-box";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-text";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        input.value = todo.text;
        editMode = true;
        editId = todo._id;
        addBtn.textContent = "Save";
      });

      const delBtn = document.createElement("button");
      delBtn.className = "del-text";
      delBtn.textContent = "Del";
      delBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this todo?")) {
          deleteTodo(todo._id);
        }
      });

      btnBox.appendChild(editBtn);
      btnBox.appendChild(delBtn);

      li.appendChild(textBox);
      li.appendChild(btnBox);

      todoList.appendChild(li);
    });
  }

  // Function to show modal messages
  function showModal(modal) {
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
    }, 2000);
  }
});
