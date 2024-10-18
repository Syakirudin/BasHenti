// src/components/NewsComponent.js
import React from "react";
import "./styles/NewsComponent.css";
import useFetchData from "../hooks/useFetchData.js";

const NewsComponent = () => {
  const { data, error, loading } = useFetchData("https://stagebusapi.onrender.com/api/stops");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(data);

  return (
    <div className="news-container">
      <h2 className="news-title">News Articles</h2>
      <p>
        Here, you can display the latest news articles, such as headlines, press releases, and other relevant details.
      </p>

      <ul>
        {data.map((bus) => (
          <li key={bus.created_at}> {/* Using created_at as a unique key */}
            <h3>Location Name: {bus.location_name}</h3>
            <p>City Name: {bus.city_name}</p>
            <p>
              Coordinates: 
              Latitude: {bus.coordinates.latitude}, 
              Longitude: {bus.coordinates.longitude}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;
