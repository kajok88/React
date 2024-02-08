import WeatherInfo from "./WeatherInfo";

const CountryForm = ({ country }) => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>{country.name.common}</h1>
        <img
          src={country.coatOfArms.png}
          alt={`${country.name.common} coat of arms`}
          style={{ maxWidth: "100px", maxHeight: "100px", marginLeft: "10px" }}
        />
      </div>
      <h3>Capital: {country.capital}</h3>
      <div>Area: {country.area} km²</div>
      <h3>Languages:</h3>
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
      {/* <WeatherInfo city={country.capital} lat="61" lng="24" /> */}
    </div>
  );
};

export default CountryForm;