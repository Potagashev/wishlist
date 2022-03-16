from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.db import models


class CatalogItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)

    CLOTHES = 'Clothes'
    ELECTRONICS = 'Electronics'
    SPORT = 'Sport'
    APPLIANCES = 'Appliances'
    FOR_HOME = 'For Home'
    TOYS = 'Toys'
    OTHER = 'Other'

    CATEGORIES_CHOICES = [
        (CLOTHES, 'Одежда'),
        (ELECTRONICS, 'Электроника'),
        (SPORT, 'Спорт'),
        (APPLIANCES, 'Бытовая техника'),
        (FOR_HOME, 'Для дома'),
        (TOYS, 'Игрушки'),
        (OTHER, 'Другое'),
    ]
    category = models.CharField(max_length=30,
                                choices=CATEGORIES_CHOICES,
                                default=OTHER)
    tags = ArrayField(models.CharField(max_length=200), blank=True, null=True, default=None)

    def __str__(self):
        return self.name


class Wish(models.Model):
    catalog_item = models.ForeignKey(CatalogItem, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    booked_users = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                          related_name='booked_users',
                                          blank=True,
                                          null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.catalog_item.name
