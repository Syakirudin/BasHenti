import React, { useState } from "react"; // Import useState
import './styles/SelectStateComponent.css'; // Import the CSS file for styling

const stateOptions = [
    { code: 'KEL', name: 'Kelantan', flagUrl: '/path/to/kelantan-flag.png' },
    { code: 'TRG', name: 'Terengganu', flagUrl: '/path/to/terengganu-flag.png' },
    { code: 'KDH', name: 'Kedah', flagUrl: '/path/to/kedah-flag.png' },
];

const SelectStateComponent = ({ onRouteSelect }) => {
    const [selectedState, setSelectedState] = useState("KEL");

    const handleStateChange = (event) => {
        const newState = event.target.value;
        setSelectedState(newState);
        onRouteSelect(newState); // Call the prop function to fetch route data based on selected state
    };

    return (
        <div className="state-container">
            <div>
                <select id="state-select" value={selectedState} onChange={handleStateChange}>
                    
                    {stateOptions.map((state) => (
                        <option key={state.code} value={state.code}>
                            {state.name} {/* Display the state name */}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectStateComponent;
