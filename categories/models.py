from django.db import models


class Category(models.Model):
    category_name = models.CharField(max_length=50)
    name = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return self.category_name


class Subcategory(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, to_field='name', on_delete=models.CASCADE)
    image = models.CharField(max_length=256, null=True)

    def __str__(self):
        return self.name