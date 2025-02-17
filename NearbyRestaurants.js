import React, { useEffect, useState } from "react";
import axios from "axios";

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurants from Django API
    axios
      .get("http://127.0.0.1:8000/api/restaurants/")
      .then((response) => {
        setRestaurants(response.data.nearby_restaurants);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading nearby restaurants...</p>;

  return (
    <div>
      <h2>🍽️ Nearby Restaurants</h2>
      <div className="restaurant-container">
        {restaurants.map((spot, index) => (
          <div key={index} className="restaurant-card">
            <h3>📍 {spot.spot}</h3>
            {spot.restaurants && spot.restaurants.length > 0 ? (
              <ul>
                {spot.restaurants.map((restaurant, i) => (
                  <li key={i}>
                    <strong>{restaurant.name}</strong> - {restaurant.cuisine} <br />
                    🏁 {restaurant.distance_km} km away
                  </li>
                ))}
              </ul>
            ) : (
              <p>No restaurants found near this location.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyRestaurants;
