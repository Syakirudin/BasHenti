// src/hooks/useCurrentLocation.js
import { useState } from "react";

const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`Lat: ${latitude}, Long: ${longitude}`);
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return { currentLocation, setCurrentLocation, getCurrentLocation };
};

export default useCurrentLocation;
