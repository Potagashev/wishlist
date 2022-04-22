from django.contrib.auth.models import AbstractUser
from django.db import models

from backend.constants import CATEGORIES, GENDERS, SUB_CATEGORIES, STATUSES
from utils import get_ru_cities_from_wiki as get_cities


cities = get_cities.get_ru_cities_from_wiki()


class MyUser(AbstractUser):
    patronymic = models.CharField(blank=True, null=True, max_length=256, verbose_name='patronymic')
    gender = models.CharField(blank=True, null=True, max_length=64, choices=GENDERS)
    city = models.CharField(blank=True, null=True, max_length=256, choices=cities)
    b_date = models.DateField(blank=True, null=True)
    photo = models.ImageField(blank=True, max_length=256, default=None)

    def __str__(self):
        return self.username


class Friend(models.Model):
    friend1 = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='who_requests')
    friend2 = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='who_responses')
    status = models.IntegerField(choices=STATUSES)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.friend1}, {self.friend2}'


class Gift(models.Model):
    name = models.CharField(max_length=256)
    category = models.CharField(max_length=128, choices=CATEGORIES)
    sub_category = models.CharField(max_length=128, choices=SUB_CATEGORIES)
    price = models.IntegerField()
    description = models.CharField(max_length=1000)
    photo = models.ImageField(max_length=256, default=None)

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
