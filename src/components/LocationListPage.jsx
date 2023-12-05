/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function LocationListPage({ setLocation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let raceConditionHandler = true;
    const fetchData = async () => {
      const detailedLocations = [];
      for (let i = 1; i <= 20; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/location/${i}`);
        const pokeLocation = await response.json();
        detailedLocations.push(pokeLocation);
      }
      if (raceConditionHandler) {
        setLocations(detailedLocations);
      }
    };
    fetchData();

    return () => {
      raceConditionHandler = false;
    };
  }, []);

  const locationList = locations.map((location) => {
    const englishNameObj = location.names.find(
      (name) => name.language.name === "en"
    );
    return (
      <div key={location.name} className="location-holder">
        <button className="btn-location" onClick={() => setLocation(location)}>
          {englishNameObj.name}
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
