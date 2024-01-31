import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const WeatherInfo = ({ city, lat, lng }) => {
  const API_KEY = Cookies.get('weatherApiKey');
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?q=${lat},${lng}&key=${API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        setError(error.response ? error.response.data.error.message : "An error occurred");
      });
  }, []);


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
          <h2>Weather in {city}</h2>
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