import { useDispatch } from "react-redux";
import { createAnecdote } from "../anecdoteReducer";
import { setNotification,removeNotification } from "../notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleCreateAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
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
