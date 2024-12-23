import React from "react";
import "./Note.css";

const Note = ({ note, updateNoteText, saveNote, editNote, deleteNote }) => {
  return (
    <div className="note-box">
      {note.isEditable ? (
        <textarea
          value={note.text}
          onChange={(e) => updateNoteText(note.id, e.target.value)}
        />
      ) : (
        <p>{note.text}</p>
      )}
      <div className="note-actions">
        {note.isEditable ? (
          <button onClick={() => saveNote(note.id)}>Save</button>
        ) : (
          <button onClick={() => editNote(note.id)}>Edit</button>
        )}
        <button onClick={() => deleteNote(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Note;
