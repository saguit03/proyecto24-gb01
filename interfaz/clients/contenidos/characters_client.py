from flask import request, render_template, redirect, url_for
from types import SimpleNamespace
import os
import requests

class CharactersClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}characters"
    
    @staticmethod
    def render_update_character(id_character):
        character_data = CharactersClient.get_character_by_id(id_character=id_character)
        if character_data and len(character_data) > 0:
            character_dict = character_data[0]
            character = SimpleNamespace(**character_dict)
            return render_template('update_character.html', character=character)
        else:
            return redirect(url_for('characters'))
        
    @staticmethod
    def render_characters():
        return render_template('characters.html')
        

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
        if response.status_code == 200:
            return render_template('characters.html', characters=response.json())
        else:
            return redirect(url_for('chapters'))

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
