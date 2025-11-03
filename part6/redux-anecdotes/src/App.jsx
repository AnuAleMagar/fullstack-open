import AnecdoteForm from "./reducers/components/AnecdoteForm.jsx";
import AnecdoteList from "./reducers/components/AnecdoteList .jsx";
import Filter from "./reducers/components/Filter.jsx";
import Notification from "./reducers/components/Notification.jsx";
const App = () => {
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
