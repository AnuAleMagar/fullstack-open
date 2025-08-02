import { useState } from "react";
import "./App.css";
const App = () => {
  const votes = { 0: 1, 1: 3, 2: 4, 3: 2 };
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];



    let InitalMax=0
    let InitialIndex=0;
    for (let key in votes) {
      if (votes[key] > InitalMax) {
        InitalMax = votes[key];
        InitialIndex=key;
      }
    }

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(votes);
  const [maxIndex, setmaxIndex] = useState(InitialIndex);
  function handleVote() {
    let newVote = { ...vote };
    if (newVote[selected] === undefined) {
      newVote[selected] = 1;
    } else {
      newVote[selected] += 1;
    }
    let maximum=0
    let index=0;
    for (let key in newVote) {
      if (newVote[key] > maximum) {
        maximum = newVote[key];
        index=key;
      }
    }
    setmaxIndex(index)

    setVote(newVote);
  }
  function handleClick() {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected] || 0} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {vote[maxIndex]} votes</p>
    
    </div>
  );
};

export default App;
