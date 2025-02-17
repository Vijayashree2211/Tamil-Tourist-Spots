import React from "react";

const ItineraryList = ({ itinerary }) => {
  return (
    <div>
      <h3>📌 Your Itineraries</h3>
      {itinerary.length === 0 ? (
        <p>No itineraries added yet.</p>
      ) : (
        <ul>
          {itinerary.map((item, index) => (
            <li key={index}>
              <strong>Location:</strong> {item.location} <br />
              <strong>Events:</strong> {item.events} <br />
              <strong>Date:</strong> {item.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItineraryList;

