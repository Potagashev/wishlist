from rest_framework import permissions

from rest_framework.permissions import SAFE_METHODS

from friendship.utils import are_friends


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
        return obj.username == str(request.user)


class IsFriend(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        status = are_friends(
            current_user_id=request.user.id,
            user_being_checked_id=obj.id
        ).data.get('status')
        return status == 2
