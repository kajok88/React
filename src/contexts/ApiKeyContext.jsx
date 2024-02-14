import React, { createContext, useState, useContext } from 'react';

// A CONTEXT FOR STORING API KEYS, HOWEVER THEY WILL RESET ON PAGE RELOAD.


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