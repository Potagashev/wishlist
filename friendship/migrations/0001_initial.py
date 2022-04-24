# Generated by Django 4.0.3 on 2022-04-23 12:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Friendship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(choices=[(1, 'Запрос отправлен'), (2, 'В друзьях')])),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('friend1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='who_requests', to=settings.AUTH_USER_MODEL)),
                ('friend2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='who_responses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
