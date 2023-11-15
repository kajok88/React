import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryForm from './components/CountryForm'
import Filter from './components/Filter';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (filter.trim() === '') {
      setFilteredCountries([]);
      return;
    }
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filtered.length > 10) {
      setFilteredCountries([]);
    } else {
      setFilteredCountries(filtered);
    }
  }, [filter, countries]);

  // const handleSearch = (event) => {
  //   setFilter(event.target.value);
  // };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Country Information</h2>
      {/* <CountryForm
        filter={filter}
        handleSearch={handleSearch}
      /> */}
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      
      {filteredCountries.length === 0 && filter.trim() !== '' && (
        <p>No matching countries found. Please refine your search.</p>
      )}
      {filteredCountries.length > 10 && (
        <p>Too many matches, please specify your search.</p>
      )}
      {filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.alpha2Code}>
              <h3>{country.name.common}</h3>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
