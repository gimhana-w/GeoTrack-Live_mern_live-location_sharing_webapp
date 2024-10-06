import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationDisplay = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [fixedLocation, setFixedLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fixedLat, setFixedLat] = useState('');
  const [fixedLng, setFixedLng] = useState('');

  // Get current geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    }
  }, []);

  // Fetch the fixed location from the backend
  useEffect(() => {
    const fetchFixedLocation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/location');
        setFixedLocation(response.data);
      } catch (err) {
        console.error('Error fetching fixed location', err);
      }
    };

    fetchFixedLocation();
  }, []);

  // Calculate distance between current and fixed locations
  useEffect(() => {
    if (currentLocation && fixedLocation) {
      const calculateDistance = (loc1, loc2) => {
        const toRadians = (degrees) => (degrees * Math.PI) / 180;

        const R = 6371; // Earth radius in km
        const dLat = toRadians(loc2.lat - loc1.lat);
        const dLng = toRadians(loc2.lng - loc1.lng);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(loc1.lat)) *
            Math.cos(toRadians(loc2.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in km
      };

      const dist = calculateDistance(currentLocation, fixedLocation);
      setDistance(dist.toFixed(2)); // Set distance to 2 decimal places
    }
  }, [currentLocation, fixedLocation]);

  // Submit fixed location to the backend
  const handleFixedLocationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/location', {
        lat: fixedLat,
        lng: fixedLng,
      });
      setFixedLocation(response.data); // Update fixed location after saving
      setFixedLat(''); // Clear inputs after submission
      setFixedLng('');
    } catch (err) {
      console.error('Error saving fixed location', err);
    }
  };

  return (
    <div>
      <h2>Current Location:</h2>
      {currentLocation ? (
        <p>
          Latitude: {currentLocation.lat}, Longitude: {currentLocation.lng}
        </p>
      ) : (
        <p>Loading current location...</p>
      )}

      <h2>Fixed Location:</h2>
      {fixedLocation ? (
        <p>
          Latitude: {fixedLocation.lat}, Longitude: {fixedLocation.lng}
        </p>
      ) : (
        <p>No fixed location saved yet.</p>
      )}

      <h2>Distance to Fixed Location:</h2>
      {distance ? <p>{distance} km</p> : <p>Calculating distance...</p>}

      {/* Form to enter new fixed location */}
      <h2>Enter Fixed Location</h2>
      <form onSubmit={handleFixedLocationSubmit}>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="any"
            value={fixedLat}
            onChange={(e) => setFixedLat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="any"
            value={fixedLng}
            onChange={(e) => setFixedLng(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Fixed Location</button>
      </form>
    </div>
  );
};

export default LocationDisplay;
