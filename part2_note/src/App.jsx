import React from "react";
import { useState } from "react";
import Note from "./components/Note";
import axios from "axios";
import { useEffect } from "react";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
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
    //find the note with the selected id
    const note = notes.find((n) => n.id === id);
    //change the selected note with the new importance value
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        //create a new array with the changedNote data
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((err) => {
        alert(`the note '${note.content}' was already deleted from server`);
        console.log(err);
        setNotes(notes.filter((n) => n.id !== id));
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
