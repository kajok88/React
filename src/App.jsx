import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import Countries from "./components/Countries";
import CountryForm from "./components/CountryForm";
import SubmitApiKeys from "./components/SubmitApiKeys";
import Leaflet from "./components/Leaflet";
import Map from "./components/Map";
import CountryCoodrinates from "./components/CountryCoordinates";
import Example from "./components/example";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';



import ApiSubmitPage from "./components/SubmitApiKeys";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [showApiSubmitPage, setShowApiSubmitPage] = useState(false);




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
    <>
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home" >
          <img
            alt=""
            // src="/img/logo.svg"
            src="./map_point.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Location Weather and Data
        </Navbar.Brand>
        <Nav className="me-auto">
          <ApiSubmitPage showPage={ApiSubmitPage}></ApiSubmitPage>
        </Nav>
      </Container>

      <Container>
        <Nav className="mx-auto">
          <Form >
            <Form.Control
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
          </Form>
        </Nav>
      </Container>
      
      <Container></Container>
    </Navbar>
    <div>
      {/* {showApiSubmitPage ? (
        <>

            <SubmitApiKeys setShowApiSubmitPage={setShowApiSubmitPage} onSubmit={handleHideSubmitPage} />

        </>
      ) : ( */}
        <div>
          {/* <button onClick={handleShowSubmitPage}>Modify API keys</button><br></br>
          {/* {showApiSubmitPage ? (
            <SubmitApiKeys setShowApiSubmitPage={setShowApiSubmitPage} onSubmit={handleHideSubmitPage}/>
          ) : null} */}
          {/* <ApiSubmitPage showPage={ApiSubmitPage}></ApiSubmitPage> */}
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
      {/* )} */}
    </div>
    </>
    
  );
};

export default App;