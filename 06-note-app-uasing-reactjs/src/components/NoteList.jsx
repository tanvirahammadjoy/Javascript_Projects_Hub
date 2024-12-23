import NoteItem from "./Note";

const NoteList = ({ notes, deleteNote, startEditNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          startEditNote={startEditNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
