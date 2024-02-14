import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useApiKey } from '../contexts/ApiKeyContext';

// DISPLAYS A MENU ON THE NAVBAR, WHERE YOU CAN SUBMIT AND MODIFY YOUR APIKEYS.
// APIKEYS ARE SAVED IN APIKEYCONTEXT, HOWEVER A RELOAD RESETS THEM.

const SubmitApiKeys = () => {
  const { weatherApiKey, setWeatherApiKey, timezoneApiKey, setTimezoneApiKey, storeToSessionStorage, toggleStoreToSessionStorage } = useApiKey();
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
    if (storeToSessionStorage) {
      sessionStorage.setItem('weatherApiKey', inputValueWeather);
    } else {
      
    }
    setWeatherApiKey(inputValueWeather);
    setInputValueWeather('');
  };

  const handleSubmitTimezone = () => {
    if (storeToSessionStorage) {
      sessionStorage.setItem('timezoneApiKey', inputValueTimezone);
    } else {
      
    }
    setTimezoneApiKey(inputValueTimezone);
    setInputValueTimezone('');
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Hox!</Popover.Header>
      <Popover.Body>
        API keys are stored in useContext by default, meaning they will disappear on page reload. 
        Use this to persist data over your session. API keys and this option will reset when the tab is closed.
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Nav.Link href="" onClick={handleShow}>Modify/Submit API Keys</Nav.Link>
      <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Modify/Submit API keys</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body><br></br>
          <div>
            {/* Toggle for storing API keys to session storage */}
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={popover}
            >
              <Form.Check
                type="switch"
                id="storeToSessionStorageToggle"
                label="Store API keys to Session Storage"
                checked={storeToSessionStorage}
                onChange={toggleStoreToSessionStorage}
              />
            </OverlayTrigger>
          </div><br></br><br></br>

          <div>
            <h2>Weather API Key:</h2>
            {weatherApiKey ? (    // Changes the label of the form with the existing API key, if exists.
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
            {timezoneApiKey ? (   // Changes the label of the form with the existing API key, if exists.
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

export default SubmitApiKeys;
