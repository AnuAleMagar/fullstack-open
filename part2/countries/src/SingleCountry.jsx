import axios from "axios";
import { useState,useEffect } from "react";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
function SingleCountry({ data }) {
  const selectedCity = data[0].capital[0].toLowerCase();
  const [weatherData,setWeatherData]=useState({})
  const Languages = Object.values(data[0].languages);
  useEffect(()=>{
    async function fetchWeatherData() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data)
    } catch (error) {
      console.log(error);
    }
  }
 fetchWeatherData();
},[selectedCity])
  return (
    <div>
      <h1>{data[0].name.common}</h1>
      <p>Capital {data[0].capital} </p>
      <p>Area {data[0].area} </p>
      <h2>Languages</h2>
      <ul>
        {Languages.map((lang, ind) => {
          return <li key={ind}>{lang}</li>;
        })}
      </ul>
      <img src={data[0].flags.png} alt={data[0].flags.alt} />
      <h1>Weather in {data[0].capital}</h1>
      <p>Temperature {weatherData.main?.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`} alt={weatherData.weather?.[0].description} />
      <p>Wind {weatherData.wind?.speed} m/s</p>
    </div>
  );
}

export default SingleCountry;
