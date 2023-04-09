from django.http import JsonResponse
from django.shortcuts import render

# django rest framework
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from .models import Product, Review, User, Profile, Offer, Bookmark
# import the Serializers
from .serializer import ProductSerializer, ReviewSerializer, UserSerializer, UserSerializerWithToken, UserProfilesSerializer, OfferSerializer, BookmarkSerializer

# JWT imports for customising tokens to return token information directly to front end
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime 
# password hashing
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

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
            '/api/offer/<oid>/<flag>',
            '/api/offerdelete/<oid>',
            '/api/getoffer/<oid>',
            '/api/editoffer/<str:oid>',
            '/api/profile/<username>',
            '/api/checkbookmark/<pid>/<uid>'
            '/api/editproduct',
            '/api/deleteproduct',
            '/api/users/profile/<user_id>',
            '/api/users/register',
            '/api/users/login',
            'api/users',
            '/api/checkbookmark/<pid>/<uid>',
            '/api/changebookmark/<pid>/<uid>/<flag>',
            'api/findbookmarks/<pid>'
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
    query = request.query_params.get('keyword', '')
    tags = request.query_params.get('tags', '')

    if query and tags:
        products = Product.objects.filter(name__icontains=query, tags__icontains=tags)
    elif query: 
        products = Product.objects.filter(name__icontains=query)
    elif tags:
        products = Product.objects.filter(tags__icontains=tags)
    else:
        products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


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
        print(profile, "profile")
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def editProduct(request):
    p = Product.objects.get(_id=int(request.POST.get('pid')))
    print(request.data)
    p.name=request.POST.get('name')
    p.price=float(request.POST.get('price'))
    p.condition=True if request.POST.get('condition') == "true" else False
    p.tags=request.POST.get('tags')
    p.description=request.POST.get('description')
    p.delivery=True if request.POST.get('delivery') == "true" else False
    p.notes=request.POST.get('notes')
    p.pickupLocations=request.POST.get('pickupLocations')
    print("image", request.FILES.get('image'))
    if (request.FILES.get('image') != None): 
        print("pass condition")
        p.image = request.FILES.get('image')
    print(request.data)
    p.save()
    serializer = ProductSerializer(p, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteProduct(request):
    p = Product.objects.get(_id=request.data)
    p.delete()
    return Response({'message': 'deleted sucessfully'})

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

@api_view(['PUT'])
#@permission_classes([IsAuthenticated])
def respondOffer(request, oid, flag):
    o = Offer.objects.get(_id=oid)
    #flag = True means the seller has accepted the offer. 
    if flag == 'true' or flag == 'True':
        o.isAccepted = True
        o.acceptedAt = datetime.now()
        o.save()
        serializer = OfferSerializer(o, many=False)
        return Response(serializer.data)
    else: 
        #delete offer
        o.delete()
        return Response({'message': 'declined successfully'})

@api_view(['PUT'])
def deleteOffer(request, oid):
    o = Offer.objects.get(_id=oid)
    o.delete()
    return Response({'message': 'deleted successfully'})

@api_view(['GET'])
def getOffer(request, oid):
    try:
        print("oid", oid, type(oid))
        o = Offer.objects.get(_id=int(oid))
        serializer = OfferSerializer(o, many=False)
        return Response(serializer.data)
    except: 
        message = {'detail': 'Offer does not exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def editOffer(request, oid):
    try: 
        o = Offer.objects.get(_id=oid)
        o.price = request.data['price']
        o.createdAt = datetime.now()
        o.save()
        serializer = OfferSerializer(o, many=False)
        return Response(serializer.data)
    except: 
        message = {'detail': 'Offer does not exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
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
        if status == "completed":
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
            buyerID = offer['buyer']
            offer['buyer'] = UserSerializer(User.objects.get(id=buyerID), many=False).data
            offer['profile'] = UserProfilesSerializer(Profile.objects.get(user=buyerID)).data

    except:
        message = {'detail': 'Cant find the buyer for the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    data = {
        'offers': serializedOffer,
        'user': serializedUser
    }

    return Response(data)


@api_view(['GET'])
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
        if status == "completed":
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
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('-pric')
            elif orderType == "lowest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('price')
            elif orderType == "oldest":
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('creatdAt')
            else:   
                offer = Offer.objects.filter(buyer=user, isAccepted=True, isComplete=False).order_by('-creaedAt')
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
            sellerID = offer['seller']
            offer['seller'] = UserSerializer(User.objects.get(id=sellerID), many=False).data
            offer['profile'] = UserProfilesSerializer(Profile.objects.get(user=sellerID)).data


    except:
        message = {'detail': 'Cant find the seller for the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    data = {
        'offers': serializedOffer,
        'user': serializedUser
    }

    return Response(data)

@api_view(['GET'])
def checkBookmark(request, pid, uid):
    try:
        user = User.objects.get(id=uid)
        product = Product.objects.get(_id=pid)
        b = Bookmark.objects.get(user=user, product=product)
        message = {'flag': True}
        
    except: 
        message = {'flag': False}
    return Response(message)
    
@api_view(['POST'])
def changeBookmark(request, pid, uid, flag):
    user = User.objects.get(id=uid)
    product = Product.objects.get(_id=pid)
    if (flag == "false" or flag == "False" or flag == False):
        b = Bookmark.objects.create(
            user=user, 
            product=product
        )
        message = {'newFlag': True}
    else: 
        b = Bookmark.objects.get(user=user, product=product)
        b.delete()
        message = {'newFlag': False}
    return Response(message)

@api_view(['GET'])
def findBookmarks(request, pid):
    product = Product.objects.get(_id=pid)
    count = Bookmark.objects.filter(product=product).count()
    message = {'count': count}
    return Response(message)

@api_view(['GET'])
def findUserBookmarks(request, uid):
    try:
        u = User.objects.get(id=uid)
        bookmarks = Bookmark.objects.filter(user=u)
        products = [bookmark.product for bookmark in bookmarks]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except: 
        message = {'detail': 'no bookmarked listings!'}
        return Response(message)
    

@api_view(['PUT'])
def completeOffer(request, id, flag):
    o = Offer.objects.get(_id=id)
    #   if flag, complete the offer
    #   also cascade delete on all other offers for the same product
    if flag.lower() == 'true':
        o.isComplete = True
        o.completedAt = datetime.now()
        o.save()
        serializer = OfferSerializer(o, many=False)
        # update the field in the product
        p = o.product
        p.isComplete = True
        p.completedAt = datetime.now()
        p.save()

        # delete all other offers for the same product
        Offer.objects.filter(product=o.product).exclude(_id=id).delete()
        
        return Response(serializer.data)

    else: 
        #   delete offer
        o.delete()
        return Response({'message': 'declined successfully'})

@api_view(['POST'])
def makeReview(request, oid, id, flag):
    data = request.data
    print(data)
    # get buyer and seller
    try:
        buyer = User.objects.get(id=data.get('buyer'))
        seller = User.objects.get(id=data.get('seller'))
    except:
        message = {'detail': 'Cant find the buyer or seller'}
        print(message)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    # get product
    try:
        product = Product.objects.get(_id=data.get('product'))
    except:
        message = {'detail': 'Cant find the product'}
        print(message)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    # get offer
    try:
        print("=======", oid)
        offer = Offer.objects.get(_id=oid)
        print(offer)
        if flag.lower() == "true":
            offer.isReviewedBuyer = True
        else:
            print("isreviewseller")
            offer.isReviewedSeller = True
        offer.save()
    except:
        message = {'detail': 'Cant find the offer'}
        print(message)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    try:
        review = Review.objects.create(
            buyer=buyer,
            seller=seller,
            rating=int(data.get('rating')),
            content=data.get('content'),
            product=product,
            is_from_buyer=True if flag.lower() == "true" else False,
        )
        serializer = ReviewSerializer(review, many=False)
        print("CREATED REVIEW", serializer)
        return Response(serializer.data)
    except ValidationError as e:
        message = {'detail': str(e)}
        print(message)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Review create failed'}
        print(message)
        return Response(message, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getReview(request, id, flag):
    # if flag is true, then the user is a buyer
    # else, the user is a seller
    # id is the user
    try:
        reviewBuyer = Review.objects.filter(buyer=id, is_from_buyer=False)
        serializedReviewBuyer = ReviewSerializer(reviewBuyer, many=True).data
        print(serializedReviewBuyer)
        reviewSeller = Review.objects.filter(seller=id, is_from_buyer=True)
        serializedReviewSeller = ReviewSerializer(reviewSeller, many=True).data
        print(serializedReviewSeller)
    except:
        message = {'detail': 'No such reviews exist'}
        print(message)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        totalrating = []
        if len(serializedReviewBuyer) > 0:
            for review in serializedReviewBuyer:
                review['product'] = ProductSerializer(Product.objects.get(_id=review['product']), many=False).data
                review['buyer'] = UserSerializerWithToken(User.objects.get(id=review['buyer']), many=False).data
                review['seller'] = UserSerializerWithToken(User.objects.get(id=review['seller']), many=False).data
                totalrating.append(int(review['rating']))
        if len(serializedReviewSeller) > 0:
            for review in serializedReviewSeller:
                review['product'] = ProductSerializer(Product.objects.get(_id=review['product']), many=False).data
                review['buyer'] = UserSerializerWithToken(User.objects.get(id=review['buyer']), many=False).data
                review['seller'] = UserSerializerWithToken(User.objects.get(id=review['seller']), many=False).data
                totalrating.append(int(review['rating']))
        if len(totalrating) > 0:
            average = sum(totalrating)/len(totalrating)

        else:
            average = 0


    except:
        message = {'detail': 'Cant find the product/buyer/seller in the review'}
        print(message)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    data = {
        'buyerReviews': serializedReviewBuyer,
        'sellerReviews': serializedReviewSeller,
        'totalrating': str(average),
        'raters': str(len(totalrating)),
    }
    return Response(data)


    

@api_view(['GET'])
def getComplete(request, id):
    # first find the offer
    try:
        offer = Offer.objects.get(_id=id)
        serializedOffer = OfferSerializer(offer, many=False).data
    except:
        message = {'detail': 'No such offer exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # the buyer and seller
    try:
        buyer = User.objects.get(id=serializedOffer['buyer'])
        seller = User.objects.get(id=serializedOffer['seller'])
        serializedOffer['buyer'] = UserSerializerWithToken(buyer, many=False).data
        serializedOffer['seller'] = UserSerializerWithToken(seller, many=False).data
    except:
        message = {'detail': 'No such buyer/seller exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # and get the product for this offers
    try:
        serializedOffer['product'] = ProductSerializer(Product.objects.get(_id=serializedOffer['product']), many=False).data

    except:
        message = {'detail': 'Cant find the product in the offer'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
    data = {
        'offer': serializedOffer,
    }

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request, uid):
    #request.user gives userID

    form = request.data
    print("form", form, uid)

    tele = request.POST.get('telegramHandle')
    bio = request.POST.get('bio')
    name = request.POST.get('name')
    username = request.POST.get('username')
    email = request.POST.get('email')
    password = request.POST.get('password')
    image = request.FILES.get('image')
    print(image)
    u = User.objects.get(id=uid)
    p = Profile.objects.get(user=u)
    p.telegram = tele
    p.bio = bio
    if (image):
        p.profilepic = image
    u.first_name = name
    u.username = username
    u.email = email
    if (len(password) > 0):
        u.password = make_password(password)
    p.save()
    u.save()
    serializer = UserSerializerWithToken(u, many=False)
    return Response(serializer.data)
    # print("image", request.FILES.get('image'))
    # if (request.FILES.get('image') != None): 
    #     print("pass condition")
    #     profile.image = request.FILES.get('image')
    # profile.telegramHandle = request.POST.get(('telegramHandle'))
    # profile.bio = request.POST.get(('bio'))
    # user.first_name = request.POST.get(('name'))
    # user.username = request.POST.get(('username'))
    # user.email = request.POST.get(('email'))
    # if (request.POST.get(('password'))) != '':
    #     user.password = make_password(request.POST.get(('password')))
    
    # profile.save()
    # user.save()
    
@api_view(['GET'])
def getUserInfo(request, uid):
    u = User.objects.get(id=uid)
    serializer = UserSerializerWithToken(u, many=False)
    return Response(serializer.data)
    
    

