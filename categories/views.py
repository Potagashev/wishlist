from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from categories.models import Category, Subcategory
from categories.serializers import CategorySerializer, SubcategorySerializer


class CategoryAPIList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class SubcategoriesByCategoryAPIList(generics.ListAPIView):
    def get_queryset(self):
        return Subcategory.objects.filter(category=str(self.kwargs['category']))
    serializer_class = SubcategorySerializer
    permission_classes = [AllowAny]

