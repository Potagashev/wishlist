# Generated by Django 4.0.3 on 2022-05-25 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0002_remove_category_id_category_category_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='category_name',
            field=models.CharField(max_length=50),
        ),
    ]
