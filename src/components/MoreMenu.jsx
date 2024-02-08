import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import GetAllCapitals from './GetAllCapitals';

const MoreMenu = ({ showPage }) => {
  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Green');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };


  return (
    <>
      <Nav.Link href="" onClick={handleShow}>More</Nav.Link>
      <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark" placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>More:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <h2>Locate Capitals:</h2>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Select Pin Color
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleColorChange('Blue')}>Blue</Dropdown.Item>
              <Dropdown.Item onClick={() => handleColorChange('Green')}>Green</Dropdown.Item>
              <Dropdown.Item onClick={() => handleColorChange('Pink')}>Pink</Dropdown.Item>
              <Dropdown.Item onClick={() => handleColorChange('Red')}>Red</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <GetAllCapitals
            selectedColor={selectedColor}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MoreMenu;
