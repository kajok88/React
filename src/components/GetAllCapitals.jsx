import React from 'react';
import Button from 'react-bootstrap/Button';
import { useCountryData } from '../contexts/CountryDataContext';
import { usePinContext } from '../contexts/PinContext';

// A COMPONENT FOR MORE MENU, THAT GOES THROUGH EVERY CAPITAL FROM THE COUNTRYDATACONTEXT
// AND CREATES A NEW OBJECT WITH NAME AND COORDINATES, AND SAVES THAT IN PINCONTEXT, WITH 
// THE SET PIN COLOR (FROM MORE MENU) AND WHETHER THOSE PINS ARE SET VISIBLE OR NOT.

const GetAllCapitals = ({ selectedColor }) => {
  const countries = useCountryData();
  const { setCapitalPin, setPinColor, showCapitalPins, toggleShowCapitalPins  } = usePinContext();

  const handleSearchCapitals = () => {
    countries.forEach(country => {
      // Check if capitalInfo is not an empty object
      if (Object.keys(country.capitalInfo).length !== 0 && country.capital) { 
      setCapitalPin({
          capitalName: `${country.capital}, ${country.name.common}`,
          coordinates: { lat: country.capitalInfo.latlng[0], lng: country.capitalInfo.latlng[1] }
      });
      }
    });
    setPinColor({ selectedColor });
  };

  const handleToggleShowCapitalPins = () => {
    toggleShowCapitalPins();
  };

  const handleOnClick = () => {
    handleSearchCapitals();
    handleToggleShowCapitalPins();
  };

  // RETURNS THE 'LOCATE/DISABLE' BUTTON FOR THE MORE MENU
  return (
    <div>
      <br></br>
      <Button variant='outline-success' 
        onClick={handleOnClick}>
          {showCapitalPins ? 'Locate' : 'Disable'}
        </Button>
    </div>
  );
};

export default GetAllCapitals;