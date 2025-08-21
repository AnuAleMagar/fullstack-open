import React from "react";
import personServices from "./services/Server.js";
import { useState, useEffect } from "react";
import Person from "./Person";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import axios from "axios";
import "./style.css";
import Notification from "./Notification.jsx";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const showFilteredPerson = persons.filter((person) => {
    return person.name.includes(searchTerm);
  });
  function handleChangename(e) {
    setNewName(e.target.value);
  }
  function handleChangenumber(e) {
    setNewNumber(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const obj = { name: newName, number: newNumber };
    for (let person of persons) {
      if (person.name === obj.name) {
        let id = person.id;
        if (
          window.confirm(
            `${person.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personServices
            .update(id, obj)
            .then((response) => {
              personServices.getAll().then((response) => {
                setPersons(response.data);
                setErrorMessage(`New Number of ${person.name} added`);
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              });
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => {
              setErrorMessage(
                `Information of ${person.name} has already been removed from server`
              );
            });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
        return;
      }
      if (person.number === obj.number) {
        alert(`${newNumber} is already saved to phonebook`);
        return;
      }
    }
    personServices.create(obj).then((response) => {
      setPersons(persons.concat(response.data));
      setErrorMessage(`Added ${response.data.name}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
    setNewName("");
    setNewNumber("");
  }
  function handleFilter(e) {
    setSearchTerm(e.target.value);
  }
  useEffect(() => {
    personServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter handleFilter={handleFilter} searchTerm={searchTerm} />
      <h2>Add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        handleChangename={handleChangename}
        handleChangenumber={handleChangenumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>

      <Person
        showFilteredPerson={showFilteredPerson}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
