import React from 'react'
import personServices from './services/Server.js'
function Person({showFilteredPerson,persons,setPersons}) {
  function handleClick(id){
      personServices.remove(id).then((response) => {
      setPersons(prevPerson=>{
        return prevPerson.filter(person=>person.id!==id)
      });
    });
  }
  return (<>

      {showFilteredPerson.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number} 
            <button  onClick={()=>{
              if(window.confirm(`Delete ${person.name}?`)){
              handleClick(person.id)
              }
            }}>delete</button>
          </p>
        );
      })}
        </>
  )
}

export default Person