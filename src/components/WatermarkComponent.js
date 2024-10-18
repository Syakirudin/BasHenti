import React from "react";
import "./styles/Watermark.css"; // Ensure to create this CSS file for styles

const WatermarkComponent = () => {
    return (
        <div className="watermark">
            <p className="watermark-text">
                Project by <a href="https://www.linkedin.com/in/msyakirudin" target="_blank" rel="noopener noreferrer">Syakir</a> 👨🏻‍💻
            </p>
        </div>
    );
};

export default WatermarkComponent;
