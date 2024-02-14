import React, { createContext, useState, useEffect, useContext } from 'react';

// A CONTEXT FOR STORING API KEYS, HOWEVER THEY WILL RESET ON PAGE RELOAD,
// AND FOR THAT REASON WE HAVE AN OPTION TO SAVE THE KEYS TO SESSION STORAGE.


const ApiKeyContext = createContext();

export const ApiKeyProvider = ({ children }) => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [timezoneApiKey, setTimezoneApiKey] = useState('');
  const [storeToSessionStorage, setStoreToSessionStorage] = useState(false);

  const toggleStoreToSessionStorage = () => {
    setStoreToSessionStorage(prevState => !prevState);
  };

  // ON MOUNTING, CHECK IF THERE ARE KEYS IN SESSION STORAGE, IF SO, THEN seStoreToSessionStorage = true, 
  // WHICH SETS THE TOGGLE IN SUBMITAPIKEYS "ON".
  // IF THE KEYS ARE PRESENT IN THE SESSION STORAGE, WE USE THEM AS THE API KEYS.

  useEffect(() => {
    const weatherApiKeyFromStorage = sessionStorage.getItem('weatherApiKey');
    const timezoneApiKeyFromStorage = sessionStorage.getItem('timezoneApiKey');
    
    if (weatherApiKeyFromStorage || timezoneApiKeyFromStorage) {
      setStoreToSessionStorage(true);
    }

    if (weatherApiKeyFromStorage) {
      setWeatherApiKey(weatherApiKeyFromStorage);
    }

    if (timezoneApiKeyFromStorage) {
      setTimezoneApiKey(timezoneApiKeyFromStorage);
    }
  }, [weatherApiKey, timezoneApiKey]);

  
  return (
    <ApiKeyContext.Provider value={{ 
      weatherApiKey, 
      setWeatherApiKey, 
      timezoneApiKey, 
      setTimezoneApiKey, 
      storeToSessionStorage, 
      toggleStoreToSessionStorage 
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  return useContext(ApiKeyContext);
};