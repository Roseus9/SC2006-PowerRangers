from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404



# django rest framework
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Product, User, Profile, Offer, Bookmark
# import the Serializers
from .serializer import BookmarkSerializer, ProductSerializer, UserSerializer, UserSerializerWithToken, UserProfilesSerializer, OfferSerializer

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
            '/api/profile/<username>',
            '/api/bookmark/<productId>',
    ]

    return Response(routes)
    # return JsonResponse(routes, safe=False)

class BookmarkView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk=None):
        if pk:
            bookmark = get_object_or_404(Bookmark, pk=pk)
            serializer = BookmarkSerializer(bookmark)
            return Response(serializer.data)
        else:
            bookmarks = Bookmark.objects.filter(user=request.user)
            serializer = BookmarkSerializer(bookmarks, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = BookmarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        bookmark = get_object_or_404(Bookmark, pk=pk, user=request.user)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
    products = Product.objects.all() # get products model, currently not in json format
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
        return(
            {
                'profile': serializedProfile,
                'products': "No products found",
                'user': UserSerializerWithToken(user, many=False).data
            }
        )
    
    data = {
        'profile': serializedProfile,
        'products': serializedProducts,
        'user': UserSerializerWithToken(user, many=False).data
    }

    return Response(data)

@api_view(['POST'])
def addBookmark(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)

    # Check if a bookmark already exists for this user and product
    if Bookmark.objects.filter(user=user, product=product).exists():
        return Response({'message': 'Bookmark already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new bookmark for the user and product
    bookmark = Bookmark.objects.create(user=user, product=product, isBookmarked=True)

    # Serialize the bookmark and return it in the response
    serializer = BookmarkSerializer(bookmark, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def removeBookmark(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)

    # Check if a bookmark exists for this user and product
    try:
        bookmark = Bookmark.objects.get(user=user, product=product)
    except Bookmark.DoesNotExist:
        return Response({'message': 'Bookmark does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    # Delete the bookmark
    bookmark.delete()

    return Response({'message': 'Bookmark removed successfully'}, status=status.HTTP_200_OK)
