from django.urls import path
from .views import ItineraryList

urlpatterns = [
    path('itineraries/', ItineraryList.as_view(), name='itinerary-list'),
]

