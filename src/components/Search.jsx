import CountryForm from "./CountryForm";
import { useState, useEffect } from "react";


const Search = ({ countriesToShow, setCountriesToShow, setSearchCountry, setSearchCity }) => {
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
          setCountries(response.data);
        });
      }, []);

      const handleQueryChange = (event) => {
        const search = event.target.value;
        setQuery(search);
        setCountriesToShow(
          countries.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
        );
      };

    return countriesToShow.map((country) => (
      <div key={country.name.official}>
        {country.name.common}{" "}
        <button onClick={() => 
          setCountriesToShow([country])
          // <CountryForm country={country}/>
        }>
          
            Show
        </button>
        {/* <div>
            {countriesToShow.length === 1 ? (
              <CountryForm country={countriesToShow[0]} />
            ) : null}
          </div> */}
      </div>
    ));
  };
  
  export default Search;