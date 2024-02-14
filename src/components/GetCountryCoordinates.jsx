import Map from "./Map";

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
