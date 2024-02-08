import React from 'react';
import Button from 'react-bootstrap/Button';
import { useCountryData } from '../contexts/CountryDataContext';

const GetAllCapitals = ({ selectedColor }) => {
  const countries = useCountryData();

  const handleSearchCapitals = () => {
    const selectedCapitals = countries.map(country => country.capital);
    console.log('Selected capitals:', selectedCapitals);
  };

  return (
    <div>
        <br></br>
      <Button variant='success' onClick={handleSearchCapitals}>Locate</Button>
    </div>
  );
};

export default GetAllCapitals;
