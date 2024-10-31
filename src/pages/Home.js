// src/components/Home.js
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "./styles/Home.css";
import BottomNav from "../components/BottomNav";
import WatermarkComponent from "../components/WatermarkComponent";
import useUserLocation from "../hooks/useUserLocation";

// Define userLocationIcon outside to avoid redefinition
const userLocationIcon = L.icon({
  iconUrl: '../asset/pin.png',
  iconSize: [320, 320],
  iconAnchor: [160, 320],
});

const Home = () => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const markerRef = useRef(null);
  const [waypoints, setWaypoints] = useState([]);
  const userLocation = useUserLocation();

  useEffect(() => {
    mapRef.current = L.map("map").setView([6.0873, 102.2386], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      routingControlRef.current?.remove();
      mapRef.current = null;
      routingControlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude && mapRef.current) {
      const userLatLng = L.latLng(userLocation.latitude, userLocation.longitude);

      if (markerRef.current) {
        markerRef.current.setLatLng(userLatLng);
      } else {
        markerRef.current = L.marker(userLatLng, { icon: userLocationIcon }).addTo(mapRef.current);
      }
      mapRef.current.setView(userLatLng, 13);
    }
  }, [userLocation]); // No need to include `userLocationIcon`

  const fetchRouteData = async (routeNo) => {
    try {
      const response = await fetch("https://stagebusapi.onrender.com/api/routes");
      const data = await response.json();
      const selectedRoute = data.find((route) => route.route_no === routeNo);
      
      if (selectedRoute) {
        const stops = selectedRoute.stops.map((stop) => L.latLng(stop.latitude, stop.longitude));
        setWaypoints(stops);
      }
    } catch (error) {
      console.error("Failed to fetch route data:", error);
    }
  };

  useEffect(() => {
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
        if (summaryContainer) summaryContainer.style.display = 'none';
      });
    }

    return () => {
      routingControlRef.current?.remove();
      routingControlRef.current = null;
    };
  }, [waypoints]);

  return (
    <div className="container">
      <div id="map" className="map"></div>
      <BottomNav onRouteSelect={fetchRouteData} onCurrentLocationSelect={() => setWaypoints([])} />
      <WatermarkComponent />
    </div>
  );
};

export default Home;
