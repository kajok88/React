import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import GetAllCapitals from './GetAllCapitals';
import "../App.css"

// DISPLAYS A MENU ON THE NAVBAR, WHERE YOU CAN LOCATE ALL THE WORLD'S CAPITALS,
// WITH 4 AVAILABLE PIN COLORS, THROUGH THE GETALLCAPITALS.jsx -COMPONENT.

const MoreMenu = () => {
  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState('green');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    console.log("Pin color set to:", color);
  };

  // SETUP FOR THE DIFFERENT PINS
  const pins = [

    { id: 'greenPin', label: 'Green', value: 'green' },
    { id: 'redPin', label: 'Red', value: 'red' },
    { id: 'bluePin', label: 'Blue', value: 'blue' },
    { id: 'pinkPin', label: 'Pink', value: 'pink' }
  ];

  return (
    <>
      <Nav.Link href="" onClick={handleShow}>More</Nav.Link>
      <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark" placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>More:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <h2>Locate Capitals:</h2><br></br>
        <h5>Select Pin Color:</h5>
        <Form>
            {pins.map(pin => (
            <Form.Check
                key={pin.id}
                type="radio"
                id={pin.id}
                label={pin.label}
                checked={selectedColor === pin.value}
                onChange={() => handleColorChange(pin.value)}
            />
            ))}
        </Form>
          <GetAllCapitals
            selectedColor={selectedColor}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MoreMenu;
