import React from "react";
import { useState } from "react";
import Person from "./Person";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const showFilteredPerson=persons.filter(person=>{
    return person.name.includes(searchTerm)
  })
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
  function handleFilter(e){
       setSearchTerm(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
       <Filter handleFilter={handleFilter} searchTerm={searchTerm} />
      <h2>Add a new</h2>
    
      <PersonForm handleSubmit={handleSubmit}  handleChangename={handleChangename} handleChangenumber={handleChangenumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      
      <Person showFilteredPerson={showFilteredPerson} />
    </div>
  );
};

export default App;
