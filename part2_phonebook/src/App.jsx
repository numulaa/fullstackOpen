import React from "react";

import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchVar, setSearchVar] = useState("");

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.findIndex((person) => person.name === newName) !== -1) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(newPersons));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleSearch = (e) => {
    setSearchVar(e.target.value);
  };

  const personsToShow =
    searchVar !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(searchVar.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchVar={searchVar} handleSearch={handleSearch} />
      <h3>Add a new data</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
