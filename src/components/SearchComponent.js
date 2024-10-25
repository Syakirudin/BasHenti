// src/components/SearchComponent.js
import React, { useEffect, useState } from "react";
import useFareData from "../hooks/useFareData";
import "./styles/SearchComponent.css"; // Ensure you have this CSS file

const SearchComponent = ({ onRouteSelect }) => {
  const [routes, setRoutes] = useState([]);
  const {
    data: fareData,
    error,
    loading,
  } = useFareData("https://stagebusapi.onrender.com/api/fares");
  // const [searchTerm, setSearchTerm] = useState("");


  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  // Fetch routes from the API when the component mounts
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(
          "https://stagebusapi.onrender.com/api/routes"
        );
        const data = await response.json();
        setRoutes(data); // Store the fetched routes in state
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  // Function to handle input changes
  const handleCurrentLocationChange = (e) => {
    setCurrentLocation(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Function to swap values between "Lokasi anda" and "Destinasi anda"
  const handleReverseSearch = () => {
    setCurrentLocation(destination);
    setDestination(currentLocation);
  };

  // Function to handle search input change
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value.toLowerCase());
  // };

  // Filter routes based on search term
  // const filteredRoutes = routes.filter((route) =>
  //   route.route_no.toLowerCase().includes(searchTerm)
  // );


  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Here, you can fetch or display the location, or set it as `searchTerm`
          // setSearchTerm(`Lat: ${latitude}, Long: ${longitude}`);
          setCurrentLocation(`Lat: ${latitude}, Long: ${longitude}`);

          // Optional: You can use the coordinates to make an API call or set the user's location.
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
    <div className="search-container">
      <h2 className="search-title">Pilih lokasi </h2>

      <div className="button-container">
        {routes.map((route) => (
          <button
            key={route.route_no}
            className="route-button"
            onClick={() => {
              // console.log("Button clicked for route:", route.route_no);
              onRouteSelect(route.route_no);
            }}
          >
            Bas No {route.route_no}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Lokasi anda..."
            value={currentLocation}
            onChange={handleCurrentLocationChange}
          />
          <i
            className="fa-solid fa-location-crosshairs search-icon"
            onClick={handleGetCurrentLocation}
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

      <div className="schedule-container"></div>

      <div className="fare-container">
        <h2 className="fare-title">Tambang</h2>
        <p className="fare-text">Anggaran tambang</p>

        {loading && <p>Loading fare data...</p>}
        {error && <p>Error fetching fare data: {error}</p>}

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
