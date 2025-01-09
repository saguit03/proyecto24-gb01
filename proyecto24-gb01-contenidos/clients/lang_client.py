import requests
import os

class LanguageClient:
    BASE_URL = os.getenv('ESTADISTICAS_URL')

    @staticmethod
    def get_language(id_language):
        url = f"{LanguageClient.BASE_URL}/languages/{id_language}"
        response = requests.get(url)
        return LanguageClient.handleResponse(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
