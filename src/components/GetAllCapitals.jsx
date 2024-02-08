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
      <Button onClick={handleSearchCapitals}>Search Capitals</Button>
    </div>
  );
};

export default GetAllCapitals;
