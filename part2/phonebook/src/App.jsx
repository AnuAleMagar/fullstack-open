import React from "react";
import { useState, useEffect } from "react";
import Person from "./Person";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
        alert(`${newName} is already added to phonebook`);
        return;
      }
      if (person.number === obj.number) {
        alert(`${newNumber} is already saved to phonebook`);
        return;
      }
    }
    setPersons(persons.concat(obj));
    setNewName("");
    setNewNumber("");
  }
  function handleFilter(e) {
    setSearchTerm(e.target.value);
  }
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
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

      <Person showFilteredPerson={showFilteredPerson} />
    </div>
  );
};

export default App;
