from rest_framework import generics, viewsets

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from backend.permissions import IsOwner, ReadOnly

from backend.models import Gift, WishlistItem
from backend.serializers import GiftSerializer, WishlistItemSerializer, WishlistSerialiser, MyUserSerializer


#  вывод каталога типа и возможность добавлять новые
class GiftAPIListCreate(generics.ListCreateAPIView):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    permission_classes = [IsAdminUser | (ReadOnly & IsAuthenticated)]  # добавлять записи в каталог могут ток админы,
    # читать - авторизованные


class GiftAPIRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    permission_classes = [IsAdminUser | (ReadOnly & IsAuthenticated)]  # может менять только админ


#  чтение и удаление элемента каталога
class CatalogItemsAPIRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    permission_classes = [IsAdminUser | (ReadOnly & IsAuthenticated)]  # удалять могут только админы,


#  вывод желаний
#  вывод потестил
#  создание потестили
class WishlistItemAPIListCreate(generics.ListCreateAPIView):
    def get_queryset(self):
        return WishlistItem.objects.filter(user=self.request.user)
    serializer_class = WishlistItemSerializer
    permission_classes = (IsAuthenticated, )  # создавать могут только авторизованные


#  чтение одного желания
#  по идее здесь не надо переопределять гет куери сет, чисто по айди
#  вывод работает
#  надо апдейт чекнуть
class WishAPIRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer
    permission_classes = [IsOwner | (ReadOnly & IsAuthenticated)]   # может менять только автор, читать - авторизованные


#  чтение и удаление желания
class WishAPIRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer
    permission_classes = [IsOwner | IsAdminUser | (ReadOnly & IsAuthenticated)]  # удалять могут только авторы и админы,
    # читать - авторизованные
