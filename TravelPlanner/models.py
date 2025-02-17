from django.db import models

# from django.db import models
from django.contrib.auth.models import User

class TouristSpot(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    event_date = models.DateTimeField()
    location = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Itinerary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    spots = models.ManyToManyField(TouristSpot, related_name="itineraries")
    events = models.ManyToManyField(Event, related_name="itineraries")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Itinerary: {self.name} by {self.user.username}"



