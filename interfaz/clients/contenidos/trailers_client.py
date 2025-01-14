from flask import request, render_template, redirect, url_for
from types import SimpleNamespace
import os
import requests

class TrailersClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}trailers"

    @staticmethod
    def render_update_trailer(id_trailer):
        trailer_data = TrailersClient.get_trailer_by_id(id_trailer=id_trailer)
        if trailer_data and len(trailer_data) > 0:
            trailer_dict = trailer_data[0]
            trailer = SimpleNamespace(**trailer_dict)
            return render_template('update_trailer.html', trailer=trailer)
        else:
            return redirect(url_for('trailers'))
        
    @staticmethod
    def render_trailers():
        return render_template('trailers.html')
    
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
        if response.status_code == 200:
            return render_template('trailers.html', trailers=response.json())
        else:
            return redirect(url_for('trailers'))

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
