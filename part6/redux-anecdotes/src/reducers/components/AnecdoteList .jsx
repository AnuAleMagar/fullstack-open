import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeAnecdotes,addVoteFromThunk } from "../anecdoteReducer";
import { setNotificationFromThunk } from "../notificationReducer";

function AnecdoteList() {

  const anecdotes = useSelector((state) => {
    const filteredData = state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    );

    return filteredData;
  });
  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id, anecdote) => {
    dispatch(addVoteFromThunk(id));
    dispatch(setNotificationFromThunk(`You voted '${anecdote.content}'`,1000));
  };
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
