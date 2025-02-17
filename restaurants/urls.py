# restaurants/urls.py
from django.urls import path
from .views import get_nearby_restaurants

urlpatterns = [
    path('', get_nearby_restaurants, name='get_nearby_restaurants'),  # Make sure this is correctly mapped
]
