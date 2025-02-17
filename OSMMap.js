import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const locations = [
  { name: "Meenakshi Amman Temple", lat: 9.9195, lng: 78.1193 },
  { name: "Brihadeeswarar Temple", lat: 10.7828, lng: 79.1316 },
  { name: "Marina Beach", lat: 13.0499, lng: 80.2824 },
  { name: "Ooty Botanical Gardens", lat: 11.4102, lng: 76.7032 },
  { name: "Rameswaram Temple", lat: 9.2881, lng: 79.3174 },
  { name: "Kodaikanal Lake", lat: 10.2396, lng: 77.4890 },
  { name: "Kanyakumari Beach", lat: 8.0883, lng: 77.5385 },
  { name: "Yercaud Lake", lat: 11.7753, lng: 78.2093 },
  { name: "Courtallam Falls", lat: 8.9340, lng: 77.2746 },
  { name: "Hogenakkal Falls", lat: 12.1165, lng: 77.7724 },
  { name: "Thanjavur Palace", lat: 10.7860, lng: 79.1378 }
];

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const TamilNaduMap = () => {
  const [search, setSearch] = useState("");

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search locations..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <MapContainer center={[10.8505, 76.2711]} zoom={7} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredLocations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TamilNaduMap;

