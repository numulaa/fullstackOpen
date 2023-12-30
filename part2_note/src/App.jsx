import React from "react";
import { useState } from "react";
import Note from "./components/Note";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((res) => {
      console.log("promie fulfilled");
      setNotes(res.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    axios.post("http://localhost:3001/notes", noteObject).then((res) => {
      console.log(res);
      setNotes(notes.concat(res.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportance = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    //find the note with the selected id
    const note = notes.find((n) => n.id === id);
    //change the selected note with the new importance value
    const changedNote = { ...note, important: !note.important };
    axios.put(url, changedNote).then((res) => {
      //create a new array with the changedNote data
      setNotes(notes.map((n) => (n.id !== id ? n : res.data)));
    });
  };
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {" "}
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
