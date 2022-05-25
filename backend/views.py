from rest_framework import generics

from rest_framework.permissions import IsAuthenticated, IsAdminUser

from backend.pagination import GiftAPIListPagination, WishlistAPIListPagination
from backend.permissions import IsOwner, ReadOnly, IsFriend
from backend.models import Gift, WishlistItem, MyUser, Wishlist
from backend.serializers import \
    GiftSerializer, \
    WishlistItemSerializer,\
    MyUserSerializer, \
    WishlistSerializer


# инфа о пользователе
# url: re_path('^/(?P<username>.+)/$', PurchaseList.as_view()),
class MyUserAPIRetrieve(generics.RetrieveAPIView):
    def get_queryset(self):
        return MyUser.objects.filter(username=str(self.kwargs['username']))
    serializer_class = MyUserSerializer
    permission_classes = [(IsOwner | IsFriend)]
    lookup_field = 'username'


#  вывод каталога гифтов и возможность добавлять новый
class GiftAPIListCreate(generics.ListCreateAPIView):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    permission_classes = [IsAdminUser | (ReadOnly & IsAuthenticated)]  # добавлять записи в каталог могут ток админы,
    pagination_class = GiftAPIListPagination
    # читать - авторизованные


# вывод отдельного гифта или его редактирование
class GiftAPIRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    permission_classes = [IsAdminUser | (ReadOnly & IsAuthenticated)]  # может менять только админ


#  чтение и удаление гифта
class GiftAPIRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    permission_classes = [IsAdminUser | (ReadOnly & IsAuthenticated)]  # удалять могут только админы,


class WishlistAPICreate(generics.CreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = (IsOwner, )


class WishlistAPIList(generics.ListAPIView):
    pagination_class = WishlistAPIListPagination
    # если нет параметров, то для текущего пользователя
    # иначе для того, кто указан в параметрах
    def get_queryset(self):
        if self.request.query_params is None:
            return Wishlist.objects.all()
        else:
            return Wishlist.objects.filter(user=self.request.query_params.get('user'))
    serializer_class = WishlistSerializer
    permission_classes = [(IsOwner | IsFriend)]


class WishlistAPIRetrieve(generics.RetrieveAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = [(IsOwner | IsFriend)]


#  вывод желаний
#  вывод желаний по айдишнику вишлиста из параметров запроса
class WishlistItemAPIListCreate(generics.ListCreateAPIView):
    def get_queryset(self):
        return WishlistItem.objects.filter(wishlist_id=self.request.query_params.get('wishlist_id'))
    serializer_class = WishlistItemSerializer
    permission_classes = [IsOwner | (ReadOnly & IsFriend)]  # создавать могут только авторизованные


#  чтение одного желания
#  по идее здесь не надо переопределять гет куери сет, чисто по айди
#  вывод работает
#  надо апдейт чекнуть
class WishlistItemAPIRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer
    permission_classes = [IsOwner | (ReadOnly & IsFriend)]   # может менять только автор, читать - авторизованные


#  чтение и удаление желания
class WishlistItemAPIRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer
    permission_classes = (IsOwner, )  # удалять могут только авторы и админы,
    # читать - авторизованные
