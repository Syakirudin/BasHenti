// src/components/SearchComponent.js
import React, { useState } from "react";
import useFareData from "../hooks/useFareData";
import useRoutes from "../hooks/useRoutes";
import useCurrentLocation from "../hooks/useCurrentLocation";
import "./styles/SearchComponent.css";

const SearchComponent = ({ onRouteSelect }) => {
  const { routes } = useRoutes("https://stagebusapi.onrender.com/api/routes");
  const { currentLocation, setCurrentLocation, getCurrentLocation } =
    useCurrentLocation();
  const {
    data: fareData,
    error: fareError,
    loading,
  } = useFareData("https://stagebusapi.onrender.com/api/fares");
  const [destination, setDestination] = useState("");

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleReverseSearch = () => {
    setCurrentLocation(destination);
    setDestination(currentLocation);
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Pilih lokasi </h2>

      <div className="search-input-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Lokasi anda..."
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
          />
          <i
            className="fa-solid fa-location-crosshairs search-icon"
            onClick={getCurrentLocation}
          ></i>
        </div>

        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Destinasi anda..."
            value={destination}
            onChange={handleDestinationChange}
          />
          <i
            className="fa-solid fa-arrows-up-down fa-xl search-reverse"
            onClick={handleReverseSearch}
          ></i>
        </div>
      </div>

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

      <div className="fare-container">
        <h2 className="fare-title">Tambang</h2>
        <p className="fare-text">Anggaran tambang</p>
        {loading && <p>Loading fare data...</p>}
        {fareError && <p>Error fetching fare data: {fareError}</p>}
        {fareData &&
          fareData
            .filter((fare) => fare.route_no === 4)
            .map((fare) => (
              <p
                key={`${fare.from_location_name}-${fare.to_location_name}`}
                className="fare-text"
              >
                {fare.from_location_name} - {fare.to_location_name}: RM{" "}
                {fare.amount_of_fare}
              </p>
            ))}
      </div>
    </div>
  );
};

export default SearchComponent;
