import React from "react";
import ItineraryRow from "./ItineraryRow";

const ItineraryTable = ({ itineraries = [] }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Destination</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                {(itineraries?.length ?? 0) > 0 ? (
                    itineraries.map((itinerary) => (
                        <ItineraryRow key={itinerary._id} itinerary={itinerary} />
                    ))
                ): (
                    <tr>
                        <td colSpan="3">No Itinerary Found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ItineraryTable;