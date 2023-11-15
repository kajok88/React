import React from "react";

const CountryForm = ({filter, handleSearch}) => {
    return (
      <form>
        <label htmlFor="search">Search countries:</label>
        <input
          type="text"
          id="search"
          value={filter}
          onChange={handleSearch}
        />
      </form>
    )
}

export default CountryForm