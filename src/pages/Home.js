// src/components/Home.js
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css"; // Ensure you import Leaflet's CSS
import "./styles/Home.css"; // Import your custom CSS
import BottomNav from "../components/BottomNav";
import WatermarkComponent from "../components/WatermarkComponent";
// import SearchComponent from "../components/SearchComponent"; 

const Home = () => {
  const mapRef = useRef(null); // Reference to store the map instance
  const routingControlRef = useRef(null); // Reference to store the routing control
  const [waypoints, setWaypoints] = useState([]); // State to store waypoints
  const markerRef = useRef(null);// Reference to store the user location marker

  // Initialize the map
  useEffect(() => {
    mapRef.current = L.map("map").setView([6.087338801121559, 102.23861651370802], 13); // Set initial view

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Cleanup on component unmount
    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.remove();
        routingControlRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current); // Remove marker if it exists
      }
    };
  }, []); // Run only once on mount

  const fetchRouteData = async (routeNo) => {
    console.log("Selected Route:", routeNo); // Debugging line
    try {
        const response = await fetch("https://stagebusapi.onrender.com/api/routes");
        const data = await response.json();
        const selectedRoute = data.find((route) => route.route_no === routeNo);
        if (selectedRoute) {
            const stops = selectedRoute.stops.map((stop) =>
                L.latLng(stop.latitude, stop.longitude)
            );
            console.log("Stops:", stops); // Debugging line
            setWaypoints(stops);
        }
    } catch (error) {
        console.error("Failed to fetch route data:", error);
    }
};

  // Create routing when waypoints change
  useEffect(() => {
    console.log("Waypoints:", waypoints); // Debugging line
    if (waypoints.length > 0) {
        routingControlRef.current = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: true,
            createMarker: () => null,
            lineOptions: {
                styles: [{ color: 'blue', opacity: 0.7, weight: 5 }],
            }
        }).addTo(mapRef.current);

        routingControlRef.current.on('routesfound', () => {
            const routingControlContainer = routingControlRef.current.getContainer();
            const summaryContainer = routingControlContainer.querySelector('.leaflet-routing-summary');
            if (summaryContainer) {
                summaryContainer.style.display = 'none';
            }
        });
    }

    // Cleanup on component unmount
    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.remove();
        routingControlRef.current = null;
      }
    };
  }, [waypoints]); // Re-run effect when waypoints change

  // Function to get current location and place a marker
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Place marker at current location
          const userLocation = L.latLng(latitude, longitude);
          if (markerRef.current) {
            // If marker already exists, update its position
            markerRef.current.setLatLng(userLocation);
          } else {
            // Create a new marker
            markerRef.current = L.marker(userLocation).addTo(mapRef.current);
          }
          mapRef.current.setView(userLocation, 13); // Move the map view to the user's location
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

  return (
    <div className="container">
      <div id="map" className="map"></div>
      <BottomNav onRouteSelect={fetchRouteData}  onCurrentLocationSelect={handleGetCurrentLocation} /> {/* Pass the fetchRouteData function to BottomNav */}
      <WatermarkComponent />
    </div>
  );
};

export default Home;
