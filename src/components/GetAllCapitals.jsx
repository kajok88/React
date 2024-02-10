import React from 'react';
import Button from 'react-bootstrap/Button';
import { useCountryData } from '../contexts/CountryDataContext';
import { usePinContext } from '../contexts/PinContext';

const GetAllCapitals = ({ selectedColor }) => {
  const countries = useCountryData();
  const { setCapitalPin, setPinColor  } = usePinContext();

  const handleSearchCapitals = () => {
    countries.forEach(country => {
    // Check if capitalInfo is not an empty object
        if (Object.keys(country.capitalInfo).length !== 0 && country.capital) { 
        setCapitalPin({
            capitalName: `${country.capital}, ${country.name.common}`,
            // capitalName: country.capital,
            coordinates: { lat: country.capitalInfo.latlng[0], lng: country.capitalInfo.latlng[1] }
        });
        }
    });
    setPinColor({ selectedColor });
  };


  return (
    <div>
        <br></br>
      <Button variant='success' onClick={handleSearchCapitals}>Locate</Button>
    </div>
  );
};

export default GetAllCapitals;