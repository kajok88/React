import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { usePinContext } from '../contexts/PinContext';
import '../App.css'
import { differenceInDays } from 'date-fns';
import pinService from '../services/pinService'

const FavoritesMenu = () => {
  const { redPin, bluePin, setFetchedPin } = usePinContext();
  const [selectedPin, setSelectedPin] = useState(null);
  const [saveTitle, setSaveTitle] = useState('');
  const [show, setShow] = useState(false);
  const [fetchedPins, setFetchedPins] = useState([]);
  const [editedPin, setEditedPin] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSelectPin = (pin) => {setSelectedPin(pin);};

useEffect(() => {
  if (show) { // Fetch th pin data only when the menu is opened
    pinService
      .getAll()
      .then((response) => {
        console.log("Fetched pins from DB:", response);
        setFetchedPins(response);
      })
      .catch((error) => {
        console.error('Error fetching pins:', error);
      });
  }
}, [show]);

  // WHEN CLICKING 'SAVE'
  const handleSave = () => {
    if (!saveTitle.trim()) {
      alert('Please enter a title for your save.');
      return;
    };
    let pinCoordinates;
    if (selectedPin === 'red') {
      if (redPin === null ||redPin.lat === null || redPin.lng === null) {
        alert('No red pin placed');
        return;
      }
      pinCoordinates = {
        lat: redPin.lat,
        lng: redPin.lng
      };
    } else if (selectedPin === 'blue') {
      if (bluePin === null || bluePin.lat === null || bluePin.lng === null) {
        alert('No blue pin placed');
        return;
      }
      pinCoordinates = {
        lat: bluePin.lat,
        lng: bluePin.lng
      };
    } else {
      alert('Invalid pin type');
      return;
    }
    const pinData = {
      pinType: selectedPin,
      title: saveTitle,
      coordinates: pinCoordinates,
    };
    console.log(pinData)

    pinService
      .create(pinData)
      .then((response) => {
        console.log('Pin saved successfully:', response);
        setFetchedPins(prevPins => [...prevPins, response]);
      })
      .catch((error) => {
        console.error('Error saving pin:', error);
      });
  };
  const handleInputChange = (event) => {
    setSaveTitle(event.target.value);
  };


  // AFTER CLICKING THE FETCHABLE PIN
  const handleFetchPin = (pin) => { // Send the fetched pin to pinContext.jsx and close the menu
    // console.log("Outgoing fetched pin: ", pin);
    setFetchedPin(pin);
    handleClose();
  }


  // WHEN CLICKING THE EDITABLE LIST ITEM
  const handleEditTitle = (pin) => {
    setEditedPin(pin.id);
    setEditedTitle(pin.title);
  };


  // WHEN SUBMITTING THE EDIT CHANGE
  const handleSubmitTitle = async (pinId) => {
    if (editedTitle.trim() === '') return; // Do not update if title is empty
    await pinService.update(pinId, { title: editedTitle });

    setFetchedPins(prevPins =>  // Update the list with the edited pin title
      prevPins.map(pin =>
        pin.id === pinId ? { ...pin, title: editedTitle } : pin
      )
    );
    setEditedPin(null);
  };


  // WHEN SELECTING A PIN TO BE DELETED
  const handleDeletePin = async (pinId) => {
    const confirmDelete = window.confirm(`Delete pin ${pinId.title}?`);
    if (confirmDelete) {
      try {
        await pinService.remove(pinId);
        setFetchedPins(prevPins => prevPins.filter(pin => pin.id !== pinId));
      } catch (error) {
        console.error('Error deleting pin:', error);
      }
    }
  };


  // FOR DISPLAYING THE AGE IN DAYS FOR EACH PIN SAVED
  const formatDate = (date) => {
    const difference = differenceInDays(new Date(), new Date(date));
    return `${difference} days ago`;
  };

  // RADIO BUTTONS
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

          {/* THIS IS THE FORM FOR SAVING CONTENT TO DATABASE */}
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

          {/* THIS IS THE TABS MENU FOR DISPLAYING/EDITING CONTENT IN THE DATABASE */}
          <div className='mt-5'> 
            <Tabs
              defaultActiveKey="fetch"
              id="uncontrolled-tab-example"
              className="mb-3"
              fill
              style={{ display: 'flex', flexDirection: 'row'}}
            >
              {/* FETCH TAB */}
              <Tab eventKey="fetch" title="Fetch">  
                <h2>Fetch pin:</h2>
                <ListGroup as="ol" numbered>
                  {fetchedPins.map(pin => (
                    <ListGroup.Item
                      key={pin.id}
                      as="li"
                      onClick={() => handleFetchPin(pin)}
                      className="d-flex justify-content-between align-items-start fetched-pin">
                      <div className="ms-2 me-auto ">
                        <div className="fw-bold ">
                          {pin.title}
                        </div>
                        <div>
                          Coordinates: {pin.coordinates.lat.toFixed(2)}, {pin.coordinates.lng.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        {pin.pinType === "red" ? (
                          <Badge bg="danger" pill>{formatDate(pin.date)}</Badge>
                        ) : (
                          <Badge bg="primary" pill>{formatDate(pin.date)}</Badge>
                        )}
                      </div>
                      <br></br>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>

              {/* EDIT TAB */}
              <Tab eventKey="edit" title="Edit"> 
                <h2>Edit pin title:</h2>
                <ListGroup as="ol" numbered>
                  {fetchedPins.map((pin) => (
                    <ListGroup.Item
                      key={pin.id}
                      as="li"
                      className={`d-flex justify-content-between align-items-start fetched-pin`}
                      >
                      <div className="ms-2 me-auto">
                        {editedPin === pin.id ? (
                          <Form.Control
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onBlur={() => handleSubmitTitle(pin.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSubmitTitle(pin.id);
                            }}
                            autoFocus
                          />
                        ) : (
                          <div className="fw-bold" onClick={() => handleEditTitle(pin)}>
                            {pin.title}
                          </div>
                        )}
                        <div className='faded'>
                          Coordinates: {pin.coordinates.lat.toFixed(2)}, {pin.coordinates.lng.toFixed(2)}
                        </div>
                      </div>
                      {pin.pinType === 'red' ? (
                        <Badge bg="danger" pill>
                          {formatDate(pin.date)}
                        </Badge>
                      ) : (
                        <Badge bg="primary" pill>
                          {formatDate(pin.date)}
                        </Badge>
                      )}
                      <br></br>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>
              
              {/* DELETE TAB */}
              <Tab eventKey="delete" title="Delete"> 
                <h2>Delete pin:</h2>
                <ListGroup as="ol" numbered>
                  {fetchedPins.map(pin => (
                    <ListGroup.Item key={pin.id} as="li" className="d-flex justify-content-between align-items-start fetched-pin">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          {pin.title}
                        </div>
                        <div>
                          Coordinates: {pin.coordinates.lat.toFixed(2)}, {pin.coordinates.lng.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <Button variant="danger" onClick={() => handleDeletePin(pin.id, pin.title)}>
                          Delete
                        </Button>
                      </div>
                      <br></br>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>
            </Tabs>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FavoritesMenu;
