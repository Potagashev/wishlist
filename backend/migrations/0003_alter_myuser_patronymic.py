# Generated by Django 4.0.3 on 2022-04-22 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_myuser_b_date_alter_myuser_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='patronymic',
            field=models.CharField(max_length=256, null=True, verbose_name='patronymic'),
        ),
    ]