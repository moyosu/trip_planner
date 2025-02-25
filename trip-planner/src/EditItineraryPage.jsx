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

  const handleUpdateItinerary = async () => {
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

  return (
    <div>
      <h1>Edit Itinerary</h1>
      <div>
        <label>Destination</label>
        <input 
          type="text" 
          name="destination" 
          value={itinerary.destination} 
          onChange={handleChange} 
        />
        <label>Start Date</label>
        <input 
          type="text" 
          name="startDate" 
          value={itinerary.startDate} 
          onChange={handleChange} 
        />
        <label>End Date</label>
        <input 
          type="text" 
          name="endDate" 
          value={itinerary.endDate} 
          onChange={handleChange} 
        />
        <button onClick={handleUpdateItinerary}>Update Itinerary</button>
        <button onClick={() => navigate("/homepage")}>Back to Homepage</button>
        <br/>
        <label> Ensure the dates are in MM-DD-YYYY format.</label>
      </div>
    </div>
  );
};

export default EditItineraryPage; 