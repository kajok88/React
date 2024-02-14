import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useApiKey } from '../contexts/ApiKeyContext';

// DISPLAYS A MENU ON THE NAVBAR, WHERE YOU CAN SUBMIT AND MODIFY YOUR APIKEYS.
// APIKEYS ARE SAVED IN APIKEYCONTEXT, HOWEVER A RELOAD RESETS THEM.

const ApiSubmitPage = () => {
  const { weatherApiKey, setWeatherApiKey, timezoneApiKey, setTimezoneApiKey } = useApiKey();
  const [inputValueWeather, setInputValueWeather] = useState('');
  const [inputValueTimezone, setInputValueTimezone] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleWeatherApiKeyChange = (event) => {
    const value = event.target.value;
    setInputValueWeather(value);
  };

  const handleTimezoneApiKeyChange = (event) => {
    const value = event.target.value;
    setInputValueTimezone(value);
  };

  const handleSubmitWeather = () => {
    setWeatherApiKey(inputValueWeather);
    setInputValueWeather('');
  };

  const handleSubmitTimezone = () => {
    setTimezoneApiKey(inputValueTimezone);
    setInputValueTimezone('');
  };

  
  return (
    <>
      <Nav.Link href="" onClick={handleShow}>Modify/Submit API Keys</Nav.Link>
      <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Modify/Submit API keys</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h2>Weather API Key:</h2>
            {weatherApiKey ? (
              <>
                <div>
                  <FloatingLabel controlId="floatingInput" label={weatherApiKey}>
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
            <h2>TimezoneDB API Key:</h2>
            {timezoneApiKey ? (
              <>
                <div>
                  <FloatingLabel controlId="floatingInput" label={timezoneApiKey}>
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
