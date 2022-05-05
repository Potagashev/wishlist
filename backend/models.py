from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

from backend.constants import CATEGORIES, GENDERS, SUB_CATEGORIES, REGISTRATION_REQUIRED_FIELDS
from utils import get_ru_cities_from_wiki as get_cities


class CustomUserManager(UserManager):
    """позволяет логиниться по имэйлу либо по юзернэйму"""
    def get_by_natural_key(self, username):
        return self.get(
            Q(**{self.model.USERNAME_FIELD: username}) |
            Q(**{self.model.EMAIL_FIELD: username})
        )


cities = get_cities.get_ru_cities_from_wiki()


class MyUser(AbstractUser):
    REQUIRED_FIELDS = REGISTRATION_REQUIRED_FIELDS

    objects = CustomUserManager()

    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        _("username"),
        max_length=30,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )

    first_name = models.CharField(_("first name"), max_length=30, blank=False, null=False)
    last_name = models.CharField(_("last name"), max_length=50, blank=False, null=False)
    email = models.EmailField(_("email address"), unique=True, blank=False, null=False)
    patronymic = models.CharField(blank=True, null=True, max_length=256, verbose_name='patronymic')
    gender = models.CharField(blank=True, null=True, max_length=64, choices=GENDERS)
    city = models.CharField(blank=True, null=True, max_length=256, choices=cities)
    b_date = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='media/my_user/avatar/', blank=True, null=True, max_length=256, default=None)

    def __str__(self):
        return self.username


class Gift(models.Model):
    name = models.CharField(max_length=256)
    category = models.CharField(max_length=128, choices=CATEGORIES)
    sub_category = models.CharField(max_length=128, choices=SUB_CATEGORIES)
    price = models.IntegerField()
    description = models.CharField(max_length=10000)
    photo = models.CharField(max_length=256, default=None)

    def __str__(self):
        return self.name


class Wishlist(models.Model):
    name = models.CharField(max_length=128)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class WishlistItem(models.Model):
    wishlist_id = models.ForeignKey(Wishlist, on_delete=models.CASCADE)
    gift_id = models.ForeignKey(Gift, on_delete=models.SET_NULL, null=True)
    position = models.IntegerField()
    booker_id = models.ForeignKey(MyUser, on_delete=models.SET_NULL, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.gift_id.name
