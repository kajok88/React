import { Button, Card } from "react-bootstrap";
import "./Countries.css"

const Countries = ({ countriesToShow, setCountriesToShow, setSelectedCountry, setQuery }) => {

    // if (countriesToShow.length === 1)   {
    //   return null;
    // }

    return (
      <>
        <div>
          {countriesToShow.length > 20 ? (
            null
          ) : (
              <div className="d-flex flex-column">
                {countriesToShow.map((country) => (
                  <Card key={country.name.official} style={{ borderRadius: '0' }} className="search-result">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <span>{country.name.common}</span>
                      <Button variant="success" 
                        onClick={() => {setCountriesToShow([country]), setSelectedCountry([country]), setQuery("")}}>
                          Show
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
          )}
        </div>
      </>
    );
  };
  
  export default Countries;