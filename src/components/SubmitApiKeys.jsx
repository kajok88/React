import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const ApiSubmitPage = ({ }) => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [saved, setSaved] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Check if the cookie exists when the component mounts
    const weatherApiKeyCookie = Cookies.get('weatherApiKey');
    if (weatherApiKeyCookie) {
      setSaved(true);
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
    setSaved(true);
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
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Modify API keys:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h2>Weather API:</h2>
            <div>
              <strong>Current API Key:</strong> {Cookies.get('weatherApiKey') || 'Empty'}
            </div>
            <label>
              Input API Key:
              <input type="text" value={weatherApiKey} onChange={handleApiKeyChange} />
            </label>
            <button onClick={handleSubmit}>
              {saved ? (inputValue === '' ? 'SAVED' : 'EDIT') : 'SUBMIT'}
            </button>
            <br></br>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ApiSubmitPage;
