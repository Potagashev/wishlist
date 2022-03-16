#  https://docs.djangoproject.com/en/4.0/topics/http/urls/

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('backend.urls')),
    path('', include('frontend.urls')),
]
