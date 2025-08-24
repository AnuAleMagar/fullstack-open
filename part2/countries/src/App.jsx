import { useState, useEffect } from "react";
import axios from "axios";
import DisplayCount from "./DisplayCount";
function App() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  function handleChange(e) {
    setSearchText(e.target.value);
  }
  useEffect(() => {
    if (searchText.trim() === "") {
      setData([]);
      return;
    }
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${searchText}`
        );
        setData([response.data]);
        setError(null)
      } catch (error) {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/all`
        );
        const countries = response.data;
        const filteredData = countries.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
        if (filteredData.length > 10) {
          setError("Too many matches,specify another filter");
          setData([])
        } else {
          setData(filteredData);
          setError(null)
        }
      }
    }
    fetchData();
  }, [searchText]);
  return (
    <>
      <label htmlFor="">find countries</label>
      <input type="text" value={searchText} onChange={handleChange} />
      {error===null?<DisplayCount  data={data}/>:<p>{error}</p>}
    </>
  );
}
export default App;
