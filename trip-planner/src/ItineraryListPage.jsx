import React, { useEffect, useState } from "react";
import ItineraryTable from "./components/ItineraryTable";
import { useNavigate } from "react-router-dom";

// Define a constant for the base URL
const BASE_URL = 'http://localhost:5173'; // Change the port here if needed

const ItineraryListPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();
  
  const fetchItineraries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/itineraries`);
      const data = await response.json();
      console.log(data); 
      setItineraries(data);
    } catch (error) {
      console.error('Failed to fetch itineraries:', error);
    }
  };

  const handleDeleteItinerary = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this itinerary?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${BASE_URL}/itineraries/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Refresh the itinerary list after deletion
        fetchItineraries();
      } catch (error) {
        console.error('Error deleting itinerary:', error);
      }
    }
  };

  const handleEditItinerary = (id) => {
    navigate(`/edit/${id}`); // Navigate to the edit page with the itinerary ID
  };

  const handleClick = () => {
    navigate("/add"); // Navigate to the new itinerary page
  }

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <div>
      <h1>Itineraries</h1>
      <ItineraryTable 
        itineraries={itineraries} 
        onDelete={handleDeleteItinerary} 
        onEdit={handleEditItinerary} // Pass onEdit to the table
      />
      <button onClick={handleClick}>CREATE AN ITINERARY</button>
    </div>
  );
};

export default ItineraryListPage;