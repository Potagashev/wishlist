from django.contrib.auth.models import AbstractUser
from django.db import models

from constants import CATEGORIES, GENDERS, SUB_CATEGORIES
from utils import get_ru_cities_from_wiki as get_cities

cities = get_cities.get_ru_cities_from_wiki()


class MyUser(AbstractUser):
    patronymic = models.CharField(verbose_name='middle name in other words')
    gender = models.CharField(choices=GENDERS)
    city = models.CharField(choices=cities)
    b_date = models.DateField()
    photo = models.ImageField(max_length=256)

    def __str__(self):
        return self.username


class Gift(models.Model):
    name = models.CharField(max_length=256)
    category = models.CharField(choices=CATEGORIES)
    sub_category = models.CharField(choices=SUB_CATEGORIES)
    price = models.IntegerField()
    description = models.CharField(max_length=1000)
    photo = models.ImageField()

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
    gift_id = models.ForeignKey(Gift, on_delete=models.SET_NULL)
    position = models.IntegerField()
    booker_id = models.ForeignKey(MyUser, on_delete=models.SET_NULL)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.gift_id.name
