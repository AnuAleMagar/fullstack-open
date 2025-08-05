import React from 'react'

function Person({showFilteredPerson}) {
  return (<>

      {showFilteredPerson.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
        </>
  )
}

export default Person