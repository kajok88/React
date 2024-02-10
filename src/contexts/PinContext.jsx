import React, { createContext, useContext, useState, useEffect } from 'react';

const PinContext = createContext();

export const usePinContext = () => useContext(PinContext);

export const PinProvider = ({ children }) => {
  const [redPin, setRedPin] = useState(null);
  const [bluePin, setBluePin] = useState(null);
  const [capitalPins, setCapitalPins] = useState([]);
  const [capitalPinColor, setCapitalPinColor] = useState("");
  const [showCapitalPins, setShowCapitalPins] = useState(true);

  // Default user pins
  const setPin = (color, position) => {
    if (color === 'red') {
      setRedPin(position);
    } else if (color === 'blue') {
      setBluePin(position);
    }
  };

  const setCapitalPin = (pin) => {
    setCapitalPins(prevPins => [...prevPins, pin]);
  };

  const setPinColor = (color) => {
    setCapitalPinColor(color);
  };

  const toggleShowCapitalPins = () => {
    setShowCapitalPins(prevState => !prevState);
    if (!showCapitalPins) {
      setCapitalPins([]); // Clear the capitalPins if toggled off
    }
  };

  // Only for dev printing purposes
  useEffect(() => {
    console.log(capitalPins);
    console.log("Selected pin color for capitals:", capitalPinColor);
  }, [capitalPins, capitalPinColor]);


  return (
    <PinContext.Provider value={{ redPin, bluePin, setPin, capitalPins, setCapitalPin, capitalPinColor, setPinColor, showCapitalPins, toggleShowCapitalPins }}>
      {children}
    </PinContext.Provider>
  );
};