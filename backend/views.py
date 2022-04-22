from rest_framework import generics, viewsets

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView

from backend.permissions import IsOwner, ReadOnly, IsFriend
from backend.models import Gift, WishlistItem, MyUser, Friend, Wishlist
from backend.serializers import GiftSerializer, WishlistItemSerializer, MyUserSerializer, FriendSerializer, \
    WishlistSerializer
from utils.utils import are_friends, request_friendship, confirm_friendship_request


# инфа о пользователе
# url: re_path('^/(?P<username>.+)/$', PurchaseList.as_view()),


class MyUserAPIRetrieve(generics.RetrieveAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes = [(IsOwner | IsAdminUser)]


# список друзей по айди
class FriendAPIList(generics.ListAPIView):
    def get_queryset(self):
        return Friend.objects.filter(friend1=self.request.user, status=2)
    serializer_class = FriendSerializer
    permission_classes = [(IsOwner | IsFriend)]


class AreFriends(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = are_friends(
            current_user_id=self.request.user.id,
            user_being_checked_id=self.request.query_params.get('user')
        )
        return response


class RequestFriendship(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = request_friendship(
            current_user_id=self.request.user.id,
            user_being_checked_id=self.request.query_params.get('user')
        )
        return response


class ConfirmFriendshipRequest(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = confirm_friendship_request(
            current_user_id=self.request.user.id,
            user_being_checked_id=self.request.query_params.get('user')
        )
        return response


#  вывод каталога типа и возможность добавлять новый
class GiftAPIListCreate(generics.ListCreateAPIView):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    permission_classes = [IsAdminUser | (ReadOnly & IsAuthenticated)]  # добавлять записи в каталог могут ток админы,
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


class WishlistAPIListCreate(generics.ListCreateAPIView):
    def get_queryset(self):
        if self.request.query_params is None:
            return Wishlist.objects.all()
        else:
            return Wishlist.objects.filter(user=self.request.query_params.get('user'))
    serializer_class = WishlistSerializer
    permission_classes = (IsOwner, )


class WishlistAPIRetrieve(generics.RetrieveAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = (IsOwner, )


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