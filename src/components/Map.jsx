import { React, useEffect, useState } from "react";
import { LayersControl, MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";

const { BaseLayer } = LayersControl;

const Map = ({ coordinates, defaultMode }) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [pinPosition, setPinPosition] = useState(null);
  const [countryCoordinates, setCountryCoordinates] = useState(null);
  

  useEffect(() => {
    if (!map) return;

    L.easyButton("fa-map-marker fa-2x", () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }).addTo(map);
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
    iconUrl: "pin.png",
    iconSize: [35,70]
  });

  const MapContainerContents = () => (
    <>
    <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />
        </BaseLayer>
      </LayersControl>
    {position === null ? null : (
      <Marker position={position} icon={pointIcon}>
        <Popup>You are here</Popup>
      </Marker>
      )}
      {pinPosition === null ? null : (
      <Marker position={pinPosition} icon={pinIcon}>
        <Popup>Pinned!</Popup>
      </Marker>
      )}
    </>
  );

  return (
    <>
      <div>
        {position ? (
          <p>Your coordinates: {position.lat}, {position.lng}</p>
        ) : (
          <p>Loading coordinates...</p>
        )}
      </div>
      <div>
        {pinPosition ? (
          <p>Placed a pin on: {pinPosition.lat}, {pinPosition.lng}</p>
        ) : (
          <p>Place a pin with a click:</p>
        )}
      </div>
      <div>
      {coordinates ? (
          <MapContainer 
          center={[coordinates?.lat, coordinates?.lng]}
          zoom={4.5}
          style={{ height: '600px', width: '600px' }} 
          // style={{ height: "100vh" }}
          
        >
          <MapContainerContents/>
          <PlacePin/>
        </MapContainer>
        ) : (
          null
        )}
        {defaultMode ? (
          <MapContainer 
          center={[59.225, 18.105]}
          zoom={4.5}
          style={{ height: '600px', width: '600px' }} 
          // style={{ height: "100vh" }}
          
        >
          <MapContainerContents/>
          <PlacePin/>
        </MapContainer>
        ) : (
          null
        )}
      </div>
    </>
  );
}
export default Map;