import React from "react";
import ItineraryRow from "./ItineraryRow";

const ItineraryTable = ({ itineraries = [], onDelete, onEdit }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Destination</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {(itineraries?.length ?? 0) > 0 ? (
                    itineraries.map((itinerary) => (
                        <ItineraryRow 
                            key={itinerary._id} 
                            itinerary={itinerary} 
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                ): (
                    <tr>
                        <td colSpan="4">No Itinerary Found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ItineraryTable;