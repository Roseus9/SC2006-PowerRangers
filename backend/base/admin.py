from django.contrib import admin
from .models import Bookmark, Product, Review, Offer, Thread, ChatMessage, Profile
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Bookmark)
admin.site.register(Offer)
admin.site.register(Thread)
admin.site.register(ChatMessage)
admin.site.register(Profile)