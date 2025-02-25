import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from './config'; // Import the BASE_URL

const NewItineraryPage = () => {
  const navigate = useNavigate();
  
  // State to hold input values
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSaveItinerary = async () => {
    const itineraryData = {
      destination,
      startDate,
      endDate,
    };

    try {
      const response = await fetch(`${BASE_URL}/itineraries`, {
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
      navigate("/homepage"); // Navigate back to the homepage after creation
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };

  return (
    <div>
      <h1>Create New Itinerary</h1>
      <div>
        <label>Destination</label>
        <input 
          type="text" 
          placeholder="Where to?" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
        />
        <label>Start Date</label>
        <input 
          type="text" 
          placeholder="Start date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
        <label>End Date</label>
        <input 
          type="text" 
          placeholder="End date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
        <button onClick={handleSaveItinerary}>Save Itinerary</button>
        <button onClick={() => navigate("/homepage")}>Back to Homepage</button>
        <br/>
        <label> Ensure the dates are in MM-DD-YYYY format.</label>
      </div>
    </div>
  );
};

export default NewItineraryPage; 