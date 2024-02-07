import WeatherInfo from "./WeatherInfo";

import CountryForm from "./CountryForm";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useCountryData } from "./CountryDataContext";

const GetGeoData = ({ coordinates, pin }) => {
  const countries = useCountryData();
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(null);

  

  const findMatchingCountry = (name) => {
    return countries.find(country => country.name.common === name);
  };

  const convertCountryName = (name) => {
    switch (name) {
      case "Russian Federation (the)":
        return "Russia";
      case "United States of America (the)":
        return "United States";
      default:
        return name;
    }
  };

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
        .then(response => {
          if (!response.ok) {
            throw new Error("Bad request");
          }
          return response.json();
        })
        .then(data => {
          console.log(data);

          const countryName = convertCountryName(data.countryName);
          setCity(data.city);
          setCountry(countryName);
          setGeoData(data);
          setError(null);

          const matchedCountry = findMatchingCountry(countryName);
          if (matchedCountry) {
            console.log(matchedCountry);
            setCountryData(matchedCountry);
          } else {
            console.log("No matching country found");
          }

        })
        .catch(error => {
          console.error('Error fetching data from api.bigdatacloud.net:', error)
          setError(error.message);
        });
    }
    else {
      console.log("Unexpected error.")
    }
  }, [coordinates]);

  return (
    <>
      <div>
        {error ? (
          <Container className="">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={2}>
              <div className="floating-popup-card popup-error">
                <p>Error: {error}. Please reload the page.</p>
              </div>
            </Col>
          </Row>
        </Container>
        ) : (
          null
        )}

        {pin === "red" ? (
          <div>
          {geoData ? (
            <>
            <Container className="">
                <Row className="justify-content-center align-items-center"> 
                  <Col xs={12} md={2}>
                    <div className="floating-info-card with-red-border">
                      <h1>{country}</h1>
                      <div>State/Region: {geoData.principalSubdivision}</div>
                      <div>City: {geoData.city}</div>
                      <div>Municipality: {geoData.locality}</div>
                      <h3>Languages:</h3>
                      <ul>
                        {countryData.languages ? (
                          Object.values(countryData.languages).map((language, index) => (
                            <li key={index}>{language}</li>
                          ))
                        ) : (
                          <p>No known languages</p>
                        )}
                      </ul>
                      <img src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
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
