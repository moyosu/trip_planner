import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from './config';

const Itinerary = () => {
  const navigate = useNavigate();
  
  // State to hold input values
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleNavigate = () => {
    navigate("/homepage");
  };

  const handleSaveItinerary = async () => {
    const itineraryData = {
      destination,
      startDate,
      endDate,
    };

    try {
      const response = await fetch(`${BASE_URL}/itineraries`, { // Use the constant here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itineraryData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Itinerary created:', result);
      // Optionally navigate back to the homepage or show a success message
      navigate("/homepage");
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };

  return (
    <div>
      <h1>Plan your trip</h1>
      <div>
        <label>Destination</label>
        <input 
          type="text" 
          placeholder="Where to?" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
        />
        <label>Dates</label>
        <input 
          type="text" 
          placeholder="Start date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="End date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
        <button onClick={handleSaveItinerary}>SAVE ITINERARY</button>
        <button onClick={handleNavigate}>SEE ITINERARIES</button>
      </div>
    </div>
  );
};

export default Itinerary;