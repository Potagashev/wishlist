from django.db import models

from backend.constants import STATUSES
from backend.models import MyUser


class Friendship(models.Model):
    friend1 = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='who_requests')
    friend2 = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='who_responses')
    status = models.IntegerField(choices=STATUSES)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.friend1}, {self.friend2}'
