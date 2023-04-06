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
    path("offer/product/<str:pk>", views.createOffer, name = "offer"),
    path('users', views.getUsers, name='users'),
    
    # this allows us to access by:
    # profile/123
    path('users/profile/<str:id>', views.getUserProfile, name='user-profile'),
    # profile/username
    path('profile/<str:slug>', views.UserProfileView),

    # Registering
    path('users/register', views.createUser, name='register-user'),  
    # logging in, using our customised MyTokenObtainPairView
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    #edit listing
    path('editproduct', views.editProduct, name='edit-product')
]   