import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

const ApiSubmitPage = ({ onSubmit }) => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [saved, setSaved] = useState(false);

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
    Cookies.set("weatherApiKey", weatherApiKey);
    setSaved(true);
    onSubmit(weatherApiKey);
    // Clears the input field after submitting
    setWeatherApiKey('');
    setInputValue('');
  };

  return (
    <div>
      <h1>Modify API keys:</h1>
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
      <button onClick={onSubmit}>BACK</button>
    </div>
  );
};

export default ApiSubmitPage;
