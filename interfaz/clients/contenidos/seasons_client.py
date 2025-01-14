from flask import request, render_template, redirect, url_for
from types import SimpleNamespace
import os
import requests

class SeasonsClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}seasons"


    @staticmethod
    def render_update_season(id_season):
        season_data = SeasonsClient.get_season_by_id(id_season=id_season)
        if season_data and len(season_data) > 0:
            season_dict = season_data[0]
            season = SimpleNamespace(**season_dict)
            return render_template('update_season.html', season=season)
        else:
            return redirect(url_for('seasons'))
        
    @staticmethod
    def render_seasons():
        return render_template('seasons.html')
    

    @staticmethod
    def add_season():
        form_data = request.form.to_dict()
        response = requests.post(SeasonsClient.BASE_URL, data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def delete_season_form():
        id_season = request.form.get('id_season')
        url = f"{SeasonsClient.BASE_URL}/{id_season}"
        response = requests.delete(url)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def delete_season(id_season):
        url = f"{SeasonsClient.BASE_URL}/{id_season}"
        response = requests.delete(url)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def put_season_form():
        form_data = request.form.to_dict()
        url = f"{SeasonsClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def put_season(id_season):
        form_data = request.form.to_dict()
        url = f"{SeasonsClient.BASE_URL}/{id_season}"
        response = requests.put(url, data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def get_season_by_id(id_season):
        url = f"{SeasonsClient.BASE_URL}/{id_season}"
        response = requests.get(url)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def get_all_seasons():
        url = f"{SeasonsClient.BASE_URL}/all"
        response = requests.get(url)
        if response.status_code == 200:
            return render_template('seasons.html', seasons=response.json())
        else:
            return redirect(url_for('seasons'))

    @staticmethod
    def get_season_by_title():
        url = f"{SeasonsClient.BASE_URL}/title"
        params = {'title': request.args.get('title')}
        response = requests.get(url, params=params)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def get_season_seasons():
        url = f"{SeasonsClient.BASE_URL}/seasons"
        form_data = request.form.to_dict()
        response = requests.get(url,data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def get_season_characters():
        url = f"{SeasonsClient.BASE_URL}/characters"
        form_data = request.form.to_dict()
        response = requests.get(url,data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def get_season_participants():
        url = f"{SeasonsClient.BASE_URL}/participants"
        form_data = request.form.to_dict()
        response = requests.get(url, data=form_data)
        return SeasonsClient.handle_response(response)
    
    
    @staticmethod
    def put_trailer_into_season(id_season):
        form_data = request.form.to_dict()
        url = f"{SeasonsClient.BASE_URL}/{id_season}/trailer"
        response = requests.put(url, data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def delete_trailer_from_season(id_season):
        url = f"{SeasonsClient.BASE_URL}/{id_season}/trailer"
        response = requests.delete(url)
        return SeasonsClient.handle_response(response)
    
    
    @staticmethod
    def put_season_into_season(id_season):
        form_data = request.form.to_dict()
        url = f"{SeasonsClient.BASE_URL}/{id_season}/seasons"
        response = requests.put(url, data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def delete_season_from_season(id_season):
        url = f"{SeasonsClient.BASE_URL}/{id_season}/seasons"
        response = requests.delete(url)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def put_category_into_season(id_season):
        form_data = request.form.to_dict()
        url = f"{SeasonsClient.BASE_URL}/{id_season}/categories"
        response = requests.put(url, data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def delete_category_from_season(id_season):
        form_data = request.form.to_dict()
        url = f"{SeasonsClient.BASE_URL}/{id_season}/categories"
        response = requests.delete(url, data=form_data)
        return SeasonsClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
