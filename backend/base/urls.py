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
    # responding to offers
    path("offer/<str:oid>/<str:flag>", views.respondOffer, name="respond-offer"),
    # complete offer
    path("offer/complete/<str:id>/<str:flag>", views.completeOffer, name="complete-offer"),
    #deleting offers
    path("offerdelete/<str:oid>",views.deleteOffer, name="delete-offer" ),
    #get offer details 
    path("getoffer/<str:oid>", views.getOffer, name='get-offer'),
    #edit offer
    path("editoffer/<str:oid>", views.editOffer, name='edit-offer'),
    path('users', views.getUsers, name='users'),
    
    # this allows us to access by:
    # profile/123
    path('users/profile/<str:id>', views.getUserProfile, name='user-profile'),
    # profile/username
    path('profile/<str:slug>', views.UserProfileView),
    #get user info through id 
    path('userinfo/<str:uid>', views.getUserInfo, name='user-info'),
    # edit profile
    path('update/profile/<str:uid>', views.updateUserProfile, name='update-profile'),
    # Registering
    path('users/register', views.createUser, name='register-user'),  
    # logging in, using our customised MyTokenObtainPairView
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    #edit listing
    path('editproduct', views.editProduct, name='edit-product'),
    path('deleteproduct', views.deleteProduct, name='delete-product')
]