from django.urls import path, include, re_path
from django.contrib import admin

from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/gifts', views.GiftAPIListCreate.as_view()),  # можно выводить и создавать, в зависимости от
    # метода запроса
    path('api/v1/gifts/<int:pk>', views.GiftAPIRetrieveUpdate.as_view()),

    path('api/v1/create_wishlist', views.WishlistAPICreate.as_view()),
    path('api/v1/wishlists', views.WishlistAPIList.as_view()),
    path('api/v1/wishlists/<int:pk>', views.WishlistAPIRetrieve.as_view()),

    path('api/v1/wishes', views.WishlistItemAPIListCreate.as_view()),
    path('api/v1/wishes/<int:pk>', views.WishlistItemAPIRetrieveUpdate.as_view()),
    path('api/v1/wishes/<int:pk>/delete', views.WishlistItemAPIRetrieveDestroy.as_view()),

    # path('api/v1/user/<int:pk>', views.MyUserAPIRetrieve.as_view()),
    re_path('^api/v1/user/(?P<username>.+)/$', views.MyUserAPIRetrieve.as_view()),

    path(r'api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),

    # POST - /api/v1/auth/users/ - создать юзера
    # GET - /api/v1/auth/users/ - список юзеров
    # POST - /auth/token/login/ - авторизация с выдачей токена
    # GET - /users/me/ - {{ User.USERNAME_FIELD }} {{ User._meta.pk.name }} {{ User.REQUIRED_FIELDS }}
    # PUT - /users/me/ - на вход по идее нужно дать все обязательные поля, как минимум, выдает то, что и в ГЕТе
    # PATCH - /users/me/ - на вход надо отдать поле, которое будет меняться
    # DELETE - /users/me/ - удаление пользователя, в запросе нужно отдать пароль

    # DOCS https://djoser.readthedocs.io/en/latest/base_endpoints.html
]
