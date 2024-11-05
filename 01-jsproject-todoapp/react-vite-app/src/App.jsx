// App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to parse todos from localStorage:", error);
      return [];
    }
  }); // State to hold todo items
  const [input, setInput] = useState(""); // State for the input field
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  // Handler to add a new todo
  const addTodo = () => {
    if (input.trim() === "") {
      setIsModalVisible(true);
      setTimeout(() => setIsModalVisible(false), 2000);
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  // Handler to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handler to toggle edit mode for a todo
  const toggleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Handler to update a todo's text
  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <>
      <header>
        <div>
          <h2>
            <i className="fa-solid fa-book-journal-whills"></i>
          </h2>
        </div>
        <div className="input-container">
          <input
            className="text-input"
            type="text"
            placeholder="Write here what you want to do today..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
        </div>
        <nav>
          <ul>
            <li>
              <button type="button" className="add-todo" onClick={addTodo}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </li>
            {/* Removed the Save button as it's redundant */}
          </ul>
        </nav>
      </header>
      <main className="main-container">
        <ul className="content-box">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-list">
              {todo.isEditing ? (
                <input
                  className="edit-text"
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") toggleEdit(todo.id);
                  }}
                  onBlur={() => toggleEdit(todo.id)}
                  autoFocus
                />
              ) : (
                <span className="todo-text">{todo.text}</span>
              )}
              <div>
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => toggleEdit(todo.id)}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  title="Edit Todo"
                ></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => deleteTodo(todo.id)}
                  style={{ cursor: "pointer" }}
                  title="Delete Todo"
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </main>
      {isModalVisible && (
        <div className="message-modal">
          <p>Please enter some text in the todo input.</p>
        </div>
      )}
      <footer>
        <p>&copy; All rights reserved by Tanvir Ahammad Joy</p>
      </footer>
    </>
  );
}

export default App;
