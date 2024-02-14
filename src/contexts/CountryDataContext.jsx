import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// A CONTEXT FOR STORING THE FETCHED 250 COUNTRIES FROM RESTCOUNTRIES API.


const CountryDataContext = createContext();

export const useCountryData = () => useContext(CountryDataContext);
export const CountryDataProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
        console.log("Fetched countries:", response.data);
      setCountries(response.data);
    });
  }, []);

  return (
    <CountryDataContext.Provider value={countries}>
      {children}
    </CountryDataContext.Provider>
  );
};