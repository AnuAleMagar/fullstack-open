import React, { useState } from 'react'
import SingleCountry from './SingleCountry'
function DisplayCount({data}) {
    const [index,setIndex]=useState(null)
    function handleClick(ind){
        setIndex(ind)
    }
  return (
    <div>
        {data.length===1?
        <SingleCountry data={data} />:<ul>
            {data.map((country,ind)=>{
                return (
                    <>
                    <li key={ind}>{country.name.common} <button onClick={()=>handleClick(ind)}>Show</button></li>
                    {ind===index && <SingleCountry data={[country]} />} 
                    </>
                )
            })}
        </ul>}
    </div>
  )
}

export default DisplayCount