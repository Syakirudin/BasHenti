// src/components/Home.js
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css"; // Ensure you import Leaflet's CSS
import "./styles/Home.css"; // Import your custom CSS
import BottomNav from "../components/BottomNav";
import WatermarkComponent from "../components/WatermarkComponent";

const Home = () => {
  const mapRef = useRef(null); // Reference to store the map instance
  const routingControlRef = useRef(null); // Reference to store the routing control
  const [waypoints, setWaypoints] = useState([]); // State to store waypoints

  useEffect(() => {
    // Fetch route data from the API
    const fetchRoutes = async () => {
      try {
        const response = await fetch("https://stagebusapi.onrender.com/api/routes");
        const data = await response.json();

        // Assuming you're interested in a specific route, e.g., route_no "3"
        const selectedRoute = data.find((route) => route.route_no === "3");

        if (selectedRoute) {
          const stops = selectedRoute.stops.map((stop) =>
            L.latLng(stop.latitude, stop.longitude)
          );
          setWaypoints(stops); // Set waypoints from the fetched stops
        }
      } catch (error) {
        console.error("Failed to fetch route data:", error);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map("map").setView([6.087338801121559, 102.23861651370802], 13); // Set initial view

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Create the routing control only when waypoints are available
    if (waypoints.length > 0) {
      routingControlRef.current = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        createMarker: () => null, // Suppress default markers
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 5 }] // Make the line bolder
        }
      }).addTo(mapRef.current);

      // Add custom markers for start and end points
      L.marker(waypoints[0], {
        icon: L.icon({
          iconUrl: 'path/to/start-icon.svg',
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      }).addTo(mapRef.current);

      L.marker(waypoints[waypoints.length - 1], {
        icon: L.icon({
          iconUrl: 'path/to/end-icon.svg',
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      }).addTo(mapRef.current);

      // Hide the routing summary after it has been created
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
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [waypoints]); // Re-run effect when waypoints change

  return (
    <div className="container">
      <div id="map" className="map"></div>
      <BottomNav />
      <WatermarkComponent />
    </div>
  );
};

export default Home;
