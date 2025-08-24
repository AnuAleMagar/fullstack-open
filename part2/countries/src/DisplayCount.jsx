import React from 'react'
import SingleCountry from './SingleCountry'
function DisplayCount({data}) {
  return (
    <div>
        {data.length===1?
        <SingleCountry data={data} />:<ul>
            {data.map((country,ind)=>{
                return (
                    <li key={ind}>{country.name.common}</li>
                )
            })}
        </ul>}
    </div>
  )
}

export default DisplayCount