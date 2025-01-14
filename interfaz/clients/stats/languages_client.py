from flask import request
import os
import requests

class LanguagesClient:
    BASE_URL =  f"{os.getenv('ESTADISTICAS_URL')}languages"

    @staticmethod
    def add_language():
        form_data = request.form.to_dict()
        response = requests.post(LanguagesClient.BASE_URL, data=form_data)
        return LanguagesClient.handle_response(response)

    @staticmethod
    def delete_language_form():
        id_language = request.form.get('id_language')
        url = f"{LanguagesClient.BASE_URL}/{id_language}"
        response = requests.delete(url)
        return LanguagesClient.handle_response(response)

    @staticmethod
    def delete_language(id_language):
        url = f"{LanguagesClient.BASE_URL}/{id_language}"
        response = requests.delete(url)
        return LanguagesClient.handle_response(response)

    @staticmethod
    def put_language_form():
        form_data = request.form.to_dict()
        url = f"{LanguagesClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return LanguagesClient.handle_response(response)

    @staticmethod
    def put_language(id_language):
        form_data = request.form.to_dict()
        url = f"{LanguagesClient.BASE_URL}/{id_language}"
        response = requests.put(url, data=form_data)
        return LanguagesClient.handle_response(response)

    @staticmethod
    def get_language_by_id(id_language):
        url = f"{LanguagesClient.BASE_URL}/{id_language}"
        response = requests.get(url)
        return LanguagesClient.handle_response(response)

    @staticmethod
    def get_language_by_name():
        url = f"{LanguagesClient.BASE_URL}/name"
        response = requests.get(url)
        return LanguagesClient.handle_response(response)
    
    @staticmethod
    def get_all_languages():
        url = f"{LanguagesClient.BASE_URL}/all"
        response = requests.get(url)
        return LanguagesClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
