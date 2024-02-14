import CloseButton from 'react-bootstrap/CloseButton';
import "../App.css"

const CountryForm = ({ country, handleClose }) => {

  // RETURNS THE BLUE BORDERED COUNTRY DATA FOR THE SEARCHED COUNTRY
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CloseButton
          onClick={handleClose}
          className='hide-container-button'
        />
        <h1 style={{ marginRight: "auto" }}>{country.name.common}</h1>
        {Object.keys(country.coatOfArms).length !== 0 ? (  // if the coat of arms is present in the response of the specific country
          <img
            src={country.coatOfArms.png}
            alt={`${country.name.common} coat of arms`}
            style={{ maxWidth: "100px", maxHeight: "100px", marginLeft: "10px" }}
          />
        ) : (
          null
        )}
        
      </div>
      <h3>Capital: {country.capital}</h3>
      <h4>Area: {country.area} km²</h4>
      <h4>Languages:</h4>
      <ul>
        {country.languages ? (  
          Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))
        ) : (
          <p>No known languages</p>
        )}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </div>
  );
};

export default CountryForm;