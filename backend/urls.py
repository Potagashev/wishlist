from django.urls import path
from django.contrib import admin

from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/catalog', views.CatalogItemsListCreate.as_view()),
]
