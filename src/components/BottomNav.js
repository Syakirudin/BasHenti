import React, { useState } from "react";
import "./styles/BottomNav.css"; // Use the updated path

// Import your components
import RoutesComponent from "./RoutesComponent"; // Update with your actual path
import NewsComponent from "./NewsComponent"; // Update with your actual path
import SearchComponent from "./SearchComponent"; // Update with your actual path

const BottomNav =  ({ onRouteSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null); // To track which component to show
  

    
  const loadComponent = (component) => {
    // Check if the same component is clicked again
    if (activeComponent === component) {
      // Collapse the nav
      setIsExpanded(false);
      setActiveComponent(null); // Clear the active component
    } else {
      setActiveComponent(component);
      setIsExpanded(true); // Expand the nav when loading a new component
    }
  };

  // Function to close the nav
  const closeNav = () => {
    setIsExpanded(false);
    setActiveComponent(null);
  };

  return (
    <div>
      

      {/* Bottom navigation */}


      <div className={`bottom-nav ${isExpanded ? "expanded" : ""}`}>       


        {/* Show the active component below the nav content */}
        
        {activeComponent === "search" && <SearchComponent onRouteSelect={onRouteSelect} />} {/* Pass the function */}
        {activeComponent === "routes" && <RoutesComponent />}
        {activeComponent === "news" && <NewsComponent />}

        {/* Render the selected component */}
        <div className="nav-content">
          <button className="nav-button" onClick={() => loadComponent("search")}>
          <i class="fa-solid fa-bus"></i> Carian
          </button>

          <button className="nav-button" onClick={() => loadComponent("routes")}>
            <i className="fas fa-route"></i> Perjalanan
          </button>

          <button className="nav-button" onClick={() => loadComponent("news")}>
            <i className="fas fa-mountain-city"></i> Tempat Menarik
          </button>
        </div>

      </div>
    </div>
  );
};

export default BottomNav;
