from django.contrib import admin
from .models import Bookmark, Product, Review
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Bookmark)