from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from backend.models import Friend, MyUser
from backend.serializers import FriendSerializer


def are_friends(current_user_id, user_being_checked_id):
    """
    пытаемся найти в БД строку с нужными юзерами, вложенность такая,
    потому что порядок юзеров зависит от того, кто подал заявку в друзья

    0 - не друзья, 1 - подана заявка, 2 - друзья
    """
    status = None
    detail = ''
    if int(current_user_id) == int(user_being_checked_id):
        return Response({'Error': 'A User cannot be a friend to himself'})
    try:
        friend = Friend.objects.get(friend1_id=current_user_id, friend2_id=user_being_checked_id)
    except ObjectDoesNotExist:

        try:
            friend = Friend.objects.get(friend1_id=user_being_checked_id, friend2_id=current_user_id)
        except ObjectDoesNotExist:
            status = 0
            detail = 'They are not friends'
            return Response({'status': status, 'detail': detail})
        else:
            if friend.status == 1:
                status = 1
                detail = 'Waiting for confirmation by the user being checked'

    else:
        if friend.status == 1:
            status = 1
            detail = 'Waiting for confirmation of friendship by the current user'

    if friend.status == 2:
        status = 2
        detail = 'They are friends'

    return Response({'status': status, 'detail': detail})


def request_friendship(current_user_id, user_being_checked_id):
    """0 - не друзья, 1 - подана заявка, 2 - друзья"""
    status = are_friends(current_user_id, user_being_checked_id).data
    if status.get('status') == 1 or status.get('status') == 2:
        return Response({'Error': status})

    if status.get('status') == 0:
        friend = Friend()
        friend.friend1 = MyUser.objects.get(id=current_user_id)
        friend.friend2 = MyUser.objects.get(id=user_being_checked_id)
        friend.status = 1
        friend.save()
        return Response(FriendSerializer(friend).data)


def confirm_friendship_request(current_user_id, user_being_checked_id):
    """0 - не друзья, 1 - подана заявка, 2 - друзья"""
    status = are_friends(current_user_id, user_being_checked_id).data
    if status.get('status') == 0 or status.get('status') == 2:
        return Response({'Error': status})

    if status.get('status') == 1:
        friend = Friend.objects.get(
            friend1_id=current_user_id,
            friend2_id=user_being_checked_id
        )
        friend.status = 2
        friend.save()
        return Response(FriendSerializer(friend).data)


def reject_friendship_request(current_user_id, user_being_checked_id):
    """0 - не друзья, 1 - подана заявка, 2 - друзья"""
    status = are_friends(current_user_id, user_being_checked_id).data
    if status.get('status') == 0 or status.get('status') == 2:
        return Response({'Error': status})

    if status.get('status') == 1:
        friend = Friend.objects.get(
            friend1_id=current_user_id,
            friend2_id=user_being_checked_id
        )
        friend.delete()
        return Response({'Success': 'Friendship request rejected'})


def remove_friend(current_user_id, user_being_checked_id):
    """0 - не друзья, 1 - подана заявка, 2 - друзья"""
    status = are_friends(current_user_id, user_being_checked_id).data
    if status.get('status') == 0 or status.get('status') == 1:
        return Response({'Error': status})

    if status.get('status') == 2:
        friend = Friend.objects.get(
            friend1_id=current_user_id,
            friend2_id=user_being_checked_id
        )
        friend.delete()
        return Response({'Success': 'Friend removed'})

