import React from "react";
import emailjs from "emailjs-com";

const ItineraryShare = ({ itinerary }) => {
  const handleShare = () => {
    if (itinerary.length === 0) {
      alert("No itinerary to share!");
      return;
    }

    // Get the latest itinerary item
    const latestItinerary = itinerary[itinerary.length - 1];

    // Prepare email data
    const emailData = {
      to_name: "Vijayashree", // Change to recipient name dynamically if needed
      from_name: "Vijayashree V",
      location: latestItinerary.location,
      events: latestItinerary.events,
      date: latestItinerary.date,
    };

    // Send itinerary details via EmailJS
    emailjs
      .send("service_jqr5w2z", "template_gfvv3pc", emailData, "vUXfh3a-HFCMCp0La")
      .then((response) => {
        console.log("✅ Itinerary shared successfully:", response);
        alert("Itinerary shared successfully!");
      })
      .catch((error) => {
        console.error("❌ Error sharing itinerary:", error);
        alert("Failed to share itinerary. Please check your EmailJS setup.");
      });
  };

  return (
    <div>
      <h3>📤 Share Your Itinerary</h3>
      {itinerary.length === 0 ? (
        <p>No itinerary to share.</p>
      ) : (
        <ul>
          {itinerary.map((item, index) => (
            <li key={index}>
              <strong>📍 Location:</strong> {item.location} <br />
              <strong>🎉 Events:</strong> {item.events} <br />
              <strong>📅 Date:</strong> {item.date}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleShare}>📧 Share Itinerary</button>
    </div>
  );
};

export default ItineraryShare;
