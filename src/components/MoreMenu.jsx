import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import GetAllCapitals from './GetAllCapitals';
import "../App.css"

const MoreMenu = ({ showPage }) => {
  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState('green');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    console.log("Pin color set to:", color);
  };


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
            {['Blue', 'Green', 'Pink', 'Red'].map(color => (
            <Form.Check
                key={color}
                type="radio"
                id={`radio-${color}`}
                label={color}
                checked={selectedColor === color}
                onChange={() => handleColorChange(color)}
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
