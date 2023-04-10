# SC2006-NTU-Marketplace
## NTU Marketplace App
One stop platform for convenient and efficient way for individuals to trade goods, promoting sustainability by extending the lifespan of goods


### System Architecture (Simple Overview)
Utilises Django Rest Framework for the Backend, and React, Redux (state managment) for Frontend.
- As requests pour in, they are routed by django through specific API routes. Data is queried from the database and represented using the Django model entities, before being repackaged by serializers into a readable format such as JSON for processing. The view acts as an interface between the front and backend.

- In React, these screens/components are able to call CRUD operations by calling various actions that then interact with our API using axios. Depending on the results, different actions are dispatched, resulting in different global states. These states are kept in the store, which can be accessed by future screens and components. We often use an action creator of {type: RESET} to clear state after an execution of specific actions, to ensure "loading" and "success" are returned to False.

> ![Initial use-case model-sys arch Slides drawio (1)](https://user-images.githubusercontent.com/64686163/230790692-9ad2954e-116d-4d96-97aa-6ddfa2962521.png)

### Design Patterns:
#### Singleton Pattern
Used in our Redux State Tree.
Restricts the instantiation of a class to a singular instance and also provides easy access to that instance (UseSelector).
> ![image](https://user-images.githubusercontent.com/64686163/230888895-2b698a84-1cd5-4d01-b160-166b347e1a77.png)

#### Provider Pattern
With the Provider Pattern, we can make data available to multiple components. Rather than passing that data down each layer through props (prop drilling), we can wrap all components in a Provider. This ensures Loose Coupling, where state data is independent of the components.
> ![image](https://user-images.githubusercontent.com/64686163/230885355-6a7ce5e4-c1cf-4056-974f-a47b22d3c03b.png)

#### Decorator Pattern
Added decorators, adds new functionality to API View class without modifying its original structure. Here this ensures only post requests are allowed, and the user must be authenticated.
```
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
```


### Black Box Testing:
#### Boundary Value Testing (Price)
| Lower Boundary         | **_-0.01_** | 0.00    | 1.00           |
|------------------------|-------------|---------|----------------|
| Upper Boundary         | 9999.98     | 9999.99 | **_10000.00_** |

- Price range valid equivalence class: **($0.00 <= x <= $9999.99)**
- Valid boundary values: {0.00, 9999.99}
- Invalid boundary values: {-0.01, 10000.00}
> ![image](https://user-images.githubusercontent.com/64686163/230882010-5ae9c59c-22ed-440d-ae06-b179e53d4bb4.png)

#### Equivalence Class Testing (Create User)
Set one column as invalid, and all columns as valid for each test case
- Here the Listing Title is "Naproxen" which is a restricted item, preventing item creation
> ![image](https://user-images.githubusercontent.com/64686163/230886771-fd5e41f1-ab8c-4797-b385-2e7bfde7713d.png)

### White Box Testing
####  Basis Path Testing
Cyclomatic Complexity Value = Number of Decision Points + 1 = 3 + 1 = 4
- Generate 4 Test Cases to ensure coverage of the process.
- The following is the make offer process:
> ![image](https://user-images.githubusercontent.com/64686163/230882301-27112973-5c41-43e4-98b8-5de9b4cc0f92.png)
> ![image](https://user-images.githubusercontent.com/64686163/230882339-e8b3ca4d-330b-4caa-9960-fd9f7dde69c4.png)

#### Load Testing
Using Locust with the following parameters:

| Param         | Value                  |
|---------------|------------------------|
| Users         | 1000                   |
| Hatch Rate    | 10 requests per second |
| Wait          | 1 to 5                 |


- This was tested on our get userInfo route, which retrieves user details if they are logged in:
```
from locust import HttpUser, between, task

class MyUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_user_info(self):
        user_id = 1 # or any other valid user id
        self.client.get(f'/api/userinfo/{user_id}')
```

- Results:

| Param         | Value                  |
|---------------|------------------------|
| **Final RPS** | **154.2 (0% Failures)** |

> ![image](https://user-images.githubusercontent.com/64686163/230887659-94bf6319-fa2c-4657-9c48-5c5851e292d7.png)

