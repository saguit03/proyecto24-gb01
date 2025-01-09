from flask import request
import os
import requests

class TrailersClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}trailers"

    @staticmethod
    def add_trailer():
        form_data = request.form.to_dict()
        response = requests.post(TrailersClient.BASE_URL, data=form_data)
        return TrailersClient.handle_response(response)

    @staticmethod
    def delete_trailer_form():
        id_trailer = request.form.get('id_trailer')
        url = f"{TrailersClient.BASE_URL}/{id_trailer}"
        response = requests.delete(url)
        return TrailersClient.handle_response(response)

    @staticmethod
    def delete_trailer(id_trailer):
        url = f"{TrailersClient.BASE_URL}/{id_trailer}"
        response = requests.delete(url)
        return TrailersClient.handle_response(response)

    @staticmethod
    def put_trailer_form():
        form_data = request.form.to_dict()
        url = f"{TrailersClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return TrailersClient.handle_response(response)

    @staticmethod
    def put_trailer(id_trailer):
        form_data = request.form.to_dict()
        url = f"{TrailersClient.BASE_URL}/{id_trailer}"
        response = requests.put(url, data=form_data)
        return TrailersClient.handle_response(response)

    @staticmethod
    def get_trailer_by_id(id_trailer):
        url = f"{TrailersClient.BASE_URL}/{id_trailer}"
        response = requests.get(url)
        return TrailersClient.handle_response(response)

    @staticmethod
    def get_all_trailers():
        url = f"{TrailersClient.BASE_URL}/all"
        response = requests.get(url)
        return TrailersClient.handle_response(response)

    @staticmethod
    def put_category_into_trailer(id_trailer):
        form_data = request.form.to_dict()
        url = f"{TrailersClient.BASE_URL}/{id_trailer}/categories"
        response = requests.put(url, data=form_data)
        return TrailersClient.handle_response(response)

    @staticmethod
    def delete_category_from_trailer(id_trailer):
        form_data = request.form.to_dict()
        url = f"{TrailersClient.BASE_URL}/{id_trailer}/categories"
        response = requests.delete(url, data=form_data)
        return TrailersClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
