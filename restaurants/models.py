from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    rating = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name

