# SC2006-PowerRangers
### Setting up repository

1. Go to a folder where you want the repository to be in
2. Clone the repository
`git clone https://github.com/natisaver/NTU-Marketplace.git`

### Setup virtual environment in project

In Windows CMD, ensure you are in the folder of your repository

1. Run `python –m venv myenv`
2. Run `myenv\Scripts\activate` 
3. Run `pip install -r requirements.txt`

## To run the backend server `localhost:8000/`
In Windows CMD, ensure you are in the root folder of your repository
1. Run `myenv\Scripts\activate` 
2. Run `cd backend` 
3. Run `python manage.py migrate` (if running for first time)
4. Run `python manage.py runserver`

## To run the frontend server `localhost:3000/`
In Windows CMD, ensure you are in the root folder of your repository
1. Run `cd frontend` 
2. Run `npm install` (if running for first time)
3. Run `npm start`

## To run unit testing
In Windows CMD, ensure you are in the root folder of your repository
1. Run `myenv\Scripts\activate` 
2. Run `cd backend` 
3. Run `python manage.py test`

## Do load testing using Locust
In Windows CMD, ensure you are in the backend folder of your repository
1. In console #1, run your local server using `python manage.py runserver`
2. In console #2, start locust server using `locust -f locustfile.py --host=http://localhost:5000`
3. Open web browser and go to `http://localhost:8089/`
4. Enter `number of users` and `hatch rate` (e.g. 100, 10)
5. Start load testing by clicking `Start swarming`
