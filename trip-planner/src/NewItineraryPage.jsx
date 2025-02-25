import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from './config'; // Import the BASE_URL

const NewItineraryPage = () => {
  const navigate = useNavigate();
  
  // State to hold input values
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // State to manage input validation
  const [errors, setErrors] = useState({
    destination: false,
    startDate: false,
    endDate: false,
  });

  const isValidDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-\d{4}$/;
    return regex.test(date);
  };

  const handleSaveItinerary = async () => {
    let hasErrors = false;

    // Validate inputs
    const newErrors = {
      destination: !destination,
      startDate: !isValidDate(startDate),
      endDate: !isValidDate(endDate),
    };

    setErrors(newErrors);
    hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      alert("Please fill in all fields correctly.");
      return;
    }

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

  // Predefined destinations
  const predefinedDestinations = [
    "Seattle",
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
    "San Francisco",
  ];

  return (
    <div>
      <h1>Create New Itinerary</h1>
      <div>
        <ol>
          <li>Enter your destination in the "Destination" field.</li>
          <li>Provide the start date in the "Start Date" field (format: MM-DD-YYYY).</li>
          <li>Provide the end date in the "End Date" field (format: MM-DD-YYYY).</li>
          <li>Click the "Save Itinerary" button to save your itinerary.</li>
          <li>If you want to go back to the homepage, click the "Back to Homepage" button.</li>
        </ol>
        <label>Destination</label>
        <select 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
          style={{ borderColor: errors.destination ? 'red' : 'initial' }}
        >
          <option value="">Select a destination</option>
          {predefinedDestinations.map((dest) => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Or type your own destination" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
          style={{ borderColor: errors.destination ? 'red' : 'initial' }}
        />
        <label>Start Date</label>
        <input 
          type="text" 
          placeholder="Start date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          style={{ borderColor: errors.startDate ? 'red' : 'initial' }}
        />
        <label>End Date</label>
        <input 
          type="text" 
          placeholder="End date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          style={{ borderColor: errors.endDate ? 'red' : 'initial' }}
        />
        <button onClick={handleSaveItinerary}>Save Itinerary</button>
        <button onClick={() => navigate("/homepage")}>Back to Homepage</button>
      </div>
    </div>
  );
};

export default NewItineraryPage; 