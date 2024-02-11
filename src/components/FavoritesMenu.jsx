import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { usePinContext } from '../contexts/PinContext';
import axios from 'axios';
import '../App.css'
import { differenceInDays } from 'date-fns';

const FavoritesMenu = () => {
  const { redPin, bluePin, setFetchedPin } = usePinContext();
  const [selectedPin, setSelectedPin] = useState(null);
  const [saveTitle, setSaveTitle] = useState('');
  const [show, setShow] = useState(false);
  const [fetchedPins, setFetchedPins] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSelectPin = (pin) => {
    setSelectedPin(pin);
  };

  // Send the fetched pin to pinContext.jsx and close the menu
  const handleFetchPin = (pin) => {
    console.log("Outgoing fetched pin: ", pin);
    setFetchedPin(pin);
    handleClose();
  }

  const handleInputChange = (event) => {
    setSaveTitle(event.target.value);
  };

  const formatDate = (date) => {
    const difference = differenceInDays(new Date(), new Date(date));
    return `${difference} days ago`;
  };

  useEffect(() => {
    axios.get("http://localhost:3004/pins")
      .then((response) => {
      console.log("Fetched pins:", response.data);
      setFetchedPins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pins:', error);
      });
  }, []);


  const handleSave = () => {
    if (!saveTitle.trim()) {
      alert('Please enter a title for your save.');
      return;
    };
    const pinCoordinates = selectedPin === 'red' ? redPin : bluePin;
    const pinData = {
      pinType: selectedPin,
      title: saveTitle,
      coordinates: pinCoordinates,
    };
    console.log(pinData)
    // POST request to the backend
    axios.post('http://localhost:3004/pins', pinData)
      .then((response) => {
        console.log('Pin saved successfully:', response.data);
        setFetchedPins(prevPins => [...prevPins, response.data]);
      })
      .catch((error) => {
        console.error('Error saving pin:', error);
      });
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
            <h2>Save pin:</h2>
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
              <Form.Group className='mt-2' controlId="pinName">
                <Form.Label>Title:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter a title" 
                  value={saveTitle} 
                  onChange={handleInputChange} />
              </Form.Group>
            </Form>
            <br />
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
          </div> 

          <div className='pin-table mt-4'>
            <h2>Fetch pin:</h2>
            <ListGroup as="ol" numbered>
              {fetchedPins.map(pin => (
                <ListGroup.Item
                  key={pin.id}
                  as="li"
                  onClick={() => handleFetchPin(pin)}
                  className="d-flex justify-content-between align-items-start fetched-pin">
                  <div className="ms-2 me-auto ">
                    <div className="fw-bold ">{pin.title}</div>
                    {pin.pinType === "red" ? (
                      `Coordinates: ${pin.coordinates.lat.toFixed(2)}, ${pin.coordinates.lng.toFixed(2)}`
                    ) : (
                      `Coordinates: ${pin.coordinates.capLat.toFixed(2)}, ${pin.coordinates.capLng.toFixed(2)}`
                    )}
                  </div>
                    {pin.pinType === "red" ? (
                      <Badge bg="danger" pill>{formatDate(pin.date)}</Badge>
                    ) : (
                      <Badge bg="primary" pill>{formatDate(pin.date)}</Badge>
                    )}
                  <br></br>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FavoritesMenu;
