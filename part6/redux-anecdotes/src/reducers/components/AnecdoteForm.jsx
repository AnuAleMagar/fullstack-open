import { useDispatch } from "react-redux";
import { createAnecdoteFromThunk } from "../anecdoteReducer";
import { setNotification, removeNotification } from "../notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdoteFromThunk(content))
    event.target.anecdote.value = "";
    dispatch(setNotification(`You added '${content}'`));
    if (window.notificationTimeout) {
      clearTimeout(window.notificationTimeout);
    }
    window.notificationTimeout = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
