# SC2006-NTU-Marketplace
## NTU Marketplace App
### System Architecture (Simple OVerview)
> ![Initial use-case model-sys arch Slides drawio (1)](https://user-images.githubusercontent.com/64686163/230790692-9ad2954e-116d-4d96-97aa-6ddfa2962521.png)

### Design Patterns:
- Singleton Pattern
> ![image](https://user-images.githubusercontent.com/64686163/230881654-b43111fc-d381-4c26-bc4b-939051215897.png)

- Provider Pattern
> ![image](https://user-images.githubusercontent.com/64686163/230881722-25cc5f86-3608-4d84-8491-fdef61bf7f08.png)

- Decorator Pattern
> ![image](https://user-images.githubusercontent.com/64686163/230881764-ffb57d0d-3ccb-4ee2-83cc-5be907ca5ec7.png)


### Testing:
- Black Box Testing
  - Boundary Value Testing (Price)
> ![image](https://user-images.githubusercontent.com/64686163/230881951-26eeecc1-6454-40af-b005-b1a330d13bb2.png)
> ![image](https://user-images.githubusercontent.com/64686163/230882010-5ae9c59c-22ed-440d-ae06-b179e53d4bb4.png)

- Equivalence Class Testing (Create User)
  - Set one column as invalid, and all columns as valid
  - Here the Listing Title is "Naproxen" which is a restricted item, preventing item creation
> ![image](https://user-images.githubusercontent.com/64686163/230882153-4b76f37e-4684-4d02-9404-6de2c5ab357f.png)

White Box Testing
- Basis Path Testing
  - Cyclomatic Complexity Value = Number of Decision Points + 1 = 3 + 1 = 4
> ![image](https://user-images.githubusercontent.com/64686163/230882301-27112973-5c41-43e4-98b8-5de9b4cc0f92.png)
> ![image](https://user-images.githubusercontent.com/64686163/230882339-e8b3ca4d-330b-4caa-9960-fd9f7dde69c4.png)

