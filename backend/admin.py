from django.contrib import admin

from backend.models import MyUser, Wishlist, WishlistItem, Gift, Friend

admin.site.register(MyUser)
admin.site.register(Friend)
admin.site.register(Gift)
admin.site.register(Wishlist)
admin.site.register(WishlistItem)

