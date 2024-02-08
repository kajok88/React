import React, { useState, useEffect } from 'react';
import { Button, Card } from "react-bootstrap";
import "../App.css"

const Countries = ({ countriesToShow, setCountriesToShow, setSelectedCountry, setQuery }) => {


  const handleOnClick = (country) => {
    setCountriesToShow([country]);
    setSelectedCountry([country]);
    setQuery('');
  };

    return (
      <>
        <div>
          {countriesToShow.length > 20 ? (
            null
          ) : (
              <div className="d-flex flex-column">
                {countriesToShow.map((country) => (
                  <Card key={country.name.official} 
                    style={{ borderRadius: '0'}} 
                    className="search-result">

                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <span>{country.name.common}</span>
                      <Button variant="success" 
                        onClick={() => handleOnClick(country)}>
                          Show
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
          )}
        </div>
      </>
    );
  };
  
  export default Countries;