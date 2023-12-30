import React from "react";

import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchVar, setSearchVar] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      console.log("data fetched");
      setPersons(res.data);
    });
  }, []);

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
