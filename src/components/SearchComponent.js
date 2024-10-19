// src/components/SearchComponent.js
import React from "react";
import useFetchData from "../hooks/useFetchData";
import "./styles/SearchComponent.css"; // Ensure you have this CSS file

const SearchComponent = ({ onRouteSelect }) => {

  const url = process.env.REACT_APP_PATH_URL;

  // Use the custom hook to fetch route data
  const { data: routes, error, loading } = useFetchData(url + "/routes");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="search-container">
      <h2 className="search-title">Select a Route</h2>
      <div className="button-container">
        {routes.map((route) => (
          <button
            key={route.route_no}
            className="route-button"
            onClick={() => onRouteSelect(route.route_no)}
          >
            Bas No {route.route_no}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
