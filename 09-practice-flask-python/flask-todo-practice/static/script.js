document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  // Load tasks from the backend when the page loads
  fetch("/tasks")
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach((task) => addTaskToDOM(task));
    });

  // Add a new task
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();

    if (taskText) {
      fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: taskText }),
      })
        .then((response) => response.json())
        .then((task) => {
          addTaskToDOM(task);
          todoInput.value = "";
        });
    }
  });

  // Delete a task
  todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const taskId = e.target.parentElement.dataset.id;
      fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      }).then(() => {
        e.target.parentElement.remove();
      });
    }
  });

  // Helper function to add a task to the DOM
  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.innerHTML = `
            ${task.text}
            <button>Delete</button>
        `;
    todoList.appendChild(li);
  }
});
