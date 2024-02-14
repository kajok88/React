import Map from "./Map";

// FINDS THE GENERAL COORDINATES AND CAPITAL'S COORDINATES BASED ON THE NAME OF THE COUNTRY GIVEN.
// CALLS THE MAP COMPONENT, WHICH SETS THE MAP VIEW ON THE SEARCHED COUNTRY AND PLACES BLUE PIN ON ITS CAPITAL .

const GetCountryCoordinates = ({ country, }) => {
  try {
    if (country) {
      console.log('COUNTRY BY NAME:', country);
      const lat = country.latlng[0];
      const lng = country.latlng[1];
      const countryCoordinates = { lat, lng };
  
      // Checking if capitalInfo exists in the country object. Example: Antarctica doesn't have a capital.
      const capitalCoordinates = country.capitalInfo && country.capitalInfo.latlng
        ? {
            lat: country.capitalInfo.latlng[0],
            lng: country.capitalInfo.latlng[1] 
          }
        : null;
      
      return (
        <>
          <Map 
            countryCoordinates={countryCoordinates} 
            capitalCoordinates={capitalCoordinates}
          />
        </>
      );
    } else {
      // Triggers the default map view in the map component, that is set to specific coordinates.
      return <Map noCoordinates={true} />;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return <Map noCoordinates={true} />;
  }
};







export default GetCountryCoordinates;
