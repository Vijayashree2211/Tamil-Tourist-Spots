from rest_framework import serializers
from .models import Itinerary, TouristSpot, Event

class TouristSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TouristSpot
        fields = ['id', 'name', 'description', 'location']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'event_date', 'location']

class ItinerarySerializer(serializers.ModelSerializer):
    spots = TouristSpotSerializer(many=True)
    events = EventSerializer(many=True)

    class Meta:
        model = Itinerary
        fields = ['id', 'name', 'start_date', 'end_date', 'spots', 'events', 'created_at']
