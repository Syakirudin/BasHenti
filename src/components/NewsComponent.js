// src/components/NewsComponent.js
import React from "react";
import "./styles/NewsComponent.css";

const NewsComponent = () => {
  const newsData = [
    {
      id: 1,
      // imageUri: "http://placehold.it/360x150",
      text: "Pantai Irama",
      description: "Pantai Irama adalah sebuah pantai yang terletak di Bachok",
    },
    {
      id: 2,
      // imageUri: "http://placehold.it/360x150",
      text: "Pantai Sabak",
      description: "Pantai Sabak adalah pantai terkenal di Kota Bharu",
    },
    {
      id: 3,
      // imageUri: "http://placehold.it/360x150",
      text: "Istana Dodol",
      description: "Istana Dodol terkenal dengan keunikan manisan tradisional",
    },
  ];

  return (
    <div className="news-container">
      <h2 className="news-title">Tempat Menarik</h2>
      <p>Lihat tempat menarik yang ada di sekitar</p>

      <div className="card-container">
        {newsData.map((item) => (
          <div key={item.id} className="card" style={{ backgroundImage: `url(${item.imageUri})` }}>
            <div className="card-overlay">
              <h3 className="card-title">{item.text}</h3>
              <p className="card-text">{item.description}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
