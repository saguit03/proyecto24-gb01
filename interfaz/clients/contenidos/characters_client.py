from flask import request
import os
import requests

class CharactersClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}characters"

    @staticmethod
    def add_character():
        form_data = request.form.to_dict()
        response = requests.post(CharactersClient.BASE_URL, data=form_data)
        return CharactersClient.handle_response(response)

    @staticmethod
    def delete_character_form():
        id_character = request.form.get('id_character')
        url = f"{CharactersClient.BASE_URL}/{id_character}"
        response = requests.delete(url)
        return CharactersClient.handle_response(response)

    @staticmethod
    def delete_character(id_character):
        url = f"{CharactersClient.BASE_URL}/{id_character}"
        response = requests.delete(url)
        return CharactersClient.handle_response(response)

    @staticmethod
    def put_character_form():
        form_data = request.form.to_dict()
        url = f"{CharactersClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return CharactersClient.handle_response(response)

    @staticmethod
    def put_character(id_character):
        form_data = request.form.to_dict()
        url = f"{CharactersClient.BASE_URL}/{id_character}"
        response = requests.put(url, data=form_data)
        return CharactersClient.handle_response(response)

    @staticmethod
    def get_character_by_id(id_character):
        url = f"{CharactersClient.BASE_URL}/{id_character}"
        response = requests.get(url)
        return CharactersClient.handle_response(response)
    
    @staticmethod
    def get_character_by_name():
        params = {'name': request.args.get('name')}
        url = f"{CharactersClient.BASE_URL}/name"
        response = requests.get(url, params=params)
        return CharactersClient.handle_response(response)
    
    @staticmethod
    def get_character_by_age():
        params = {'age': request.args.get('age')}
        url = f"{CharactersClient.BASE_URL}/age"
        response = requests.get(url, params=params)
        return CharactersClient.handle_response(response)

    @staticmethod
    def get_all_characters():
        url = f"{CharactersClient.BASE_URL}/all"
        response = requests.get(url)
        return CharactersClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
