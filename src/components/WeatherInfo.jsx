import { useEffect, useState } from "react";
import axios from "axios";
import { useApiKey } from '../contexts/ApiKeyContext';


const WeatherInfo = ({ city, lat, lng }) => {
  const { weatherApiKey } = useApiKey();
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = weatherApiKey;

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?q=${lat},${lng}&key=${API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log("Weather Api response: ", response.data);
      })
      .catch((error) => {
        setError(error.response ? error.response.data.error.message : "An error occurred");
      });
      console.log("NEW API CALL MADE")
  }, [lat, lng]);


  if (error) {
    return (
      <>
      <div><br></br>
        <strong>Weather API Error:</strong> {error} <br></br>Please check your API keys.
      </div>
      </>
    )
  }


  return (
    <>
      {weather.location ? (
        <div>
          {city? (
            <h2>Weather in {city}</h2>
            ) : ( 
            <h2>Weather in pinned location</h2>
            )}
          <div>Temperature {weather.current.temp_c}°C</div>
          <div>Feels like {weather.current.feelslike_c}°C</div>
          <img
            alt="weather icon"
            src={weather.current.condition.icon}
          />
          <div>Wind {weather.current.wind_kph} km/h</div>
        </div>
      ) : null}
    </>
  );
};

export default WeatherInfo;