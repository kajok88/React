import { useEffect, useState } from "react";
import axios from "axios";

const WeatherData = ({ city }) => {
  const API_KEY = 'c1a22188c7df4ddaa42174210231411'
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

export default WeatherData;