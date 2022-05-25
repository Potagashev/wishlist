#  https://docs.djangoproject.com/en/4.0/topics/http/urls/

from django.contrib import admin
from django.urls import path, include
from .yasg import urlpatterns as doc_urls


urlpatterns = [
    path('', include('backend.urls')),
    path('', include('friendship.urls')),
    path('', include('categories.urls')),
]

urlpatterns += doc_urls
