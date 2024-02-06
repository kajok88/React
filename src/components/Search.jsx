import axios from "axios";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";


const Search = ({  setSelectedCountry, setSelectedCity }) => {
    const [countries, setCountries] = useState([]);
    const [countriesToShow, setCountriesToShow] = useState([]);
    const [query, setQuery] = useState("");

    const [search, setSearch] = useState('');
    const [showCard, setShowCard] = useState(false);

    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
      if(search !=='') {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
          setCountries(response.data);
          // setSearchData(response.data);
        });
      }
      }, [search]);

    const handleSearchChange = (e) => {
      setSearch(e.target.value);
  
      setShowCard(!!e.target.value);
    };




    const handleQueryChange = (event) => {
      const search = event.target.value;
      setQuery(search);
      setShowCard(!!event.target.value);
      setCountriesToShow(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    };

    // return countriesToShow.map((country) => (
    return (
      <>
        
        {showCard && (
        <div className="floating-card">
          {/* Your filtering content goes here */}
          <Card>
            <Card.Body>
              <div>
                {countriesToShow.length > 10 ? (
                  <div>Too many matches, be more specific.</div>
                ) : (
                  null
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

        {/* <div key={country.name.official}>
          {country.name.common}{" "}
          <button onClick={() => 
            setCountriesToShow([country])
            // <CountryForm country={country}/>
          }>
            
              Show
          </button>
          <div>
              {countriesToShow.length === 1 ? (
                <CountryForm country={countriesToShow[0]} />
              ) : null}
            </div>
        </div> */}
      </>
    );
  };
  
  export default Search;