from locust import HttpUser, between, task

class MyUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_user_info(self):
        user_id = 1 # or any other valid user id
        self.client.get(f'/api/userinfo/{user_id}')