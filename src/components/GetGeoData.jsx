import WeatherInfo from "./WeatherInfo";

import React, { useEffect, useState } from 'react';
import _ from 'lodash';

const GetGeoData = ({ coordinates, pin }) => {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    
    if (coordinates) {
      let roundedCoordinates;

      if (pin === "blue") {
        roundedCoordinates = {
          lat: coordinates.capLat.toFixed(5),
          lng: coordinates.capLng.toFixed(5)
        };
      }

      if (pin === "red") {
        roundedCoordinates = {
          lat: coordinates.lat.toFixed(5),
          lng: coordinates.lng.toFixed(5)
        };
      }

      console.log(roundedCoordinates);

      const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${roundedCoordinates.lat}&longitude=${roundedCoordinates.lng}&localityLanguage=en`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Extract city and countryName from the response
          const { city, countryName } = data;
          setCity(data.city);
          setCountry(data.countryName);
          setGeoData(data);
        })
        .catch(error => console.error('Error fetching data from api.bigdatacloud.net:', error));
    }
    else {
      console.log("Didn't work out.")
    }
  }, [coordinates]);

  return (
    <>
      <div>
        {pin === "red" ? (
          <div>
          {geoData ? (
            <>
            <p>City: {city}</p>
            <p>Country: {country}</p>
            </>
          ) : (
            <p>Loading geo data...</p>
          )}
          </div>
        ) : ( 
          null
        )}
      </div>
      <div>
        {pin === "blue" ? (
          <div>
          {geoData ? (
            <>
            <p>City: {city}</p>
            <p>Country: {country}</p>
            </>
          ) : (
            <p>Loading geo data...</p>
          )}
          </div>
        ) : ( 
          null
        )}
      </div>
    </>
  );
}

export default GetGeoData;
