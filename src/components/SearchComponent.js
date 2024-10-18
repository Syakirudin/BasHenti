// src/components/SearchComponent.js
import React, { useEffect, useState } from "react";
import "./styles/SearchComponent.css"; // Ensure you have this CSS file

const SearchComponent = ({ onRouteSelect }) => {
  const [routes, setRoutes] = useState([]); // State to hold the routes

  // Fetch routes from the API when the component mounts
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("https://stagebusapi.onrender.com/api/routes");
        const data = await response.json();
        setRoutes(data); // Store the fetched routes in state
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="search-container">
      <h2 className="search-title">Select a Route</h2>
      <div className="button-container">
        {routes.map((route) => (
          <button
            key={route.route_no}
            className="route-button"
            onClick={() => onRouteSelect(route.route_no)} // Call the parent function with the route_no
          >
            Bas No {route.route_no}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
