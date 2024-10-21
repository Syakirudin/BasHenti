import React, { useState } from "react";
import useFetchData from "../hooks/useFetchData"; // Ensure this path is correct
import "./styles/RoutesComponent.css";

const RoutesComponent = () => {
  
    const url = process.env.REACT_APP_PATH_URL; // Ensure this is set in your environment variables
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const { data, error, loading } = useFetchData(url + "/routes");

    if (loading) {
        console.log("Loading data...");
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <p>Error: {error}</p>;
    }

    // Log data and type for debugging
    console.log("Fetched data:", data);
    console.log("Data type:", typeof data);
    console.log("Is data an array?", Array.isArray(data));

    // Check if data is an array
    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return <p>No routes found or invalid data format.</p>;
    }

    const toggleDropdown = (index) => {
        setIsDropdownOpen(isDropdownOpen === index ? null : index);
    };

    return (
        <div className="routes-container">
            <h2 className="routes-title">Perjalanan</h2>
            <p>Berikut adalah daftar perjalanan yang tersedia.</p>

            {data.map((route, index) => {
                const startLocation = route.stops[0].location_name;
                const endLocation = route.stops[route.stops.length - 1].location_name;
                const waypoints = route.stops.slice(1, -1).map(stop => stop.location_name); // Exclude start and end points

                return (
                    <div key={index} className="dropdown">
                        <div className="dropdown-toggle" onClick={() => toggleDropdown(index)}>
                            <p className="route-text">
                                Bas No {route.route_no}: {startLocation} to {endLocation}
                            </p>
                            <span className="dropdown-arrow">
                                {isDropdownOpen === index ? " ▲" : " ▼"}
                            </span>
                        </div>
                        {isDropdownOpen === index && (
                            <div className="dropdown-content">
                                <div className="route-info">
                                    <p>Bas No {route.route_no}</p>
                                    <button className="route-button"> Pergi ke peta </button>
                                </div>
                                {/* Timeline for route details */}
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <p className="timeline-text">{startLocation}</p>
                                    </div>

                                    {waypoints.map((point, idx) => (
                                        <div key={idx} className="timeline-item">
                                            <div className="timeline-dot"></div>
                                            <p className="timeline-text">{point}</p>
                                        </div>
                                    ))}

                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <p className="timeline-text">{endLocation}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RoutesComponent;
