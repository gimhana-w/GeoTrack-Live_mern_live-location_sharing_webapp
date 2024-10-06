import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [fixedLocation, setFixedLocation] = useState(null);

  useEffect(() => {
    // Get current location
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

  useEffect(() => {
    // Fetch fixed location from the backend
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

  return (
    <div>
      <h2>Map</h2>
      {currentLocation && (
        <MapContainer
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          {/* TileLayer: background map tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Current Location Marker */}
          {currentLocation && (
            <Marker position={[currentLocation.lat, currentLocation.lng]}>
              <Popup>Your Current Location</Popup>
            </Marker>
          )}

          {/* Fixed Location Marker */}
          {fixedLocation && (
            <Marker position={[fixedLocation.lat, fixedLocation.lng]}>
              <Popup>Fixed Location</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default LocationMap;
