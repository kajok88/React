import React from 'react';

// const filtered = countries.filter(country =>
//   country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
// );

// if (filtered.length > 10) {
//   setFilteredCountries([]);
// } else {
//   setFilteredCountries(filtered);
// }


const Filter = () => {
  return(
    <div>
      {filteredCountries.length === 0 && searchTerm.trim() !== '' && (
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

export default Filter;