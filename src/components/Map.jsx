import { React, useEffect, useState } from "react";
import { LayersControl, MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";

import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

import '../App.css'

import GetGeoData from "./GetGeoData";

const { BaseLayer } = LayersControl;

const Map = ({ countryCoordinates, capitalCoordinates, noCoordinates }) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [pinPosition, setPinPosition] = useState(null);
  // const [countryCoordinates, setCountryCoordinates] = useState(null);
  

  useEffect(() => {
    if (!map) return;

    L.easyButton("fa-map-marker fa-2x", () => {
      
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 10);
      });
    }).setPosition('bottomleft').addTo(map);
  }, [map]);

  const PlacePin = () => {
    const map = useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setPinPosition({ lat, lng });
        map.setView([lat, lng]);
      },
    });

    return null;
  };

  const pointIcon = new Icon({
    iconUrl: "map_point.png",
    iconSize: [35,35]
  });

  const pinIcon = new Icon({
    iconUrl: "pin_red.png",
    iconSize: [35,70]
  });
  const pinBlueIcon = new Icon({
    iconUrl: "pin_blue.png",
    iconSize: [35,70]
  });

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
        {position === null ? null : (
          <Marker position={position} icon={pointIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </div>
      <div>
        {pinPosition === null ? null : (
          <Marker position={pinPosition} icon={pinIcon}>
            <Popup>Pinned!</Popup>
          </Marker>
        )}
      </div>
      <div>
        {capitalCoordinates ? (
          <Marker position={[capitalCoordinates.capLat, capitalCoordinates.capLng]} 
            icon={pinBlueIcon}>
            <Popup>Pinned!</Popup>
          </Marker>
        ) : (
          null
        )}
      </div>
    </>
  );

  return (
    <>
      <div>
        <Container className="">
          <Row className="justify-content-center align-items-center"> {/* Added align-items-center */}
            <Col xs={12} md={2}>
              <div className="floating-popup-card popup-coord-info">
              {position ? (
                <p>Your coordinates: {position.lat}, {position.lng}</p>
              ) : (
                <p>Loading coordinates...</p>
              )}
              </div>
            </Col>
          </Row>
        </Container>
        
      </div>
      <div>
      <Container className="">
          <Row className="justify-content-center align-items-center"> {/* Added align-items-center */}
            <Col xs={12} md={2}>
              <div className="floating-popup-card popup-pin-info">
              {pinPosition ? (
                <p>Placed a pin on: {pinPosition.lat}, {pinPosition.lng}</p>
              ) : (
                <p>Place a pin with a click:</p>
              )}
              </div>
            </Col>
          </Row>
        </Container>
        
      </div>
      <div>
        <div>
          {countryCoordinates ? (
            <MapContainer 
              center={[countryCoordinates?.lat, countryCoordinates?.lng]}
              zoom={4.5}

              style={{ height: '94vh', width: '100%' }}
              zoomControl={false}
              ref={setMap}
              // style={{ height: "100vh" }}
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
            // style={{ height: "100vh" }}
            >
            <ZoomControl position="bottomleft" />
            <MapContainerContents/>
            <PlacePin></PlacePin>
          </MapContainer>
          ) : (
            null
          )}
        </div>
        <div>
          {capitalCoordinates ? (
            <>
            <GetGeoData coordinates={capitalCoordinates} pin={"blue"}/>
            </>
          ) : (
            null
          )}
        </div>
        <div>
          {pinPosition ? (
            <>
            <GetGeoData coordinates={pinPosition} pin={"red"}/>
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </>
  );
}
export default Map;