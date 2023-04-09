from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    # (null=True) allows the database to store a NULL value for the field.
    # (blank=True) allows the field to be empty in a form or in the admin interface.
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='seller')
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='buyer')
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    condition = models.BooleanField(default=False, blank=False) #T = New, F = Old
    tags = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=False, blank=False, default="No Description")
    delivery = models.BooleanField(default=False) 
    notes = models.TextField(null=True) #notes about delivery 
    pickupLocations = models.TextField(null=True, blank=False) 
    createdAt = models.DateTimeField(auto_now_add=True)
    isSold = models.BooleanField(default=False, blank=False)
    soldAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isComplete = models.BooleanField(default=False, blank=False)
    completedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    image = models.ImageField(null=True, blank=True)


    def __str__(self):
        return self.name
    
class Review(models.Model):
    # (null=True) allows the database to store a NULL value for the field.
    # (blank=True) allows the field to be empty in a form or in the admin interface.
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='reviewer')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='reviewee')
    product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.CASCADE)
    is_from_buyer = models.BooleanField(default=True) # True if review is from buyer, False if from seller
    name = models.CharField(max_length=200)
    rating = models.IntegerField(null=True, blank=True, default=0)
    content = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

class Offer(models.Model):
    # (null=True) allows the database to store a NULL value for the field.
    # (blank=True) allows the field to be empty in a form or in the admin interface.
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='buyerOffer')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='sellerOffer')
    product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    isAccepted = models.BooleanField(default=False, blank=False)
    acceptedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isComplete = models.BooleanField(default=False, blank=False)
    completedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    isReviewedBuyer = models.BooleanField(default=False, blank=False)
    isReviewedSeller = models.BooleanField(default=False, blank=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

class Bookmark(models.Model):
    # (null=True) allows the database to store a NULL value for the field.
    # (blank=True) allows the field to be empty in a form or in the admin interface.
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="user")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, related_name="product")
    bookmarkedAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.bookmarkedAt)

# chat functionality
class Thread(models.Model):
    first_person = models.ForeignKey(User, on_delete=models.CASCADE, related_name='first_person', null=True, blank=True)
    second_person = models.ForeignKey(User, on_delete=models.CASCADE, related_name='second_person', null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('first_person', 'second_person')

class ChatMessage(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='chat_messages_thread', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_messages_user', null=True, blank=True)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):
    profilepic = models.ImageField(null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='sellerProfile')
    bio = models.TextField(null=True, blank=True)
    telegram = models.CharField(max_length=200, null=True)