import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from "react";
import { Icon, L } from 'leaflet';
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import "/src/App.css";

const Map = () => {
  const [yourCoordinates, setYourCoordinates] = useState("");
  const [clickedCoordinates, setClickedCoordinates] = useState("");

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setYourCoordinates({ latitude, longitude });

        },
        (error) => {
          // If location permission denied, set coordinates to Helsinki
          console.error('Error getting location:', error.message);
          setYourCoordinates({ latitude: 60.1695, longitude: 24.9354 });
        }
      );
    } else {
      // In case of some other error, also set coordinates to Helsinki
      console.error('Geolocation is not supported by your browser');
      setYourCoordinates({ latitude: 60.1695, longitude: 24.9354 });
    }
  }, []);

  // function LocationMarker() {
  //   const [position, setPosition] = useState(null)
  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng)
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //   })
  
  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    const handleLocateClick = () => {
      const map = document.querySelector('.leaflet-container').leafletElement;
      map.locate();
    };
  
    return position === null ? null : (
      <>
      <Marker position={position} icon={pointIcon}>
        <Popup>You are here</Popup>
      </Marker>
      </>
    )
  }

  const pinIcon = new Icon({
    iconUrl: "pin.png",
    iconSize: [40,40]
  });
  const pointIcon = new Icon({
    iconUrl: "map_point.png",
    iconSize: [40,40]
  });

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        const latitude = e.latlng.lat;
        const longitude = e.latlng.lng;
        setClickedCoordinates({ latitude, longitude });

        // Center and zoom in on the clicked area with animation
        map.setView([latitude, longitude]);
      },
    });

    return null; // or false if you prefer
  };

  
    return (
      <>
      <div>
        <div>
          {yourCoordinates ? (
            <p>Your coordinates: {yourCoordinates.latitude}, {yourCoordinates.longitude}</p>
          ) : (
            <p>Loading coordinates...</p>
          )}
        </div>
        <div>
        {clickedCoordinates ? (
          <p>Placed a pin on: {clickedCoordinates.latitude}, {clickedCoordinates.longitude}</p>
        ) : (
          <p>Place a pin with a click:</p>
        )}
        </div>
        <div>
          {yourCoordinates && (
            <MapContainer 
              center={[yourCoordinates.latitude, yourCoordinates.longitude]} 
              zoom={5} 
              style={{ height: '600px', width: '600px' }} 
              scrollWheelZoom={true}>

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[yourCoordinates.latitude, yourCoordinates.longitude]} icon={pointIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>

              <MapEvents></MapEvents>
              <LocationMarker />
            </MapContainer>
          )}
        </div>
        
      </div>
      </>
    );
  };
  
  export default Map;