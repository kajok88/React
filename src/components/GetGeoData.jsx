import "../App.css"
import WeatherInfo from "./WeatherInfo";
import axios from "axios";
import CountryForm from "./CountryForm";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';

import { useCountryData } from "../contexts/CountryDataContext";
import { useContainerState } from '../contexts/ContainerStateContext';


const GetGeoData = ({ coordinates, pin }) => {
  const countries = useCountryData();
  const { containerState, handleContainerState } = useContainerState();
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [redPinCoordinates, setRedPinCoordinates] = useState(null);
  const [bluePinCoordinates, setBluePinCoordinates] = useState(null);
  
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
      case "United Kingdom of Great Britain and Northern Ireland (the)":
        return "United Kingdom";
      case "Niger (the)":
        return "Niger";
      case "Congo (the)":
        return "DR Congo";
      case "Congo (the Democratic Republic of the)":
        return "Republic of the Congo";
      case "Cote d'Ivoire":
        return "Ivory Coast";
      default:
        return name;
    }
  };

  const handleClose = (containerId) => {
    handleContainerState(containerId, false);
  };

  useEffect(() => {
    
    if (coordinates) {
      let roundedCoordinates;

      if (pin === "blue") {
        roundedCoordinates = {
          lat: coordinates.lat.toFixed(5),
          lng: coordinates.lng.toFixed(5)
        };
        setBluePinCoordinates(roundedCoordinates);
        handleContainerState('blueWeatherContainer', true);
        console.log("BLUE PIN COORDINATES: ", {roundedCoordinates});
      }

      if (pin === "red") {
        roundedCoordinates = {
          lat: coordinates.lat.toFixed(5),
          lng: coordinates.lng.toFixed(5)
        };
        setRedPinCoordinates(roundedCoordinates);
        handleContainerState('redInfoContainer', true);
        handleContainerState('redWeatherContainer', true);
        console.log("RED PIN COORDINATES: ", {roundedCoordinates});
      }

      axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${roundedCoordinates.lat}&longitude=${roundedCoordinates.lng}&localityLanguage=en`)
      .then(response => {
        console.log("Reverse geocoding by pin coordinates response: ", response.data);

        const data = response.data;
        const countryName = convertCountryName(data.countryName);
        setCity(data.city);
        setCountry(countryName);
        setGeoData(data);
        setError(null);

        // FIND MATCHING COUNTRY FROM COUNTRYDATACONTEXT FOR COMBINING DATA (IN RETURN SECTION)
        const matchedCountry = findMatchingCountry(countryName);
        if (matchedCountry) {
          console.log("Response from RestCountries by matching country name: ", matchedCountry);
          setCountryData(matchedCountry);
        } else {
          console.log("No matching country found. Consider adding a new instance to function: convertCountryName().");
          setCountryData(null);
        }
      })
      .catch(error => {
        console.error('Error fetching data from api.bigdatacloud.net:', error);
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
            {containerState.redInfoContainer && (
              <Container className="">
                <Row className="justify-content-center align-items-center"> 
                  <Col xs={12} md={2}>
                    <div className="floating-info-card with-red-border">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CloseButton 
                      onClick={() => handleClose('redInfoContainer')}
                      className="hide-container-button"
                      />
                      {country && geoData.city ? (
                        <h1>{geoData.city}, {country}</h1>
                      ) : (
                        <h1>{country}</h1>
                      )}
                      {countryData && countryData.coatOfArms && (
                      <img
                        src={countryData.coatOfArms.png}
                        alt={`${countryData.name.common} coat of arms`}
                        style={{ maxWidth: "100px", maxHeight: "100px", marginLeft: "10px" }}
                      />
                      )}
                      </div>
                      <div>State/Region: {geoData.principalSubdivision}</div>
                      <div>City: {geoData.city}</div>
                      <div>Municipality: {geoData.locality}</div>
                      
                      {countryData ? (
                        <div>
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
                        </div>
                      ) : (
                        null
                      )}
                      
                      {countryData && countryData.flags && (
                        <img src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
                      )}
                    </div>
                  </Col>
                </Row>
              </Container>
              )}
              {/* {countryData && country && containerState.redWeatherContainer &&( */}
              {containerState.redWeatherContainer &&(
              <Container>
                <Row className="justify-content-center align-items-center">
                  <Col xs={12} md={2}>
                    <div className="floating-info-card weather-red-pin">
                    <CloseButton 
                      onClick={() => handleClose('redWeatherContainer')}
                      className="hide-container-button"
                      />
                      
                      <WeatherInfo 
                        city={geoData.city} 
                        lat={redPinCoordinates.lat} 
                        lng={redPinCoordinates.lng}>
                      </WeatherInfo>

                    </div>
                  </Col>
                </Row>
              </Container>
              )} 
            </>
          ) : (
            <p>Loading geo data...</p>
          )}
          </div>
        ) : ( 
          null
        )}
      </div>

      {/* WEATHER CONTAINER FOR BLUE PIN */}
      <div>
        {pin === "blue" ? (
          <div>
          {geoData && containerState.blueWeatherContainer? (
            <>
            <Container>
                <Row className="justify-content-center align-items-center">
                  <Col xs={12} md={2}>
                    <div className="floating-info-card weather-blue-pin">
                    <CloseButton 
                      onClick={() => handleClose('blueWeatherContainer')}
                      className="hide-container-button"
                      />
                      <WeatherInfo 
                        city={geoData.city} 
                        lat={bluePinCoordinates.lat} 
                        lng={bluePinCoordinates.lng}>
                      </WeatherInfo>
                      </div>
                  </Col>
                </Row>
              </Container>
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
