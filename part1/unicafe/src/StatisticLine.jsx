import React from 'react'
function StatisticLine({text,value}) {
  return (
    <div>      
        <h4>{text} {value} {(text==='positive') && '%'}</h4>
     </div>
  )
}

export default StatisticLine