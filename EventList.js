import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = ({ location }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&token=7REKNI5MZ3RNQZM36B`);
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [location]);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h4>{event.name.text}</h4>
          <p>{event.description.text}</p>
          <p>{event.start.local}</p>
          <p>{event.venue?.address.localized_address_display}</p>
          <a href={event.url} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
      ))}
    </div>
  );
};

export default EventList;
