// src/components/SearchComponent.js
import React from "react";
import useFetchData from "../hooks/useFetchData";
import "./styles/SearchComponent.css"; // Ensure you have this CSS file

const SearchComponent = ({ onRouteSelect }) => {

  const url = process.env.REACT_APP_PATH_URL;

  // Use the custom hook to fetch route data
  const { data: routes, error, loading } = useFetchData(url + "/api/routes");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <div className="search-container">
      <h2 className="search-title">Pilih lokasi </h2>
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

      <div className="schedule-container">
        <div><p>Trip 1</p></div>
        <div><p>Trip 2</p></div>
      </div>

      <div className="fare-container">
        <h2 className="fare-title">Tambang</h2>
        <p className="fare-text">Anggaran tambang</p>

      </div>
    </div>
  );
};

export default SearchComponent;
