from flask import request
import os
import requests

class SeriesClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}series"

    @staticmethod
    def add_series():
        form_data = request.form.to_dict()
        response = requests.post(SeriesClient.BASE_URL, data=form_data)
        return SeriesClient.handle_response(response)

    @staticmethod
    def delete_series_form():
        id_series = request.form.get('id_series')
        url = f"{SeriesClient.BASE_URL}/{id_series}"
        response = requests.delete(url)
        return SeriesClient.handle_response(response)

    @staticmethod
    def delete_series(id_series):
        url = f"{SeriesClient.BASE_URL}/{id_series}"
        response = requests.delete(url)
        return SeriesClient.handle_response(response)

    @staticmethod
    def put_series_form():
        form_data = request.form.to_dict()
        url = f"{SeriesClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return SeriesClient.handle_response(response)

    @staticmethod
    def put_series(id_series):
        form_data = request.form.to_dict()
        url = f"{SeriesClient.BASE_URL}/{id_series}"
        response = requests.put(url, data=form_data)
        return SeriesClient.handle_response(response)

    @staticmethod
    def get_series_by_id(id_series):
        url = f"{SeriesClient.BASE_URL}/{id_series}"
        response = requests.get(url)
        return SeriesClient.handle_response(response)

    @staticmethod
    def get_all_series():
        url = f"{SeriesClient.BASE_URL}/all"
        response = requests.get(url)
        return SeriesClient.handle_response(response)

    @staticmethod
    def get_series_by_title():
        url = f"{SeriesClient.BASE_URL}/title"
        params = {'title': request.args.get('title')}
        response = requests.get(url, params=params)
        return SeriesClient.handle_response(response)

    @staticmethod
    def put_trailer_into_series(id_series):
        form_data = request.form.to_dict()
        url = f"{SeriesClient.BASE_URL}/{id_series}/trailer"
        response = requests.put(url, data=form_data)
        return SeriesClient.handle_response(response)

    @staticmethod
    def delete_trailer_from_series(id_series):
        url = f"{SeriesClient.BASE_URL}/{id_series}/trailer"
        response = requests.delete(url)
        return SeriesClient.handle_response(response)
    
    @staticmethod
    def get_series_chapters(id_series):
        url = f"{SeriesClient.BASE_URL}/{id_series}/chapters"
        response = requests.get(url)
        return SeriesClient.handle_response(response)
    
    @staticmethod
    def get_series_characters(id_series):
        url = f"{SeriesClient.BASE_URL}/{id_series}/characters"
        response = requests.get(url)
        return SeriesClient.handle_response(response)

    @staticmethod
    def get_series_participants(id_series):
        url = f"{SeriesClient.BASE_URL}/{id_series}/participants"
        response = requests.get(url)
        return SeriesClient.handle_response(response)

    @staticmethod
    def put_category_into_series(id_series):
        form_data = request.form.to_dict()
        url = f"{SeriesClient.BASE_URL}/{id_series}/categories"
        response = requests.put(url, data=form_data)
        return SeriesClient.handle_response(response)

    @staticmethod
    def delete_category_from_series(id_series):
        form_data = request.form.to_dict()
        url = f"{SeriesClient.BASE_URL}/{id_series}/categories"
        response = requests.delete(url, data=form_data)
        return SeriesClient.handle_response(response)

    @staticmethod
    def put_season_into_series(id_series):
        form_data = request.form.to_dict()
        url = f"{SeriesClient.BASE_URL}/{id_series}/seasons"
        response = requests.put(url, data=form_data)
        return SeriesClient.handle_response(response)

    @staticmethod
    def delete_season_from_series(id_series):
        form_data = request.form.to_dict()
        url = f"{SeriesClient.BASE_URL}/{id_series}/seasons"
        response = requests.delete(url, data=form_data)
        return SeriesClient.handle_response(response)
    
    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
