import { useState } from 'react';
import LocationListPage from './components/LocationListPage';
import Pokemon from './components/Pokemon';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);

  const handleBackButtonClick = () => {
    setLocation(null);
  };

  return (
    <>
      {location ? (
        <Pokemon location={location} setLocation={setLocation} onBackButtonClick={handleBackButtonClick} />
      ) : (
        <LocationListPage setLocation={setLocation} />
      )}
    </>
  );
}

export default App;
