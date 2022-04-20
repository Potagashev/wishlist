from django.urls import path, include, re_path
from django.contrib import admin

from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/catalog', views.GiftAPIListCreate.as_view()),  # можно выводить и создавать, в зависимости от
    # метода запроса
    path('api/v1/wishes', views.WishAPIListCreate.as_view()),
    path('api/v1/wishes/<int:pk>', views.WishAPIRetrieveUpdate.as_view()),
    path('api/v1/wishes/<int:pk>/delete', views.WishAPIRetrieveDestroy.as_view()),

    path(r'api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    # POST - /api/v1/auth/users/ - создать юзера
    # GET - /api/v1/auth/users/ - список юзеров
    # POST - /auth/token/login/ - авторизация с выдачей токена
    # POST - /auth/token/logout/ - выход из системы, с удалением токена. ничего не возрвращает
    # GET - /users/me/ - {{ User.USERNAME_FIELD }} {{ User._meta.pk.name }} {{ User.REQUIRED_FIELDS }}
    # PUT - /users/me/ - на вход по идее нужно дать все обязательные поля, как минимум, выдает то, что и в ГЕТе
    # PATCH - /users/me/ - на вход надо отдать поле, которое будет меняться
    # DELETE - /users/me/ - удаление пользователя, в запросе нужно отдать пароль

    # DOCS https://djoser.readthedocs.io/en/latest/base_endpoints.html
]
