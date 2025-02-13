import React, { useEffect, useState } from "react";
import ItineraryTable from "./components/ItineraryTable";

const ItineraryListPage = () => {
  const [itineraries, setItineraries] = useState([]);

  const fetchItineraries = async () => {
    try {
      const response = await fetch('/itineraries');
      const data = await response.json();
      setItineraries(data);
    } catch (error) {
      console.error('Failed to fetch itineraries:', error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <div>
      <h1>Itineraries</h1>
      <ItineraryTable itineraries={itineraries} />
    </div>
  );
};

export default ItineraryListPage;