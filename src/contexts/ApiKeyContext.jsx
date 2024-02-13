import React, { createContext, useState, useContext } from 'react';

const ApiKeyContext = createContext();

export const ApiKeyProvider = ({ children }) => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [timezoneApiKey, setTimezoneApiKey] = useState('');

  return (
    <ApiKeyContext.Provider value={{ weatherApiKey, setWeatherApiKey, timezoneApiKey, setTimezoneApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  return useContext(ApiKeyContext);
};