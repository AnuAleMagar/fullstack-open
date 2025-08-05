import React from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  function handleChange(e){
    setNewName(e.target.value)
  };
  function handleSubmit(e){
    e.preventDefault()
    const obj={name:newName}
    setPersons(persons.concat(obj))
    setNewName('')
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
