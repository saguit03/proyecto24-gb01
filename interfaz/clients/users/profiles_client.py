from flask import request
import json
import requests
import os


class ProfilesClient:
    BASE_URL =  f"{os.getenv('USUARIOS_URL')}profiles"

    @staticmethod
    def get_profile(idprofile):
        url = f'{ProfilesClient.BASE_URL}/{idprofile} -H "Accept: application/json", "Content-Type": "application/json"'
        response = requests.get(url)
        return ProfilesClient.handle_response(response)

    @staticmethod
    def add_profile():
        url = f'{ProfilesClient.BASE_URL}'
        form_data = request.form.to_dict()
        response = requests.post(url, 
                                 headers={"Accept": "application/json", "Content-Type": "application/json" }, 
                                 data=json.dumps(form_data))
        return ProfilesClient.handle_response(response)
    
    @staticmethod
    def put_profile(id_profile):
        form_data = request.form.to_dict()
        url = f"{ProfilesClient.BASE_URL}/{id_profile}"
        response = requests.put(url, 
                                 headers={"Accept": "application/json", "Content-Type": "application/json" }, 
                                 data=json.dumps(form_data))
        return ProfilesClient.handle_response(response)
    
    @staticmethod
    def delete_profile(id_profile):
        url = f"{ProfilesClient.BASE_URL}/{id_profile}"
        response = requests.delete(url)
        return ProfilesClient.handle_response(response)
    
    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
