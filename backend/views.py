from rest_framework import generics
from backend.models import CatalogItem
from backend.serializers import CatalogItemSerializer


#  вывод каталога типа
class CatalogItemsListCreate(generics.ListCreateAPIView):
    queryset = CatalogItem.objects.all()
    serializer_class = CatalogItemSerializer

