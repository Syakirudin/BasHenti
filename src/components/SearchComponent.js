import React from "react";
import "./styles/SearchComponent.css"; // Ensure you have this CSS file

const SearchComponent = () => {
  return (
    <div className="search-container">
      <form className="search-form">
        <input
          type="text"
          placeholder="Kedudukan Anda..."
          className="search-input current-location"
        />

        <input
          type="text"
          placeholder="Destinati Anda..."
          className="search-input destination-location"
        />
      </form>
    </div>
  );
};

export default SearchComponent;
