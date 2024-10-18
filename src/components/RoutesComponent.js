// src/components/RoutesComponent.js
import React, { useState } from "react";
import "./styles/RoutesComponent.css"; 

const RoutesComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const startLocation = "Kota Bharu";
  const waypoints = ["Checkpoint 1", "Checkpoint 2", "Checkpoint 3", "Checkpoint 4", "Checkpoint 5", "Checkpoint 6"];
  const endLocation = "Jerteh";
  const routes = ["1"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="routes-container">
      <h2 className="routes-title">Perjalanan</h2>
      <p>
        Berikut adalah daftar perjalanan yang tersedia.
      </p>

      {/* Dropdown for additional route information */}
      <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
          <p className="route-text">Route:{routes} {startLocation} to {endLocation}</p>
          <span className="dropdown-arrow">{isDropdownOpen ? " ▲" : " ▼"}</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <p>Route:{routes}</p>
            <p>Distance: 15 km</p>
            <p>Duration: 30 minutes</p>
            <p>Traffic: Moderate</p>
            
            {/* Timeline for route details */}
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <p className="timeline-text">{startLocation}</p>
              </div>

              {waypoints.map((point, index) => (
                <div key={index} className="timeline-item">
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
    </div>
  );
};

export default RoutesComponent;
