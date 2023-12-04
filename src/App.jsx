import { useState } from 'react'
import LocationListPage from './components/LocationListPage';
import './App.css'

function App() {
  const [location, setLocation] = useState(null);

  return (
    <>
      {location ? 
      <h1>{location.name}</h1> :
      <>
      <h2>Test</h2>
      <LocationListPage setLocation={setLocation} /> 
      </>
      }

    </>
  )
}

export default App
