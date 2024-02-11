import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

const ApiSubmitPage = () => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [TimezoneApiKey, setTimezoneApiKey] = useState('');
  const [inputValueWeather, setInputValueWeather] = useState('');
  const [inputValueTimezone, setInputValueTimezone] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleWeatherApiKeyChange = (event) => {
    const value = event.target.value;
    setInputValueWeather(value);
    setWeatherApiKey(value);
  };

  const handleTimezoneApiKeyChange = (event) => {
    const value = event.target.value;
    setInputValueTimezone(value);
    setTimezoneApiKey(value);
  };

  const handleSubmitWeather = () => {
    // Cookie expires in 14 days.
    Cookies.set("weatherApiKey", weatherApiKey, { expires: 14 });
    // Clears the input field after submitting
    setWeatherApiKey('');
    setInputValueWeather('');
    window.location.reload();
  };

  const handleSubmitTimezone = () => {
    // Cookie expires in 14 days.
    Cookies.set("timezoneApiKey", TimezoneApiKey, { expires: 14 });
    // Clears the input field after submitting
    setTimezoneApiKey('');
    setInputValueTimezone('');
    window.location.reload();
  };

  
  return (
    <>
      <Nav.Link href="" onClick={handleShow}>Modify API Keys</Nav.Link>
      <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Modify API keys</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h2>Weather API:</h2>
            {Cookies.get('weatherApiKey') ? (
              <>
                <div>
                  <FloatingLabel controlId="floatingInput" label={Cookies.get('weatherApiKey')}>
                    <Form.Control type="text" placeholder="ApiKey" onChange={handleWeatherApiKeyChange} value={inputValueWeather} />
                  </FloatingLabel>
                </div>
                <div className="mt-2">
                  <Button variant="success" onClick={handleSubmitWeather}>
                    Submit
                  </Button>{' '}
                </div>
              </>
            ) : ( 
              <>
                <div>
                  <FloatingLabel controlId="floatingInput" label="Input API Key:">
                    <Form.Control type="text" placeholder="ApiKey"  onChange={handleWeatherApiKeyChange} value={inputValueWeather}/>
                  </FloatingLabel>
                </div>
                <div className="mt-2">
                  <Button variant="success" onClick={handleSubmitWeather}>
                    Submit
                  </Button>{' '}
                </div>
              </>
            )}
            <br></br>
          </div> 

          <div>
            <h2>TimezoneDB API:</h2>
            {Cookies.get('ipgeolocationApiKey') ? (
              <>
                <div>
                  <FloatingLabel controlId="floatingInput" label={Cookies.get('ipgeolocationApiKey')}>
                    <Form.Control type="text" placeholder="ApiKey" onChange={handleTimezoneApiKeyChange} value={inputValueTimezone} />
                  </FloatingLabel>
                </div>
                <div className="mt-2">
                  <Button variant="success" onClick={handleSubmitTimezone}>
                    Submit
                  </Button>{' '}
                </div>
              </>
            ) : ( 
              <>
                <div>
                  <FloatingLabel controlId="floatingInput" label="Input API Key:">
                    <Form.Control type="text" placeholder="ApiKey"  onChange={handleTimezoneApiKeyChange} value={inputValueTimezone}/>
                  </FloatingLabel>
                </div>
                <div className="mt-2">
                  <Button variant="success" onClick={handleSubmitTimezone}>
                    Submit
                  </Button>{' '}
                </div>
              </>
            )}
            <br></br>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ApiSubmitPage;
