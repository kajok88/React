import WeatherInfo from "./WeatherInfo";

import CountryForm from "./CountryForm";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
      console.log("Unexpected error.")
    }
  }, [coordinates]);

  return (
    <>
      <div>
        {pin === "red" ? (
          <div>
          {geoData ? (
            <>
            <Container className="">
                <Row className="justify-content-center align-items-center"> {/* Added align-items-center */}
                  <Col xs={12} md={2}>
                    <div className="floating-info-card with-red-border">
                      <h1>{geoData.countryName}</h1>
                      <div>City: {geoData.city}</div>
                      <div>Region: {geoData.locality}</div>
                      {/* <h3>Languages:</h3>
                      <ul>
                        {Object.values(country.languages).map((language) => (
                          <li key={language}>{language}</li>
                        ))}
                      </ul> */}
                      {/* <img src={country.flags.png} alt={`${country.name.common} flag`} /> */}
                      {/* <WeatherInfo city={country.capital} lat="61" lng="24" /> */}
                    </div>
                  </Col>
                </Row>
              </Container>
            {/* <p>City: {city}</p>
            <p>Country: {country}</p> */}
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
            {/* <p>City: {city}</p>
            <p>Country: {country}</p> */}
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
