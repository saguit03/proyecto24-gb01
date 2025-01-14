from flask import request, redirect, url_for, render_template, session
import json
import requests
import os

class FavoritesClient:
    BASE_URL = f"{os.getenv('USUARIOS_URL')}favorites"

    headers = {"Accept: application/json", "Content-Type: application/json"}

    @staticmethod
    def handle_response(response):
        if response.status_code in {200, 201}:  # Agregado para cubrir el caso de creación exitosa
            return response.json()
        else:
            response.raise_for_status()

    @staticmethod
    def get_favorite(idfavorite):
        url = f"{FavoritesClient.BASE_URL}/{idfavorite}"
        response = requests.get(url, headers=FavoritesClient.headers)
        return FavoritesClient.handle_response(response)

    @staticmethod
    def add_favorite():
        form_data = request.form.to_dict()
        response = requests.post(FavoritesClient.BASE_URL, data=form_data)
        return FavoritesClient.handle_response(response)

    @staticmethod
    def delete_favorite(idfavorite):
        url = f"{FavoritesClient.BASE_URL}/{idfavorite}"
        response = requests.delete(url)
        return FavoritesClient.handle_response(response)

    @staticmethod
    def get_all_favorites():
        url = FavoritesClient.BASE_URL
        response = requests.get(url, headers=FavoritesClient.headers)
        return FavoritesClient.handle_response(response)
    
    
    @staticmethod
    def get_all_favorites_by_user(iduser):
        url = f"{FavoritesClient.BASE_URL}/{iduser}"
        response = requests.get(url, headers=FavoritesClient.headers)
        return FavoritesClient.handle_response(response)

