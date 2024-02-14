import { React, useEffect, useState } from "react";
import axios from "axios";
import { LayersControl, MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import '../App.css'
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import GetGeoData from "./GetGeoData";
import WeatherInfo from "./WeatherInfo";
import { useContainerState } from '../contexts/ContainerStateContext';
import { usePinContext } from '../contexts/PinContext';
import { useApiKey } from '../contexts/ApiKeyContext';

const Map = ({ countryCoordinates, capitalCoordinates, noCoordinates }) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [redPinPosition, setRedPinPosition] = useState(null);
  const [bluePinPosition, setBluePinPosition] = useState(null);
  const { containerState, handleContainerState } = useContainerState();
  const { fetchedRedPin, fetchedBluePin, setPin, capitalPins, capitalPinColor } = usePinContext();
  const [localTime, setLocalTime] = useState(null);
  const { timezoneApiKey } = useApiKey();
  const { BaseLayer } = LayersControl;

  const API_KEY = timezoneApiKey;

  useEffect(() => {
    if (fetchedRedPin) {
      console.log("GOT IT, RED");
      console.log([fetchedRedPin.coordinates.lat, fetchedRedPin.coordinates.lng]);
      console.log(fetchedRedPin.coordinates);
      setRedPinPosition(fetchedRedPin.coordinates);
    }
  }, [fetchedRedPin]);

  useEffect(() => {
    if (fetchedBluePin) {
      console.log("GOT IT, BLUE");
      console.log(fetchedBluePin.coordinates);
      setBluePinPosition(fetchedBluePin.coordinates);
    }
  }, [fetchedBluePin]);

  useEffect(() => {
    if (capitalCoordinates) {
      handleAddBluePin(capitalCoordinates);
      setBluePinPosition(capitalCoordinates);
    }
    // Adds a "Locate me" icon to the map
    if (!map) return;
    L.easyButton("fa-map-marker fa-2x", () => {
      handleContainerState('yourLocationContainer', true);
      handleContainerState('yourLocalWeatherContainer', true);
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 10);
      });
      
    }).setPosition('bottomleft').addTo(map);
  }, [map]);
  
  // Gives red pin a local time, which is shown when the placed pin is clicked.
  useEffect(() => {
    if (redPinPosition) {
      const { lat, lng } = redPinPosition;
      axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`)
      .then((response) => {
        setLocalTime(response.data);
        console.log("Time Api response:", response.data);
      })
      .catch((error) => {
        console.error('Error fetching timezone data (only 1 request per second allowed):', error);
      });
    }
  }, [redPinPosition]);

  // Place a pin on the map with a click.
  const PlacePin = () => {
    const map = useMapEvents({
      click(e) {
        handleContainerState('redPinLocationContainer', true);
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setRedPinPosition({ lat, lng });
        handleAddRedPin({ lat, lng });
        map.setView([lat, lng]);
      },
    });
    return null;
  };

  // Sends red pin's coordinate data to -> PinContext.jsx -> FavoritesMenu.jsx
  const handleAddRedPin = (coordinates) => {
    setPin('red', coordinates);
    // console.log("RED PIN CONTEXT: ", coordinates)
  };

  // Sends blue pin's coordinate data to -> PinContext.jsx -> FavoritesMenu.jsx
  const handleAddBluePin = (coordinates) => {
    setPin('blue', coordinates);
    // console.log("BLUE PIN CONTEXT: ", coordinates)
  };

  // Handles each components showstate from the ContainerStateContext.jsx.
  // Triggered by clicking the cross in the upperright corner of a component.
  const handleClose = (containerId) => {
    handleContainerState(containerId, false);
  };

  // Handles the icon/pincolor selection for each marker.
  const handleIcon = (color) => {
    switch (color) {
      case 'red':
        return new Icon({
          iconUrl: "pin_red.png",
          iconSize: [35, 70]
        });
      case "blue":
        return new Icon({
          iconUrl: "pin_blue.png",
          iconSize: [35, 70]
        });
      case "green":
        return new Icon({
          iconUrl: "pin_green.png",
          iconSize: [35, 70]
        });
      case "pink":
        return new Icon({
          iconUrl: "pin_pink.png",
          iconSize: [35, 70]
        });
      default:
        return new Icon({
          iconUrl: "map_point.png",
          iconSize: [35,35]
        });
    }
  };

  // Common map container components, just for making the code a bit more compact.
  const MapContainerContents = () => (
    <>
      <LayersControl position="bottomleft">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            minZoom={3}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />
        </BaseLayer>
      </LayersControl>
      <div>
        {capitalPins ? (
          capitalPins.map((pin, index) => (
            <Marker 
              key={index} 
              position={[pin.coordinates.lat, pin.coordinates.lng]} 
              icon={handleIcon(capitalPinColor.selectedColor)}>
              <Popup>{pin.capitalName}</Popup>
            </Marker>
          ))
        ) : (
          null
        )}
      </div>
      <div> {/* FOR DRAWING LOCATION MARKER */}
        {position === null ? null : (
          <Marker position={position} 
            icon={handleIcon("point")}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </div>
      <div> {/* FOR DRAWING THE BLUE PIN */}
        {bluePinPosition ? (
          <Marker position={[bluePinPosition.capLat, bluePinPosition.capLng]} 
            icon={handleIcon("blue")}>
            <Popup>Capital!</Popup>
          </Marker>
        ) : (
          null
        )}
      </div>
      <div> {/* FOR DRAWING THE RED PIN */}
        {redPinPosition === null ? null : (
          <Marker position={redPinPosition} 
            icon={handleIcon("red")}>
            {localTime ? (
              // "formatted" comes with date and time, so we split it and take just the time part.
              <Popup>{`Local Time: ${localTime.formatted.split(" ")[1]}`}</Popup>
            ) : (
              <Popup>Pinned!</Popup>
            )}
          </Marker>
        )}
      </div>
    </>
  );

  return (
    <>
      <div> {/* THIS IS THE UPPER RIGHT BLACK INFO BOX */}
      {containerState.yourLocationContainer ? (
        <Container className="">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={2}>
              <div className="floating-popup-card popup-coord-info">
                <CloseButton 
                  onClick={() => handleClose('yourLocationContainer')}
                  className='hide-container-button'
                />
                {containerState.yourLocationContainer && position ? (
                  <p>Your coordinates: {position.lat}, {position.lng}</p>
                ) : (
                  <p>Locate yourself to view local weather</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        null
      )}
      </div> 

      <div> {/* THIS IS THE UPPER RIGHT RED INFO BOX */}
      {containerState.redPinLocationContainer ? (
        <Container className="">
          <Row className="justify-content-center align-items-center"> 
            <Col xs={12} md={2}>
              <div className="floating-popup-card popup-pin-info">
              <CloseButton 
                onClick={() => handleClose('redPinLocationContainer')}
                className='hide-container-button'
                />
              {redPinPosition ? (
                <p>Placed a pin on: {redPinPosition.lat}, {redPinPosition.lng}</p>
              ) : (
                <p>Place a pin with a click:</p>
              )}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        null
      )}
      </div> 
      
          
      <div> {/* THIS IS THE UPPER RIGHT RED INFO BOX */}
      {containerState.yourLocalWeatherContainer && position ? (
        <Container className="">
          <Row className="justify-content-center align-items-center"> 
            <Col xs={12} md={2}>
              <div className="floating-local-weather">
              <CloseButton 
                onClick={() => handleClose('yourLocalWeatherContainer')}
                className='hide-container-button'
                />
                <WeatherInfo lat={position.lat} lng={position.lng} city={"your location"}/>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        null
      )}
      </div> 

      <div> {/* THIS IS FOR DRAWING THE WHOLE MAP */}
        <div>
          {countryCoordinates ? (
            <MapContainer 
              center={[countryCoordinates?.lat, countryCoordinates?.lng]}
              zoom={4.5}

              style={{ height: '94vh', width: '100%' }}
              zoomControl={false}
              ref={setMap}
              >
              <ZoomControl position="bottomleft" />
              <MapContainerContents/>
              <PlacePin/>
            </MapContainer>
          ) : (
            null
          )}
        </div>
        <div>
          {noCoordinates ? (
            <MapContainer 
            center={[44, 22]}
            zoom={3}

            style={{ height: '94vh', width: '100%' }}
            zoomControl={false}
            ref={setMap}
            >
            <ZoomControl position="bottomleft" />
            <MapContainerContents/>
            <PlacePin></PlacePin>
          </MapContainer>
          ) : (
            null
          )}
        </div>

         <div> {/* FOR DRWAING THE INFO AND WEATHER CONTAINERS  */}
          {bluePinPosition ? (
            <GetGeoData coordinates={bluePinPosition} pin={"blue"}/>
          ) : (
            null
          )}
        </div>
        <div>
          {redPinPosition ? (
            <GetGeoData coordinates={redPinPosition} pin={"red"}/>
          ) : (
            null
          )}
        </div>
      </div>
    </>
  );
}
export default Map;