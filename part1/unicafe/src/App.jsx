import React from 'react'
import { useState } from 'react'
import Button from './Button'
import './App.css';
const Ah4h4 = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>{
        setGood(good+1)
      }}content='good'/>
      <Button handleClick={()=>{
           setNeutral(neutral+1)
      }}content='neutral'/>
      <Button handleClick={()=>{
           setBad(bad+1)
      }}content='bad'/>
      <h1>statistics</h1>
      <h4>good {good}</h4>
      <h4>neutral {neutral}</h4>
      <h4>bad {bad}</h4>
    </div>
  )
}

export default Ah4h4