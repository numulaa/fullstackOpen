import React from "react";

import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchVar, setSearchVar] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
      const personData = persons.find((n) => n.name === newName);
      const changedNumber = { ...personData, number: newNumber };
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      personService.updateNumber(personData.id, changedNumber).then((res) => {
        setPersons(
          persons.map((n) => (n.id !== personData.id ? n : changedNumber))
        );
      });
    } else {
      const newPersons = {
        name: newName,
        number: newNumber,
      };
      personService.addPerson(newPersons).then((res) => {
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
      });

      // setPersons(persons.concat(newPersons));
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

  const handleDelete = (id) => {
    const person = persons.find((x) => x.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      return personService
        .deletePerson(id)
        .then((res) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : res))
          );
        })
        .catch((err) => {
          console.log(err);
          alert(
            `the person ${person.name} has been already deleted from the server`
          );
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
