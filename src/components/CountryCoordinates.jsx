import Map from "./Map";

const CountryCoordinates = ({ country }) => {
  if (country) {
    const lat = country.latlng[0];
    const lng = country.latlng[1];
    const countryCoordinates = {lat, lng};
    return (
      <>
      <Map coordinates={countryCoordinates}/>
      <p>Country Coordinates: {countryCoordinates.lat},{countryCoordinates.lng}</p>
      </>
    );
  } else {
    return (
      <Map defaultMode={true}/>
    );
  }
};
export default CountryCoordinates;
