import React from "react";

const Itinerary = () => {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Plan your trip</h1>
        <div className="mt-4">
          <label className="block font-semibold">Destination</label>
          <input className="w-full p-2 border mb-4" type="text" placeholder="Where to?" />
          <label className="block font-semibold">Dates</label>
          <input className="w-full p-2 border mb-4" type="text" placeholder="Start date" />
          <input className="w-full p-2 border mb-4" type="text" placeholder="End date" />
          <button className="w-full bg-blue-500 text-white py-2 mb-2">SAVE ITINERARY</button>
          <button className="w-full bg-red-500 text-white py-2">DELETE ITINERARY</button>
        </div>
      </div>
    );
  };

  export default Itinerary