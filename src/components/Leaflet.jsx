import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from 'leaflet';

const Map = () => {
  const [coordinates, setCoordinates] = useState("");
    
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

        },
        (error) => {
          // If location permission denied, set coordinates to Helsinki
          console.error('Error getting location:', error.message);
          setCoordinates({ latitude: 60.1695, longitude: 24.9354 });
        }
      );
    } else {
      // In case of some other error, also set coordinates to Helsinki
      console.error('Geolocation is not supported by your browser');
      setCoordinates({ latitude: 60.1695, longitude: 24.9354 });
    }
  }, []);

  const pinIcon = new Icon({
    iconUrl: "pin.png",
    iconSize: [40,40]
  });
  const pointIcon = new Icon({
    iconUrl: "map_point.png",
    iconSize: [40,40]
  });

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
      },
    });
    return false;
}

  
    return (
      <>
      <div>
        {coordinates ? (
          <p>Your coordinates: {coordinates.latitude}, {coordinates.longitude}</p>
        ) : (
          <p>Loading coordinates...</p>
        )}
        {coordinates && (
          <MapContainer center={[coordinates.latitude, coordinates.longitude]} zoom={5} style={{ height: '600px', width: '600px' }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coordinates.latitude, coordinates.longitude]} icon={pointIcon}>
              <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <MapEvents />
          </MapContainer>
        )}
      </div>
      </>
    );
  };
  
  export default Map;