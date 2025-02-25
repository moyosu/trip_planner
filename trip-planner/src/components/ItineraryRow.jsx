import React from "react";

const ItineraryRow = ({ itinerary, onDelete, onEdit }) => {

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
            <td>
                <button onClick={() => onEdit(itinerary._id)}>Edit</button>
                <button onClick={() => onDelete(itinerary._id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ItineraryRow;