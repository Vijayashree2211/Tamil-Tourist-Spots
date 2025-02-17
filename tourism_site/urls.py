"""
URL configuration for tourism_site project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings  # ✅ Import settings
from django.conf.urls.static import static 
from django.contrib import admin
from django.urls import path,include
from tourism.views import welcome_page 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tourism.urls')),  # Includes `tourism/urls.py`
    path('', include('tourism.urls')),  
    path('api/reviews/', include("reviews.urls")),      
    path('api/itineraries/', include("TravelPlanner.urls")),
    path('api/', include('events.urls')), 
    path('api/restaurants/', include('restaurants.urls')),  

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

