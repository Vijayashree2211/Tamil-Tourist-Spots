from rest_framework import serializers
from .models import Review
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['place_name', 'comment', 'rating']
        extra_kwargs = {'place_name': {'required': True}, 'comment': {'required': True}, 'rating': {'required': True}}
