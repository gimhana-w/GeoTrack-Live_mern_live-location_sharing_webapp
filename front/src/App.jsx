import React from 'react';
import './App.css';
import LocationDisplay from '../component/LocationDisplay';
import LocationMap from '../component/LocationMap';

function App() {
  return (
    <div className="App">
      <h1>Location Tracker</h1>
      <LocationDisplay />
      <LocationMap />
    </div>
  );
}

export default App;
