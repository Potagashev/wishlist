from django.core.management.base import BaseCommand
import json

from backend.constants import CATEGORIES, SUB_CATEGORIES
from backend.models import Gift


class Command(BaseCommand):
    def handle(self, **options):
        for gift in Gift.objects.all():
            gift.delete()
            print(gift.name)

        # data = json.load(json_file)
        # with open('/home/alexander/PycharmProjects/wishlist/utils/parsing/gift_info.json') as json_file:
            # for row in data:
            # print(f'adding {row["name"]}')
            # gift = Gift()
            # gift.name = row['name']
            #
            # for category in CATEGORIES:
            #     if category[1] == row['main_category'].capitalize():
            #         gift.category = category[0]
            #
            # for sub_category in SUB_CATEGORIES:
            #     if sub_category[1] == row['sub_category'].capitalize():
            #         gift.sub_category = sub_category[0]
            #
            # gift.price = row['price']
            # gift.description = row['description']
            # gift.photo = row['gift_photo']
            # gift.save()
