from . import views
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    # this means that:
    # if we go to /api, we will call the getRoutes function from views.py
    # if we go to /api/products, we will call the getProducts function from views.py
    path("", views.getRoutes, name="routes"),
    path("products", views.getProducts, name="products"),
    path("products/<str:pk>", views.getProduct, name="product"),
    path("users/upload", views.uploadImageUser, name="upload-image-user"),
    path("create", views.createProduct, name="create-product"),
    path('users', views.getUsers, name='users'),

    # offers
    path("offer/product/<str:pk>", views.createOffer, name="offer"),
    # received offers and sent offers
    path("offer/received/<str:slug>", views.receivedOffers, name="received-offers"),
    path("offer/sent/<str:slug>", views.sentOffers, name="sent-offers"),
    # sold and bought items
    path("offer/bought/<str:slug>", views.boughtItems, name="received-offers"),
    path("offer/sold/<str:slug>", views.soldItems, name="sent-offers"),
    path('users', views.getUsers, name='users'),
    
    
    # this allows us to access by:
    # profile/123
    path('users/profile/<str:id>', views.getUserProfile, name='user-profile'),
    # profile/username
    path('profile/<str:slug>', views.UserProfileView),

    # Registering
    path('users/register', views.createUser, name='register-user'),  
    # logging in, using our customised MyTokenObtainPairView
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair')
]   