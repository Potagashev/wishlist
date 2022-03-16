from django.urls import path
from frontend import views


urlpatterns = [
    path('catalog', views.index),
]