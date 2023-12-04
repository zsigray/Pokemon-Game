/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function LocationListPage({ setLocation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let raceConditionHandler = true;
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/location`);
      const pokeLocations = await response.json();
      if (raceConditionHandler) {
        setLocations(pokeLocations.results);
      }
    };
    fetchData();

    return () => {
      raceConditionHandler = false;
    };
  }, []);

  const locationList = locations.map((location) => {
    return (
      <div key={location.name} className="location-holder">
        <button className="btn-location" onClick={() => setLocation(location)}>
          {location.name}
        </button>
      </div>
    );
  });

  return (
    <div>
      <h1>Locations</h1>
      {locationList}
    </div>
  );
}
