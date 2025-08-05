import React from 'react'

function PersonForm({
    handleSubmit,handleChangename,handleChangenumber,newName,newNumber
}) {
  return (
    <>
         <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChangename} value={newName} /> <br />
          number: <input onChange={handleChangenumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm