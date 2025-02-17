from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import TouristSpot
from .serializers import TouristSpotSerializer

# Tamil Nadu Tourism API Welcome Page
def welcome_page(request):
    return HttpResponse(
        "<h1>தமிழ்நாடு சுற்றுலா API வரவேற்கிறது</h1>"
        "<p>சுற்றுலாத் தளங்களை அணுக <a href='/api/spots/'>இந்த இணைப்பை</a> பயன்படுத்தவும்.</p>"
    )

# API View for Listing All Tourist Spots
class TouristSpotList(generics.ListAPIView):
    queryset = TouristSpot.objects.all()
    serializer_class = TouristSpotSerializer
