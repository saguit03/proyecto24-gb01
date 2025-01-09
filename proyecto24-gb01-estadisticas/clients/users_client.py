import requests
import os


class UserClient:
    BASE_URL = os.getenv('USUARIOS_URL')

    @staticmethod
    def get_user(iduser):
        url = f'{UserClient.BASE_URL}/users/{iduser} -H "Accept: application/json"'
        response = requests.get(url)
        return UserClient.handle_response(response)

    @staticmethod
    def get_profile(idprofile):
        url = f'{UserClient.BASE_URL}/profiles/{idprofile} -H "Accept: application/json"'
        response = requests.get(url)
        return UserClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
