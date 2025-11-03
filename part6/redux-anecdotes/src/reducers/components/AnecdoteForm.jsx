import { useDispatch } from "react-redux";
import { setAll } from "../anecdoteReducer";
import { setNotification, removeNotification } from "../notificationReducer";
import anecdotesServices from "../../services/anecdotesServices";

function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await anecdotesServices.createNew(content);
    dispatch(setAll(newAnecdote));
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
