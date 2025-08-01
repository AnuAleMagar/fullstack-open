import React from 'react'

function Statistic({good,bad,neutral}) {
  return (
    <div>      <h4>all {bad+good+neutral}</h4>
      <h4>average {(-bad+good)/(bad+good+neutral)}</h4>
      <h4>positive {good/(bad+good+neutral)*100} %</h4></div>
  )
}

export default Statistic