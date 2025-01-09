from flask import request
import os
import requests

class CategoriesClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}categories"

    @staticmethod
    def add_category():
        form_data = request.form.to_dict()
        response = requests.post(CategoriesClient.BASE_URL, data=form_data)
        return CategoriesClient.handle_response(response)

    @staticmethod
    def get_category_by_id(id_category):
        url = f"{CategoriesClient.BASE_URL}/{id_category}"
        response = requests.get(url)
        return CategoriesClient.handle_response(response)

    @staticmethod
    def get_all_categories():
        url = f"{CategoriesClient.BASE_URL}/all"
        response = requests.get(url)
        return CategoriesClient.handle_response(response)
    
    @staticmethod
    def get_content_by_category(id_category):
        url = f"{CategoriesClient.BASE_URL}/{id_category}/content"
        response = requests.get(url)
        return CategoriesClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
