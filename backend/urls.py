from django.urls import path
from django.contrib import admin

from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/catalog', views.CatalogItemsListCreate.as_view()),  # можно выводить и создавать, в зависимости от
    # метода запроса
    path('api/v1/wishes', views.WishAPIListCreate.as_view()),
    path('api/v1/wishes/<int:pk>', views.WishAPIRetrieveUpdate.as_view()),
    path('api/v1/wishes/<int:pk>/delete', views.WishAPIRetrieveDestroy.as_view()),
]
