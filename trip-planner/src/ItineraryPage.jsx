import React from "react";

const Itinerary = () => {
    return (
      <div>
        <h1>Plan your trip</h1>
        <div>
          <label>Destination</label>
          <input type="text" placeholder="Where to?" />
          <label >Dates</label>
          <input type="text" placeholder="Start date" />
          <input type="text" placeholder="End date" />
          <button >SAVE ITINERARY</button>
          <button >DELETE ITINERARY</button>
        </div>
      </div>
    );
  };

  export default Itinerary