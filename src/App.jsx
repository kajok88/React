import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import ApiSubmitPage from "./components/SubmitApiKeys";
import FavoritesMenu from "./components/FavoritesMenu";
import Countries from "./components/Countries";
import CountryForm from "./components/CountryForm";
import GetCountryCoodrinates from "./components/GetCountryCoordinates";
import MoreMenu from "./components/MoreMenu";
import { useCountryData } from "./contexts/CountryDataContext";


const App = () => {
  const [query, setQuery] = useState("");
  const countries = useCountryData();
  const [countriesToShow, setCountriesToShow] = useState([]);


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

  const handleClose = () => {
    setCountriesToShow([]); // This essentially resets the component
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Currently prevents reload by pressing Enter, as accident reload refreshes everything.
  }
  
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="logo.png"
              src="./map_point.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Location Weather and Data
          </Navbar.Brand>
          <Nav className="me-auto">
            <ApiSubmitPage></ApiSubmitPage>
          </Nav>
        </Container>

        <Container>
          <Nav className="mx-auto">
            <Form onSubmit={handleSubmit}>
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
        <div>
          <Container className="">
            <Row className="justify-content-center">
              <Col xs={12} md={5}>
                <div className="floating-search-card">
                {query ? (
                  <Countries
                  countriesToShow={countriesToShow}
                  setCountriesToShow={setCountriesToShow}
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
                    <CountryForm country={countriesToShow[0]} handleClose={handleClose} />
                  </div>
                </Col>
              </Row>
            </Container>
          ) : null}
        </div>
        <div>
          {countriesToShow.length === 1 ? (
            <>
              <GetCountryCoodrinates country={countriesToShow[0]}/>
            </>
          ) : (
            <>
              <GetCountryCoodrinates />
            </>)}
        </div>
      </div>
    </>
  );
};

export default App;