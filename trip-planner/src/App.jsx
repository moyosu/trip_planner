import React from "react";
import LoginPage from "./LoginPage";
import ItineraryListPage from "./ItineraryListPage";
import Itinerary from "./ItineraryPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<ItineraryListPage />} />
        <Route path="/edit" element={<Itinerary />} />
      </Routes>
    </Router>
  );
};

export default App