import React, { createContext, useContext, useState } from 'react';

const PinContext = createContext();

export const usePinContext = () => useContext(PinContext);

export const PinProvider = ({ children }) => {
  const [redPin, setRedPin] = useState(null);
  const [bluePin, setBluePin] = useState(null);

  const setPin = (color, position) => {
    if (color === 'red') {
      setRedPin(position);
    } else if (color === 'blue') {
      setBluePin(position);
    }
  };

  return (
    <PinContext.Provider value={{ redPin, bluePin, setPin }}>
      {children}
    </PinContext.Provider>
  );
};