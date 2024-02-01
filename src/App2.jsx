import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import Countries from "./components/Countries";
import CountryForm from "./components/CountryForm";
import SubmitApiKeys from "./components/SubmitApiKeys";
import Leaflet from "./components/Leaflet";
import Map from "./components/Map";
import CountryCoodrinates from "./components/CountryCoordinates";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [showApiSubmitPage, setShowApiSubmitPage] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
    // checkCookie();
  //   const cookieExists = checkCookie();
  //    if (!cookieExists) {
  
  //      alert('Api key not found! Redirecting to submit page.');
  // //     // Uncomment the line below to redirect to the submit page
  // //     // window.location.href = '/submit-page';
  //    }
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

  const checkCookie = () => {
    const weatherApiKeyCookie = Cookies.get('weatherApiKey');
    if (!weatherApiKeyCookie && !showApiSubmitPage) {
      setShowApiSubmitPage(true);
    }
  }

  const handleShowSubmitPage = () => {
    setShowApiSubmitPage(true);
  };
  const handleHideSubmitPage = () => {
    setShowApiSubmitPage(false);
  };
  // const handleSubmit = (weatherApiKey) => {
  //   Cookies.set("weatherApiKey", weatherApiKey);
  // };
  const GetCountryCoodrinates = () => {
    if (countriesToShow.length === 1 )
    return (
      <p>{countriesToShow[0].region}</p>
    );
  };
  
  return (
    <div>
      {showApiSubmitPage ? (
        <SubmitApiKeys onSubmit={handleHideSubmitPage} />
      ) : (
        <div>
          <button onClick={handleShowSubmitPage}>Modify API keys</button><br></br>
          <h1>Search for Country</h1>
          
          <div>
            Find countries <input value={query} onChange={handleQueryChange} />
          </div>
          <div>
            {countriesToShow.length > 10 ? (
              <div>Too many matches, be more specific.</div>
            ) : (
              <Countries
                countriesToShow={countriesToShow}
                setCountriesToShow={setCountriesToShow}
              />
            )}
          </div>
          <div>
            {countriesToShow.length === 1 ? (
              <CountryForm country={countriesToShow[0]} />
            ) : null}
          </div>
          <div>
            {/* <Leaflet/> */}
            {countriesToShow.length === 1 ? (
              <>
                <CountryCoodrinates country={countriesToShow[0]}/>
              </>
            ) : (
              <>
                <CountryCoodrinates />
              </>)}
            {/* <GetCountryCoodrinates></GetCountryCoodrinates>
            <Map /> */}
            {/* <GetcountryCoodrinates ></GetcountryCoodrinates> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;