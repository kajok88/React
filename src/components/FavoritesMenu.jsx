import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { usePinContext } from '../contexts//PinContext';

const FavoritesMenu = () => {
  const { redPin, bluePin } = usePinContext();
  const [selectedPin, setSelectedPin] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSelectPin = (pin) => {
    setSelectedPin(pin);
  };

  const handleSelect = () => {
    const selectedPinData = selectedPin === 'red' ? redPin : bluePin;
    console.log('Selected Pin Coordinates:', selectedPinData);
  };

  const pins = [
    { id: 'redPin', label: 'Red Pin', value: 'red' },
    { id: 'bluePin', label: 'Blue Pin', value: 'blue' },
  ];
  
  return (
    <>
      <Nav.Link href="" onClick={handleShow}>Favorites</Nav.Link>
      <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark" placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Save and Fetch Favorites</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h2>Select pin:</h2>
            <Form>
              {pins.map(pin => (
                <Form.Check
                  key={pin.id}
                  type="radio"
                  id={pin.id}
                  label={pin.label}
                  checked={selectedPin === pin.value}
                  onChange={() => handleSelectPin(pin.value)}
                />
              ))}
            </Form>
            <br />
            <Button variant="success" onClick={handleSelect}>Select</Button>
          </div> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FavoritesMenu;
