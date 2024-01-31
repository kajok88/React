import CountryForm from "./CountryForm";

const Countries = ({ countriesToShow, setCountriesToShow }) => {

    // if (countriesToShow.length === 1)   {
    //   return null;
    // }

    return countriesToShow.map((country) => (
      <div key={country.name.official}>
        {country.name.common}{" "}
        <button onClick={() => 
          setCountriesToShow([country])
          // <CountryForm country={country}/>
        }>
          
            Show
        </button>
        {/* <div>
            {countriesToShow.length === 1 ? (
              <CountryForm country={countriesToShow[0]} />
            ) : null}
          </div> */}
      </div>
    ));
  };
  
  export default Countries;