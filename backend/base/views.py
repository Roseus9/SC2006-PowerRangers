from django.http import JsonResponse
from django.shortcuts import render

# django rest framework
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Product, User, Profile, Offer
# import the Serializers
from .serializer import ProductSerializer, UserSerializer, UserSerializerWithToken, UserProfilesSerializer, OfferSerializer

# JWT imports for customising tokens to return token information directly to front end
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# password hashing
from django.contrib.auth.hashers import make_password

# customising the token to return token information directly to front end
# serialising more information about the user
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # returns by default
        refresh = self.get_token(self.user)
        
        serializer = UserSerializerWithToken(self.user).data
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            # additional customised information we want to return to frontend
            '_id': serializer.get('_id'),
            'username': serializer.get('username'),
            'email': serializer.get('email'),
            'name': serializer.get('name'),
            'isAdmin': serializer.get('isAdmin'),
            'token': serializer.get('token')
        }

        return data

# original token view
# we are overriding the default token view with a new serializer class
class MyTokenObtainPairView (TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
            '/api/products/',
            '/api/products/create/',
            '/api/products/upload/',
            '/api/products/<id>/reviews/',
            '/api/products/top/',
            '/api/products/<id>/',
            '/api/products/delete/<id>/',
            '/api/products/<update>/<id>/',
            '/api/products/<id>/reviews/',
            '/api/products/<id>/reviews/<review_id>/',
            '/api/offer/product/<id>',
            '/api/offer/received/<username>',
            '/api/offer/sent/<username>',
            '/api/profile/<username>',
            '/api/users/profile/<user_id>',
            '/api/users/register',
            '/api/users/login',
            'api/users',
    ]

    return Response(routes)
    # return JsonResponse(routes, safe=False)

# The request.data attribute contains the data that was sent with the request. 
# In this case, we expect the request to include the user's name, email, username, password and tel
@api_view(['POST'])
def createUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
        )
        print("user created")
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

    try:
        profile = Profile.objects.create(
            user=user,
            telegram=data['telegram'],
        )
        print("profile created")
        # serialise the user model instance into a JSON-compatible representation
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Failed to create the user profile'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all() 
    serializer = UserSerializer(users, many=True) # many=True means that we have many products and we want to serialize them
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query) # get products model, currently not in json format
    serializer = ProductSerializer(products, many=True) # many=True means that we have many products and we want to serialize them
    return Response(serializer.data)
    # return Response(products)
    # return JsonResponse(products, safe=False)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk) # get products model, currently not in json format
    username = UserSerializerWithToken(product.seller).data.get('username')
    print(username)
    serializer = ProductSerializer(product, many=False) # many=False means that we have one product and we want to serialize it
    data = {**(serializer.data), **{'username': username} }
    return Response(data)
    # return Response(product)
    
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createProduct(request):
    data = request.data
    currUser = request.user
    try:
        product = Product.objects.create(
            seller=currUser,
            buyer=None,
            name=request.POST.get('name'),
            price=request.POST.get('price'),
            condition=True if request.POST.get('condition') == "true" else False,
            tags=request.POST.get('tags'),
            description=request.POST.get('description'),
            delivery=True if request.POST.get('delivery') == "true" else False,
            notes=request.POST.get('notes'),
            pickupLocations=request.POST.get('pickupLocations'),
            soldAt=None,
            completedAt=None,
            image=request.FILES.get('image')
        )
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except:
        return Response({'detail': 'Failed to create product'}, status = status.HTTP_400_BAD_REQUEST)


        
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateUserProfile(request, pk):
#     profile = Profile.objects.get(_id=pk)
#     # get back the user from the token
#     user = request.user
#     # use the serializer with token so we can get the additional token
#     serializer = UserSerializerWithToken(user, many=False)
#     # get the data from the request
#     data = request.data
#     # and then update the user
#     user.first_name=data['name']
#     user.username=data['username']
#     user.email=data['email']
#     profile.phone=data['phone']
#     profile.telegram=data['telegram']
#     #profile.picture=
#     # ensure password is not blank, then hash it
#     if data['password'] != '':
#         user.password=make_password(data['password'])
#     user.save()
#     return Response(serializer.data)

@api_view(['POST'])
def uploadImageUser(request):
    data = request.data
    user_id = data['user_id']
    profile = Profile.objects.get(_id=user_id)
    profile.image = request.FILES.get('image')
    profile.save()
    return Response('Image was uploaded')


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def createOffer(request, pk):
    data = request.data
    currUser = request.user
    product = Product.objects.get(_id=pk)
    offer = Offer.objects.create(
        buyer=currUser,        
        seller=product.seller,
        product= product,
        price=data['price'],
        isAccepted=False,
        acceptedAt=None,
        isComplete=False,
        completedAt=None,
    )
    # offer.save()
    serializer = OfferSerializer(offer, many=False)
    return Response(serializer.data)
# The request.user attribute contains the user object of the authenticated user, which is set by Django's authentication middleware. 
# If the user is not authenticated, request.user will be set to an instance of AnonymousUser.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request, id):
    requesteruser = request.user
    user = User.objects.get(_id=id) 
    # serialize the User object using the UserSerializer class
    # the many=False argument indicates that we are serializing a single User
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# Obtains a User Profile based on the username i.e. the slug from the url
@api_view(['GET'])
def UserProfileView(request, slug):
    # first find the user for the profile visited
    user = User.objects.get(username=slug) 
    # then find the profile model for the user
    try:
        profile = Profile.objects.get(user=user)
        serializedProfile = UserProfilesSerializer(profile, many=False).data

    except:
        message = {'detail': 'No such profile exists'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)
    
    # as well as the products that the user has created
    try:
        products = Product.objects.filter(seller=user)
        serializedProducts = ProductSerializer(products, many=True).data

    except:
        data = {
            'profile': serializedProfile,
            'products': "No products found",
            'user': UserSerializerWithToken(user, many=False).data
        }
        Response(data)
    
    data = {
        'profile': serializedProfile,
        'products': serializedProducts,
        'user': UserSerializerWithToken(user, many=False).data
    }

    return Response(data)


@api_view(['GET'])
def receivedOffers(request, slug):
    orderType = "newest"
    if "-" in slug:
        slug, orderType = slug.split("-")  
    # first find the seller
    user = User.objects.get(username=slug) 
    serializedUser = UserSerializerWithToken(user, many=False).data
    # get his offers
    try:
        if orderType == "highest":
            offer = Offer.objects.filter(seller=user, isAccepted=False).order_by('-price')
        elif orderType == "lowest":
            offer = Offer.objects.filter(seller=user, isAccepted=False).order_by('price')
        elif orderType == "oldest":
            offer = Offer.objects.filter(seller=user, isAccepted=False).order_by('createdAt')
        else:   
            offer = Offer.objects.filter(seller=user, isAccepted=False).order_by('-createdAt')
        serializedOffer = OfferSerializer(offer, many=True).data

    except:
        message = {'detail': 'No offers exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['product'] = ProductSerializer(Product.objects.get(_id=offer['product']), many=False).data

    except:
        message = {'detail': 'Cant find the product in the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
        # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['buyer'] = UserSerializer(User.objects.get(id=offer['buyer']), many=False).data

    except:
        message = {'detail': 'Cant find the buyer for the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    data = {
        'offers': serializedOffer,
        'user': serializedUser
    }

    return Response(data)


@api_view(['GET'])
def sentOffers(request, slug):
    orderType = "newest"
    if "-" in slug:
        slug, orderType = slug.split("-")

    # first find the buyer
    user = User.objects.get(username=slug) 
    serializedUser = UserSerializerWithToken(user, many=False).data
    # get his offers
    try:
        if orderType == "highest":
            offer = Offer.objects.filter(buyer=user, isAccepted=False).order_by('-price')
        elif orderType == "lowest":
            offer = Offer.objects.filter(buyer=user, isAccepted=False).order_by('price')
        elif orderType == "oldest":
            offer = Offer.objects.filter(buyer=user, isAccepted=False).order_by('createdAt')
        else:   
            offer = Offer.objects.filter(buyer=user, isAccepted=False).order_by('-createdAt')
        serializedOffer = OfferSerializer(offer, many=True).data

    except:
        message = {'detail': 'No offers exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['product'] = ProductSerializer(Product.objects.get(_id=offer['product']), many=False).data

    except:
        message = {'detail': 'Cant find the product in the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
        # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['seller'] = UserSerializer(User.objects.get(id=offer['seller']), many=False).data

    except:
        message = {'detail': 'Cant find the seller for the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    data = {
        'offers': serializedOffer,
        'user': serializedUser
    }

    return Response(data)



@api_view(['GET'])
def soldItems(request, slug):
    orderType = "newest"
    status = "all"
    if "-" in slug:
        slug, orderType, status = slug.split("-")

    # first find the seller
    user = User.objects.get(username=slug) 
    serializedUser = UserSerializerWithToken(user, many=False).data
    # get his offers
    try:
        if status == "complete":
            if orderType == "highest":
                offer = Offer.objects.filter(seller=user, isComplete=True).order_by('-price')
            elif orderType == "lowest":
                offer = Offer.objects.filter(seller=user, isComplete=True).order_by('price')
            elif orderType == "oldest":
                offer = Offer.objects.filter(seller=user, isComplete=True).order_by('createdAt')
            else:   
                offer = Offer.objects.filter(seller=user, isComplete=True).order_by('-createdAt')
        elif status == "accepted":
            if orderType == "highest":
                offer = Offer.objects.filter(seller=user, isAccepted=True, isComplete=False).order_by('-price')
            elif orderType == "lowest":
                offer = Offer.objects.filter(seller=user, isAccepted=True, isComplete=False).order_by('price')
            elif orderType == "oldest":
                offer = Offer.objects.filter(seller=user, isAccepted=True, isComplete=False).order_by('createdAt')
            else:   
                offer = Offer.objects.filter(seller=user, isAccepted=True, isComplete=False).order_by('-createdAt')
        else:
            if orderType == "highest":
                offer = Offer.objects.filter(seller=user, isAccepted=True).order_by('-price')
            elif orderType == "lowest":
                offer = Offer.objects.filter(seller=user, isAccepted=True).order_by('price')
            elif orderType == "oldest":
                offer = Offer.objects.filter(seller=user, isAccepted=True).order_by('createdAt')
            else:   
                offer = Offer.objects.filter(seller=user, isAccepted=True).order_by('-createdAt')

        serializedOffer = OfferSerializer(offer, many=True).data

    except:
        message = {'detail': 'No offers exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['product'] = ProductSerializer(Product.objects.get(_id=offer['product']), many=False).data

    except:
        message = {'detail': 'Cant find the product in the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
        # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['buyer'] = UserSerializer(User.objects.get(id=offer['buyer']), many=False).data

    except:
        message = {'detail': 'Cant find the buyer for the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    data = {
        'offers': serializedOffer,
        'user': serializedUser
    }

    return Response(data)


def boughtItems(request, slug):
    orderType = "newest"
    status = "all"
    if "-" in slug:
        slug, orderType, status = slug.split("-")

    # first find the buyer
    user = User.objects.get(username=slug) 
    serializedUser = UserSerializerWithToken(user, many=False).data
    # get his offers
    try:
        if status == "complete":
            if orderType == "highest":
                offer = Offer.objects.filter(buyer=user, isComplete=True).order_by('-price')
            elif orderType == "lowest":
                offer = Offer.objects.filter(buyer=user, isComplete=True).order_by('price')
            elif orderType == "oldest":
                offer = Offer.objects.filter(buyer=user, isComplete=True).order_by('createdAt')
            else:   
                offer = Offer.objects.filter(buyer=user, isComplete=True).order_by('-createdAt')
        elif status == "accepted":
            if orderType == "highest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('-price')
            elif orderType == "lowest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('price')
            elif orderType == "oldest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('createdAt')
            else:   
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('-createdAt')
        else:
            if orderType == "highest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True).order_by('-price')
            elif orderType == "lowest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True).order_by('price')
            elif orderType == "oldest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True).order_by('createdAt')
            else:   
                offer = Offer.objects.filter(buyer=user, isAccepted=True).order_by('-createdAt')

        serializedOffer = OfferSerializer(offer, many=True).data

    except:
        message = {'detail': 'No offers exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['product'] = ProductSerializer(Product.objects.get(_id=offer['product']), many=False).data

    except:
        message = {'detail': 'Cant find the product in the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
        # and get his products for these offers
    try:
        for offer in serializedOffer:
            offer['seller'] = UserSerializer(User.objects.get(id=offer['seller']), many=False).data

    except:
        message = {'detail': 'Cant find the seller for the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    data = {
        'offers': serializedOffer,
        'user': serializedUser
    }

    return Response(data)