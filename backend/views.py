from rest_framework import generics, viewsets

from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from backend.permissions import ReadOnlyForAuthenticated, IsOwner

from backend.models import CatalogItem, Wish
from backend.serializers import CatalogItemSerializer, WishSerializer


#  вывод каталога типа и возможность добавлять новые
class CatalogItemsListCreate(generics.ListCreateAPIView):
    queryset = CatalogItem.objects.all()
    serializer_class = CatalogItemSerializer
    permission_classes = (IsAdminUser, ReadOnlyForAuthenticated)  # добавлять записи в каталог могут ток админы,
    # читать - авторизованные


class WishAPIListCreate(generics.ListCreateAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer
    permission_classes = (IsAuthenticated, )  # создавать могут только авторизованные


class WishAPIRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer
    permission_classes = (IsOwner, ReadOnlyForAuthenticated)  # может менять только автор


class WishAPIRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer
    permission_classes = (IsOwner, IsAdminUser, ReadOnlyForAuthenticated)  # удалять могут только авторы и админы,
    # читать - авторизованные
