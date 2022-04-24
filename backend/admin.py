from django.contrib import admin

from backend.models import MyUser, Wishlist, WishlistItem, Gift
from friendship.models import Friendship

admin.site.register(MyUser)
admin.site.register(Gift)
admin.site.register(Wishlist)
admin.site.register(WishlistItem)


