import React from "react";

const ItineraryRow = ({ itinerary }) => {

    return (
        <tr>
            <td>
                {itinerary.destination}
            </td>
            <td>
                {itinerary.startDate}
            </td>
            <td>
                {itinerary.endDate}
            </td>
        </tr>
    );
};

export default ItineraryRow;