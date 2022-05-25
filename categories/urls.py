from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.contrib import admin

from categories import views

urlpatterns = [
    path('api/v1/categories', views.CategoryAPIList.as_view()),
    re_path('api/v1/subcategories/(?P<category>.+)/$', views.SubcategoriesByCategoryAPIList.as_view()),
]