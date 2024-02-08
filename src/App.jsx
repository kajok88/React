import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import Countries from "./components/Countries";
import CountryForm from "./components/CountryForm";
import SubmitApiKeys from "./components/SubmitApiKeys";
import Leaflet from "./components/Leaflet";
import Map from "./components/Map";
import GetCountryCoodrinates from "./components/GetCountryCoordinates";

import Search from "./components/Search";

import "./App.css"


import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import { Row, Col } from 'react-bootstrap';





import ApiSubmitPage from "./components/SubmitApiKeys";
import FavoritesMenu from "./components/FavoritesMenu";
import MoreMenu from "./components/MoreMenu";

import { CountryDataProvider } from "./contexts/CountryDataContext";
import { useCountryData } from "./contexts/CountryDataContext";


const App = () => {
  // For Searching and showing those countries
  const [query, setQuery] = useState("");
  // const [countries, setCountries] = useState([]);
  const countries = useCountryData();
  const [countriesToShow, setCountriesToShow] = useState([]);
  // const [showApiSubmitPage, setShowApiSubmitPage] = useState(false);

  const [countryCoordinates, setCountryCoordinates] = useState(null);
  const [capitalCoordinates, setCapitalCoordinates] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  // useEffect(() => {
  //   axios.get("https://restcountries.com/v3.1/all").then((response) => {
  //     setCountries(response.data);
  //   });
  // }, []);


  const handleQueryChange = (event) => {
    const search = event.target.value;
    setQuery(search);
    console.log(countries.data);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // Show the card when there's some input
    setShowCard(!!e.target.value);
  };

  const GetCountryCoodrinates2 = () => {
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
                id="search"
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                value={query}
                onChange={handleQueryChange}
              />
              
            </Form>
          </Nav>
        </Container>

        
        <Container>
          <Nav className="ms-auto">
            <MoreMenu></MoreMenu>
          </Nav>
          <Nav className="mx-auto">
            <FavoritesMenu></FavoritesMenu>
          </Nav>
        </Container>
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
            
            {/* <div>
              Find countries <input value={query} onChange={handleQueryChange} />
            </div> */}
            <div>
              
              <Container className="">
                <Row className="justify-content-center">
                  <Col xs={12} md={5}>
                    <div className="floating-search-card">
                    {query ? (
                      <Countries
                      countriesToShow={countriesToShow}
                      setCountriesToShow={setCountriesToShow}
                      setSelectedCountry={setSelectedCountry}
                      setQuery={setQuery}
                    />
                    ) : null}
                      
                    </div>
                  </Col>
                </Row>
              </Container>           
            </div>
            
            <div>
              {countriesToShow.length === 1 ? (
                <Container className="">
                  <Row className="justify-content-center align-items-center"> {/* Added align-items-center */}
                    <Col xs={12} md={2}>
                      <div className="floating-info-card with-blue-border">
                        <CountryForm country={countriesToShow[0]} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              ) : null}
            </div>
            <div>
              {/* <Leaflet/> */}
              {countriesToShow.length === 1 ? (
                <>
                  <GetCountryCoodrinates country={countriesToShow[0]}/>
                </>
              ) : (
                <>
                  <GetCountryCoodrinates />
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