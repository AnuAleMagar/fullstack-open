import React from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas",number:9804545101 }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  function handleChangename(e){
    setNewName(e.target.value)
  };
  function handleChangenumber(e){
    setNewNumber(e.target.value)
  };
  function handleSubmit(e){
    e.preventDefault()
    const obj={name:newName,number:newNumber}
    for(let person of persons){
      if(person.name===obj.name){
        alert(`${newName} is already added to phonebook`)
        return
      }
      if(person.number===obj.number){
        alert(`${newNumber} is already saved to phonebook`)
        return
      }
    }
    setPersons(persons.concat(obj))
    setNewName('')
    setNewNumber('')
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChangename} value={newName}/> <br />
          number: <input onChange={handleChangenumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name} {person.number}</p>;
      })}
    </div>
  );
};

export default App;
