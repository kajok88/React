import Map from "./Map";

const GetCountryCoordinates = ({ country, }) => {
  try {
    if (country) {
      const lat = country.latlng[0];
      const lng = country.latlng[1];
      const countryCoordinates = { lat, lng };
  
      const capLat = country.capitalInfo.latlng[0];
      const capLng = country.capitalInfo.latlng[1];
      const capitalCoordinates = { capLat, capLng };
  
      return (
        <>
          <Map 
            countryCoordinates={countryCoordinates} 
            capitalCoordinates={capitalCoordinates}
          />
          {/* <p>Country Coordinates: {countryCoordinates.lat},{countryCoordinates.lng}</p>
          <p>Capital's Coordinates: {capitalCoordinates.capLat},{capitalCoordinates.capLng}</p> */}
        </>
      );
    } else {
      // The view the map gets when starting the first time
      // <Map countryCoordinates={{lat:59.225, lng:18.105}} />
      return <Map noCoordinates={true} />;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return <Map noCoordinates={true} />;
  }
};







export default GetCountryCoordinates;
