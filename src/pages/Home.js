// src/components/Home.js
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css"; // Ensure you import Leaflet's CSS
import "./styles/Home.css"; // Import your custom CSS
import BottomNav from "../components/BottomNav";
import WatermarkComponent from "../components/WatermarkComponent";

const Home = () => {
  const mapRef = useRef(null); // Reference to store the map instance
  const routingControlRef = useRef(null); // Reference to store the routing control

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map("map").setView([6.087338801121559, 102.23861651370802], 13); // Set initial view

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Create a routing control with new waypoints
    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(6.087338801121559, 102.23861651370802),
        L.latLng(6.027592234414032, 102.24054975530004),
        L.latLng(5.99752042254254, 102.24519835144388),
        L.latLng(5.957138095961932, 102.24958459511512),
        L.latLng(5.91745327678971, 102.24499956732518),
        L.latLng(5.868838, 102.233908),
        L.latLng(5.826304, 102.225222),
        L.latLng(5.797816, 102.224278),
        L.latLng(5.826323663630313, 102.22526454284191),
        L.latLng(5.711756, 102.210670),
        L.latLng(5.691800, 102.211921),
        L.latLng(5.658736, 102.211076),
        L.latLng(5.632277, 102.205499),
        L.latLng(5.592698, 102.195788),
        L.latLng(5.564828242816309, 102.20113124176272)
      ],
      routeWhileDragging: true,
      createMarker: () => null, // Suppress default markers
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.7, weight: 5 }] // Make the line bolder
      }
    }).addTo(mapRef.current);

    // Add custom markers for start and end points
    const waypoints = routingControlRef.current.getWaypoints();
    L.marker(waypoints[0].latLng, { 
      icon: L.icon({ 
        iconUrl: 'path/to/start-icon.svg', 
        iconSize: [25, 41], 
        iconAnchor: [12, 41] 
      }) 
    }).addTo(mapRef.current);

    L.marker(waypoints[waypoints.length - 1].latLng, { 
      icon: L.icon({ 
        iconUrl: 'path/to/end-icon.svg', 
        iconSize: [25, 41], 
        iconAnchor: [12, 41] 
      }) 
    }).addTo(mapRef.current);

    // Hide the routing summary after it has been created
    routingControlRef.current.on('routesfound', () => {
      const routingControlContainer = routingControlRef.current.getContainer(); // Get the routing control's container
      const summaryContainer = routingControlContainer.querySelector('.leaflet-routing-summary'); // Find the summary container
      if (summaryContainer) {
        summaryContainer.style.display = 'none'; // Hide the summary
      }
    });

    // Cleanup on component unmount
    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.remove(); // Remove the routing control
        routingControlRef.current = null; // Clear the reference
      }
      if (mapRef.current) {
        mapRef.current.remove(); // Remove the map instance
        mapRef.current = null; // Clear the reference
      }
    };
  }, []);

  return (
    <div className="container">
      <div id="map" className="map" ></div>
      <BottomNav />
      <WatermarkComponent/> 
    </div>
    
  );
};

export default Home;
