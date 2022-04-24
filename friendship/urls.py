from django.urls import path, include, re_path

from friendship import views

urlpatterns = [
    path('api/v1/user/friends', views.FriendAPIList.as_view()),
    path('api/v1/user/are_friends', views.AreFriends.as_view()),
    path('api/v1/user/request_friendship', views.RequestFriendship.as_view()),
    path('api/v1/user/confirm_friendship_request', views.ConfirmFriendshipRequest.as_view()),
    path('api/v1/user/reject_friendship_request', views.RejectFriendshipRequest.as_view()),
    path('api/v1/user/remove_friend', views.RemoveFriend.as_view()),
]