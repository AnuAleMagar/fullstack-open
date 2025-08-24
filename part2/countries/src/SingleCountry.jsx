import React from 'react'
function SingleCountry({data}) {
    console.log(data[0].name.common) ;
    const Languages=Object.values(data[0].languages)
  return (
    <div>
        <h1>{data[0].name.common}</h1>
        <p>Capital {data[0].capital} </p>
        <p>Area {data[0].area} </p>
        <h2>Languages</h2>
        <ul>
            {Languages.map((lang,ind)=>{
                return (<li key={ind}>{lang}</li>)
            })}
        </ul>
        <img src={data[0].flags.png} alt={data[0].flags.alt} />
    </div>
  )
}

export default SingleCountry