import React from 'react'

function Filter({handleFilter,searchTerm}) {
  return (
    <>
       filter shown with <input onChange={handleFilter} value={searchTerm} />
          {/* <div>debug: {newName}</div> */}
    </>
  )
}

export default Filter