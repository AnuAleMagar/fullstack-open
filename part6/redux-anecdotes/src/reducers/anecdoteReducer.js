import { createSlice } from "@reduxjs/toolkit";
import anecdotesServices from "../services/anecdotesServices";
const getId = () => (100000 * Math.random()).toFixed(0);


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState:[],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      };
      return [...state, newAnecdote];
    },
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdotes = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdotes
      );
    },
    setAll(state,action){
      return state.concat(action.payload)
    }
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setAll(anecdotes))
  }
}
export const createAnecdoteFromThunk = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesServices.createNew(content);
    dispatch(setAll(newAnecdote));
  }
}

export const { createAnecdote, addVote ,setAll} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
