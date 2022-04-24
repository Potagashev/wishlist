from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from backend.permissions import IsOwner, IsFriend
from friendship.models import Friendship
from friendship.serializers import FriendshipSerializer
from friendship.utils import \
    are_friends,\
    request_friendship, \
    confirm_friendship_request, \
    reject_friendship_request, \
    remove_friend


# список друзей по айди
class FriendAPIList(generics.ListAPIView):
    def get_queryset(self):
        return Friendship.objects.filter(friend1=self.request.user, status=2)
    serializer_class = FriendshipSerializer
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


class RejectFriendshipRequest(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = reject_friendship_request(
            current_user_id=self.request.user.id,
            user_being_checked_id=self.request.query_params.get('user')
        )
        return response


class RemoveFriend(APIView):
    permission_classes = [(IsAuthenticated | IsFriend)]

    def post(self, request):
        response = remove_friend(
            current_user_id=self.request.user.id,
            user_being_checked_id=self.request.query_params.get('user')
        )
        return response
