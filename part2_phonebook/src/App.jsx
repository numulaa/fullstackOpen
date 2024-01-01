import React from "react";

import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchVar, setSearchVar] = useState("");
  const [successMessage, setSuccessMessage] = useState("successful...");
  const [isSuccess, setIsSuccess] = useState(true);

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
      personService
        .updateNumber(personData.id, changedNumber)
        .then((res) => {
          setPersons(
            persons.map((n) => (n.id !== personData.id ? n : changedNumber))
          );
          setSuccessMessage(`${personData.name} has successfully updated`);
          setTimeout(() => setSuccessMessage(null), 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          setIsSuccess(false);
          setSuccessMessage(err.message);
          setTimeout(() => setSuccessMessage(null), 5000);
        });
    } else {
      const newPersons = {
        name: newName,
        number: newNumber,
      };
      personService
        .addPerson(newPersons)
        .then((res) => {
          setPersons(persons.concat(res));
          setSuccessMessage(`${newName} has successfully registered`);
          setTimeout(() => setSuccessMessage(null), 5000);

          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          setIsSuccess(false);
          setSuccessMessage(err.message);
          setTimeout(() => setSuccessMessage(null), 5000);
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
          setIsSuccess(false);
          setSuccessMessage(err.message);
          setTimeout(() => setSuccessMessage(null), 5000);
          alert(
            `the person ${person.name} has been already deleted from the server`
          );
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className={isSuccess ? "success" : "error"}>{message}</div>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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
