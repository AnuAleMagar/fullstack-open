import React from "react";
import { useDispatch} from "react-redux";
import { createAnecdote} from "../anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleCreateAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;
