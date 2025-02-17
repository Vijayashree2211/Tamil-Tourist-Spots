import React, { useState } from "react";

const ItineraryForm = ({ onAddItinerary }) => {
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState("");
  const [date, setDate] = useState("");

  const upcomingEvents = [
    { location: "Chennai", event: "World Women's Day Run", date: "2025-03-09" },
    { location: "Madurai", event: "Temple Festival", date: "2025-03-12" },
    { location: "Coimbatore", event: "Cultural Expo", date: "2025-03-15" },
    { location: "Trichy", event: "Marina Beach Marathon", date: "2025-04-05" },
    { location: "Ooty", event: "Tea Festival", date: "2025-04-10" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !events || !date) {
      alert("Please fill in all fields!");
      return;
    }
    const newItinerary = { location, events, date };
    onAddItinerary(newItinerary); // ✅ Sends data to App.js
    setLocation("");
    setEvents("");
    setDate("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>📌 Create Your Itinerary</h3>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Events"
          value={events}
          onChange={(e) => setEvents(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Itinerary</button>
      </form>

      {/* Upcoming Events */}
      <h3>📅 Upcoming Events in Tamil Nadu</h3>
      {upcomingEvents.map((event, index) => (
        <div key={index}>
          <p>📍 Location: {event.location}</p>
          <p>🎉 Event: {event.event}</p>
          <p>📅 Date: {event.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ItineraryForm;
