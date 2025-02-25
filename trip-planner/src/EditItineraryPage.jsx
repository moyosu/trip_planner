import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from './config';

const EditItineraryPage = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const navigate = useNavigate();
  
  const [itinerary, setItinerary] = useState({
    destination: "",
    startDate: "",
    endDate: "",
  });

  // State to manage input validation
  const [errors, setErrors] = useState({
    destination: false,
    startDate: false,
    endDate: false,
  });

  useEffect(() => {
    const fetchItinerary = async () => {
      console.log(`Fetching itinerary with ID: ${id}`); // Log the ID being fetched
      try {
        const response = await fetch(`${BASE_URL}/itineraries/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItinerary(data); // Set the fetched itinerary data to state
      } catch (error) {
        console.error('Failed to fetch itinerary:', error);
      }
    };

    fetchItinerary();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItinerary((prev) => ({ ...prev, [name]: value })); // Update state on input change
  };

  const isValidDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-\d{4}$/;
    return regex.test(date);
  };

  const handleUpdateItinerary = async () => {
    if (!itinerary.destination || !isValidDate(itinerary.startDate) || !isValidDate(itinerary.endDate)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/itineraries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itinerary),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate("/homepage"); // Navigate back after updating
    } catch (error) {
      console.error('Error updating itinerary:', error);
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
      <h1>Edit Itinerary</h1>
      <div>
        <ol>
          <li>Update the destination in the "Destination" field.</li>
          <li>Change the start date in the "Start Date" field (format: MM-DD-YYYY).</li>
          <li>Change the end date in the "End Date" field (format: MM-DD-YYYY).</li>
          <li>Click the "Update Itinerary" button to save your changes.</li>
          <li>If you want to go back to the homepage, click the "Back to Homepage" button.</li>
        </ol>
        <label>Destination</label>
        <select 
          value={itinerary.destination} 
          onChange={(e) => setItinerary((prev) => ({ ...prev, destination: e.target.value }))} 
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
          value={itinerary.destination} 
          onChange={(e) => setItinerary((prev) => ({ ...prev, destination: e.target.value }))} 
          style={{ borderColor: errors.destination ? 'red' : 'initial' }}
        />
        <label>Start Date</label>
        <input 
          type="text" 
          name="startDate" 
          value={itinerary.startDate} 
          onChange={handleChange} 
          style={{ borderColor: !isValidDate(itinerary.startDate) ? 'red' : 'initial' }} // Conditional styling
        />
        <label>End Date</label>
        <input 
          type="text" 
          name="endDate" 
          value={itinerary.endDate} 
          onChange={handleChange} 
          style={{ borderColor: !isValidDate(itinerary.endDate) ? 'red' : 'initial' }} // Conditional styling
        />
        <button onClick={handleUpdateItinerary}>Update Itinerary</button>
        <button onClick={() => navigate("/homepage")}>Back to Homepage</button>
      </div>
    </div>
  );
};

export default EditItineraryPage; 