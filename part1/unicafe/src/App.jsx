import React from "react";
import { useState } from "react";
import Button from "./Button";
import "./App.css";
import Statistic from "./Statistic";
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
        content="good"
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
        content="neutral"
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
        content="bad"
      />
      <h1>statistics</h1>
      <table>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        {good + bad + neutral === 0 ? (
          <>
            <h5>No feedback given</h5>
          </>
        ) : (
          <Statistic good={good} bad={bad} neutral={neutral} />
        )}
      </table>
    </div>
  );
};

export default App;
