from django.urls import path
from .views import TouristSpotList, welcome_page

urlpatterns = [
    path('', welcome_page, name='welcome'),  # Home page
    path('spots/', TouristSpotList.as_view(), name='tourist-spot-list'),  # API
]
