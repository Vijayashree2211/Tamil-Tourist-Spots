from django.shortcuts import render

import requests
from django.http import JsonResponse
from math import radians, cos, sin, sqrt, atan2

# Tourist spots with coordinates
TOURIST_SPOTS = [
    {"name": "Meenakshi Amman Temple", "lat": 9.9195, "lng": 78.1193},
    {"name": "Brihadeeswarar Temple", "lat": 10.7828, "lng": 79.1316},
    {"name": "Marina Beach", "lat": 13.0499, "lng": 80.2824},
    {"name": "Ooty Botanical Gardens", "lat": 11.4102, "lng": 76.7032},
    {"name": "Rameswaram Temple", "lat": 9.2881, "lng": 79.3174},
    {"name": "Kodaikanal Lake", "lat": 10.2396, "lng": 77.4890},
    {"name": "Kanyakumari Beach", "lat": 8.0883, "lng": 77.5385},
    {"name": "Yercaud Lake", "lat": 11.7753, "lng": 78.2093},
    {"name": "Courtallam Falls", "lat": 8.9340, "lng": 77.2746},
    {"name": "Hogenakkal Falls", "lat": 12.1165, "lng": 77.7724},
    {"name": "Thanjavur Palace", "lat": 10.7860, "lng": 79.1378},
]

def haversine(lat1, lon1, lat2, lon2):
    """Calculate the great-circle distance between two coordinates (Haversine formula)."""
    R = 6371  # Radius of Earth in km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c  # Distance in km

def get_nearby_restaurants(request):
    """Fetch and sort nearby restaurants by distance from each tourist spot."""
    results = []

    for spot in TOURIST_SPOTS:
        lat, lng = spot["lat"], spot["lng"]
        overpass_url = f"https://overpass-api.de/api/interpreter?data=[out:json];node[\"amenity\"=\"restaurant\"](around:5000,{lat},{lng});out;"

        try:
            response = requests.get(overpass_url)
            data = response.json()

            restaurants = []
            for element in data.get("elements", []):
                name = element.get("tags", {}).get("name", "Unknown Restaurant")
                cuisine = element.get("tags", {}).get("cuisine", "Unknown Cuisine")
                rest_lat = element.get("lat")
                rest_lon = element.get("lon")

                # Calculate distance
                distance = haversine(lat, lng, rest_lat, rest_lon)
                restaurants.append({"name": name, "cuisine": cuisine, "lat": rest_lat, "lon": rest_lon, "distance_km": round(distance, 2)})

            # Sort by distance (nearest first)
            sorted_restaurants = sorted(restaurants, key=lambda x: x["distance_km"])

            results.append({"spot": spot["name"], "restaurants": sorted_restaurants})

        except Exception as e:
            results.append({"spot": spot["name"], "error": str(e)})

    return JsonResponse({"nearby_restaurants": results}, safe=False)




