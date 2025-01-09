from flask import request
import os
import requests

class ChaptersClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}chapters"

    @staticmethod
    def add_chapter():
        form_data = request.form.to_dict()
        response = requests.post(ChaptersClient.BASE_URL, data=form_data)
        return ChaptersClient.handle_response(response)

    @staticmethod
    def delete_chapter_form():
        id_chapter = request.form.get('id_chapter')
        url = f"{ChaptersClient.BASE_URL}/{id_chapter}"
        response = requests.delete(url)
        return ChaptersClient.handle_response(response)

    @staticmethod
    def delete_chapter(id_chapter):
        url = f"{ChaptersClient.BASE_URL}/{id_chapter}"
        response = requests.delete(url)
        return ChaptersClient.handle_response(response)

    @staticmethod
    def put_chapter_form():
        form_data = request.form.to_dict()
        url = f"{ChaptersClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return ChaptersClient.handle_response(response)

    @staticmethod
    def put_chapter(id_chapter):
        form_data = request.form.to_dict()
        url = f"{ChaptersClient.BASE_URL}/{id_chapter}"
        response = requests.put(url, data=form_data)
        return ChaptersClient.handle_response(response)

    @staticmethod
    def get_chapter_by_id(id_chapter):
        url = f"{ChaptersClient.BASE_URL}/{id_chapter}"
        response = requests.get(url)
        return ChaptersClient.handle_response(response)

    @staticmethod
    def get_all_chapters():
        url = f"{ChaptersClient.BASE_URL}/all"
        response = requests.get(url)
        return ChaptersClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
