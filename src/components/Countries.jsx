
import "./Countries.css"

const Countries = ({ countriesToShow, setCountriesToShow }) => {

    // if (countriesToShow.length === 1)   {
    //   return null;
    // }

    return (
      <>
        <div>
          {countriesToShow.length > 100 ? (
            null
          ) : (
            countriesToShow.map((country) => (
              <div key={country.name.official} className="search-result">
                {country.name.common}{" "}
                <button onClick={() => setCountriesToShow([country])}>
                  Show
                </button>
              </div>
            ))
          )}
        </div>
      </>
    );
  };
  
  export default Countries;