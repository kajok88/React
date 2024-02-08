import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';

const MoreMenu = ({ showPage }) => {
  // const [weatherApiKey, setWeatherApiKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const [saved, setSaved] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

    if (showPage === true) {
      handleShow();
    }

  }, []); 

//   const handleApiKeyChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);
//     setWeatherApiKey(value);
//   };

  const handleSubmit = () => {
    // setWeatherApiKey('');
    setInputValue('');
  };

  
  return (
    <>
      <Nav.Link href="" onClick={handleShow}>More</Nav.Link>
      <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark" placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>More:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h2>Locate Capitals:</h2>
            {show ? (
              <>
              </>
            ) : ( 
              <>
              </>
            )}
            <br></br>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MoreMenu;
