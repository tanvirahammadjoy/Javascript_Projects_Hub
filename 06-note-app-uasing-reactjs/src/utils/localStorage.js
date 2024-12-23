export const getNotesFromLocalStorage = () => {
  console.log("Retrieving notes from localStorage");
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : []; // Return parsed data or an empty array
};

export const saveNotesToLocalStorage = (notes) => {
  console.log("Saving notes to localStorage:", notes);
  localStorage.setItem("notes", JSON.stringify(notes));
};
