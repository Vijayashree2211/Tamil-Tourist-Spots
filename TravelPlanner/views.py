from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Itinerary, TouristSpot, Event
from .serializers import ItinerarySerializer, TouristSpotSerializer, EventSerializer

class ItineraryList(APIView):
    def get(self, request):
        itineraries = Itinerary.objects.filter(user=request.user)
        serializer = ItinerarySerializer(itineraries, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        itinerary = Itinerary.objects.create(
            user=request.user,
            name=data['name'],
            start_date=data['start_date'],
            end_date=data['end_date']
        )
        for spot_id in data['spots']:
            spot = TouristSpot.objects.get(id=spot_id)
            itinerary.spots.add(spot)
        for event_id in data['events']:
            event = Event.objects.get(id=event_id)
            itinerary.events.add(event)
        itinerary.save()
        return Response(ItinerarySerializer(itinerary).data, status=201)
