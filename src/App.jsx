import { useState } from "react";
import LocationListPage from "./components/LocationListPage";
import Pokemon from "./components/Pokemon";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [usersPokemonsURL, setUsersPokemonsURL] = useState([
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl",
  ]);

  const handleBackButtonClick = () => {
    setLocation(null);
  };

  return (
    <>
      {location ? (
        <Pokemon
          location={location}
          setLocation={setLocation}
          onBackButtonClick={handleBackButtonClick}
          usersPokemonsURL={usersPokemonsURL}
          setUsersPokemonsURL={setUsersPokemonsURL}
        />
      ) : (
        <LocationListPage setLocation={setLocation} />
      )}
    </>
  );
}

export default App;
