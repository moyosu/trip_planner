import React from "react";

const ItineraryListPage = () => {
    return (
      <div>
        <h1>Itineraries</h1>
        <p>Upcoming trips</p>
        <div>
          {[1, 2, 3].map((item) => (
            <div key={item}>
              Itinerary {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default ItineraryListPage