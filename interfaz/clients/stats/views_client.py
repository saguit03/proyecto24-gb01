from flask import request
import os
import requests

class ViewsClient:
    BASE_URL =  f"{os.getenv('ESTADISTICAS_URL')}views"

    @staticmethod
    def add_view():
        form_data = request.form.to_dict()
        response = requests.post(ViewsClient.BASE_URL, data=form_data)
        return ViewsClient.handle_response(response)

    @staticmethod
    def delete_view_form():
        id_view = request.form.get('id_view')
        url = f"{ViewsClient.BASE_URL}/{id_view}"
        response = requests.delete(url)
        return ViewsClient.handle_response(response)

    @staticmethod
    def delete_view(id_view):
        url = f"{ViewsClient.BASE_URL}/{id_view}"
        response = requests.delete(url)
        return ViewsClient.handle_response(response)

    @staticmethod
    def put_view_form():
        form_data = request.form.to_dict()
        url = f"{ViewsClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return ViewsClient.handle_response(response)

    @staticmethod
    def put_view(id_view):
        form_data = request.form.to_dict()
        url = f"{ViewsClient.BASE_URL}/{id_view}"
        response = requests.put(url, data=form_data)
        return ViewsClient.handle_response(response)

    @staticmethod
    def get_view_by_id(id_view):
        url = f"{ViewsClient.BASE_URL}/{id_view}"
        response = requests.get(url)
        return ViewsClient.handle_response(response)
    
    @staticmethod
    def get_all_views():
        url = f"{ViewsClient.BASE_URL}/all"
        response = requests.get(url)
        return ViewsClient.handle_response(response)

    @staticmethod
    def get_view_contents():
        params = {'id_content': request.args.get('id_content')}
        url = f"{ViewsClient.BASE_URL}/contents"
        response = requests.get(url, params=params)
        return ViewsClient.handle_response(response)
    
    @staticmethod
    def get_view_profiles():
        params = {'idprofile': request.args.get('idprofile')}
        url = f"{ViewsClient.BASE_URL}/profiles"
        response = requests.get(url, params=params)
        return ViewsClient.handle_response(response)
   
    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
