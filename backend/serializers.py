from rest_framework import serializers
from .models import Wish, CatalogItem


class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish
        fields = '__all__'


class CatalogItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogItem
        fields = '__all__'
