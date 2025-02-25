import React from "react";
import LoginPage from "./LoginPage";
import ItineraryListPage from "./ItineraryListPage";
import EditItineraryPage from "./EditItineraryPage";
import NewItineraryPage from "./NewItineraryPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<ItineraryListPage />} />
        <Route path="/edit/:id" element={<EditItineraryPage />} />
        <Route path="/add" element={<NewItineraryPage />} />
      </Routes>
    </Router>
  );
};

export default App;