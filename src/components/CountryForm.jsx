import React from "react";

const CountryForm = ({searchTerm, handleSearch}) => {
    return (
      <form>
        <label htmlFor="search">Search countries:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </form>
    )
}

export default CountryForm