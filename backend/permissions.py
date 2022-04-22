from rest_framework import permissions

from rest_framework.permissions import SAFE_METHODS

from backend.models import Friend


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


# менять можно только владельцу/автору
class IsOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return obj.username == request.user


class IsFriend(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        friends = Friend.objects.filter(friend1=request.user, status=1)
        return obj.user in friends

