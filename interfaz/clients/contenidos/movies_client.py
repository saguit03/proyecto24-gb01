from flask import request
import os
import requests

class MoviesClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}movies"

    @staticmethod
    def add_movie():
        form_data = request.form.to_dict()
        response = requests.post(MoviesClient.BASE_URL, data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def delete_movie_form():
        id_movie = request.form.get('id_movie')
        url = f"{MoviesClient.BASE_URL}/{id_movie}"
        response = requests.delete(url)
        return MoviesClient.handle_response(response)

    @staticmethod
    def delete_movie(id_movie):
        url = f"{MoviesClient.BASE_URL}/{id_movie}"
        response = requests.delete(url)
        return MoviesClient.handle_response(response)

    @staticmethod
    def put_movie_form():
        form_data = request.form.to_dict()
        url = f"{MoviesClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def put_movie(id_movie):
        form_data = request.form.to_dict()
        url = f"{MoviesClient.BASE_URL}/{id_movie}"
        response = requests.put(url, data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def get_movie_by_id(id_movie):
        url = f"{MoviesClient.BASE_URL}/{id_movie}"
        response = requests.get(url)
        return MoviesClient.handle_response(response)

    @staticmethod
    def get_all_movies():
        url = f"{MoviesClient.BASE_URL}/all"
        response = requests.get(url)
        return MoviesClient.handle_response(response)

    @staticmethod
    def get_movie_by_title():
        url = f"{MoviesClient.BASE_URL}/title"
        params = {'title': request.args.get('title')}
        response = requests.get(url, params=params)
        return MoviesClient.handle_response(response)

    @staticmethod
    def put_trailer_into_movie(id_movie):
        form_data = request.form.to_dict()
        url = f"{MoviesClient.BASE_URL}/{id_movie}/trailer"
        response = requests.put(url, data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def delete_trailer_from_movie(id_movie):
        url = f"{MoviesClient.BASE_URL}/{id_movie}/trailer"
        response = requests.delete(url)
        return MoviesClient.handle_response(response)

    @staticmethod
    def get_movie_by_release_date():
        url = f"{MoviesClient.BASE_URL}/release"
        params = {'release_date': request.args.get('release_date')}
        response = requests.get(url, params=params)
        return MoviesClient.handle_response(response)

    @staticmethod
    def get_movie_characters():
        url = f"{MoviesClient.BASE_URL}/characters"
        form_data = request.form.to_dict()
        response = requests.get(url,data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def get_movie_participants():
        url = f"{MoviesClient.BASE_URL}/participants"
        form_data = request.form.to_dict()
        response = requests.get(url, data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def put_category_into_movie(id_movie):
        form_data = request.form.to_dict()
        url = f"{MoviesClient.BASE_URL}/{id_movie}/categories"
        response = requests.put(url, data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def delete_category_from_movie(id_movie):
        form_data = request.form.to_dict()
        url = f"{MoviesClient.BASE_URL}/{id_movie}/categories"
        response = requests.delete(url, data=form_data)
        return MoviesClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
