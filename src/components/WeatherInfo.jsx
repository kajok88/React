import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ city }) => {

  const API_KEY = ''; // Inster your API key:
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

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