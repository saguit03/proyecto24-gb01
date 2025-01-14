import requests
import os
from flask import request, jsonify, json

class ContenidosClient:
    BASE_URL = os.getenv('CONTENIDOS_URL')

    @staticmethod
    def get_movie(id_movie):
        url = f"{ContenidosClient.BASE_URL}movies/{id_movie}"
        response = requests.get(url)
        return ContenidosClient.handle_response(response)

    @staticmethod
    def get_category(id_category):
        url = f"{ContenidosClient.BASE_URL}categories/{id_category}"
        response = requests.get(url)
        return ContenidosClient.handle_response(response)

    @staticmethod
    def get_series(id_series):
        url = f"{ContenidosClient.BASE_URL}series/{id_series}"
        response = requests.get(url)
        return ContenidosClient.handle_response(response)

    @staticmethod
    def get_season(id_season):
        url = f"{ContenidosClient.BASE_URL}seasons/{id_season}"
        response = requests.get(url)
        return ContenidosClient.handle_response(response)
    
    @staticmethod
    def get_chapter(id_chapter):
        url = f"{ContenidosClient.BASE_URL}chapters/{id_chapter}"
        response = requests.get(url)
        return ContenidosClient.handle_response(response)
    
    @staticmethod
    def get_trailer(id_trailer):
        url = f"{ContenidosClient.BASE_URL}trailers/{id_trailer}"
        response = requests.get(url)
        return ContenidosClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

    @staticmethod
    def get_url(id_content: int, content_type:int):
        if content_type == 1:
            return f"{ContenidosClient.BASE_URL}movies/{id_content}"
        elif content_type == 2:
            return f"{ContenidosClient.BASE_URL}series/{id_content}"
        elif content_type == 3:
            return f"{ContenidosClient.BASE_URL}series/{id_content}"
        elif content_type == 4:
            return f"{ContenidosClient.BASE_URL}categories/{id_content}"
        elif content_type == 5:
            return f"{ContenidosClient.BASE_URL}trailers/{id_content}"
        elif content_type == 6:
            return f"{ContenidosClient.BASE_URL}chapters/{id_content}"
        else:
            return f"{ContenidosClient.BASE_URL}movies/{id_content}"

    @staticmethod
    def check_content_exists(id_content: int, content_type:int):
        found = False
        url = ContenidosClient.get_url(id_content, content_type)
        print(f"GET CONTENT: Generated URL: {url}")
        
        response = requests.get(url)
        if response.status_code == 200:
            found = True

        return found
    
    
    @staticmethod
    def get_content(id_content: int, content_type:int):
        url = ContenidosClient.get_url(id_content, content_type)
        print(f"GET CONTENT: Generated URL: {url}")

        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None
