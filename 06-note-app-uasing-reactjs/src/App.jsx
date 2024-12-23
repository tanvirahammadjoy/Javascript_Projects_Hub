import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Note from "./components/Note";
import "./App.css";

function App() {
  // Initialize state with data from localStorage
  const [notes, setNotes] = useState(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      console.log("Initial load from localStorage:", storedNotes);
      return storedNotes ? JSON.parse(storedNotes) : [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    try {
      console.log("Saving notes to localStorage:", notes);
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: "",
      isEditable: true,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNoteText = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const saveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isEditable: false } : note
      )
    );
  };

  const editNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isEditable: true } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <Navbar addNote={addNote} />
      <div className="note-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            updateNoteText={updateNoteText}
            saveNote={saveNote}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
