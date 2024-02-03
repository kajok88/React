import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const ApiSubmitPage = ({ showPage }) => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const [saved, setSaved] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Check if the cookie exists when the component mounts
    // const weatherApiKeyCookie = Cookies.get('weatherApiKey');
    // if (weatherApiKeyCookie) {
    //   setSaved(true);
    // }
    if (showPage === true) {
      setShow(true);
    }
  }, []); // Empty dependency array to run the effect only once on mount

  const handleApiKeyChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setWeatherApiKey(value);
    // If API key is found, set the button text to "EDIT" when typing
    // setSaved(value === '' && Cookies.get('weatherApiKey'));
  };

  const handleSubmit = () => {
    // Cookie expires in 14 days.
    Cookies.set("weatherApiKey", weatherApiKey, { expires: 14 });
    // setSaved(true);
    // onSubmit(weatherApiKey);
    // Clears the input field after submitting
    setWeatherApiKey('');
    setInputValue('');
  };

  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      Modify API keys
      </Button>
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
                    <Form.Control type="text" placeholder="ApiKey" onChange={handleApiKeyChange} value={inputValue} />
                  </FloatingLabel>
                </div>
                <div className="mt-2">
                  <Button variant="success" onClick={handleSubmit}>
                    Submit
                  </Button>{' '}
                </div>
              </>
            ) : ( 
              <>
                <div>
                  <FloatingLabel controlId="floatingInput" label="Input API Key:">
                    <Form.Control type="text" placeholder="ApiKey"  onChange={handleApiKeyChange} value={inputValue}/>
                  </FloatingLabel>
                </div>
                <div className="mt-2">
                  <Button variant="success" onClick={handleSubmit}>
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
