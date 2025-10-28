import AnecdoteForm from "./reducers/components/AnecdoteForm.jsx";
import AnecdoteList from "./reducers/components/AnecdoteList .jsx";
import Filter from "./reducers/components/Filter.jsx";
const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
