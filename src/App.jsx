import { useState } from 'react'
import LocationListPage from './components/LocationListPage';
import Pokemon from './components/Pokemon';
import './App.css'

function App() {
  const [location, setLocation] = useState(null);

  return (
    <>
      {location ? 
      <Pokemon location={location} /> :
      <>
      <LocationListPage setLocation={setLocation} /> 
      </>
      }

    </>
  )
}

export default App
