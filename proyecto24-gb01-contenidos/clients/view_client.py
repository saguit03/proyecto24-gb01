import requests
import os
from datetime import datetime

class ViewClient:
    BASE_URL = f"{os.getenv('ESTADISTICAS_URL')}/views"

    @staticmethod
    def add_view_to_content(id_content: int, content_type: int, idprofile: int = 0, date_init: str = None, date_finish: str = None):
        if date_init is None:
            date_init = datetime.now()

        form_data = {
            "id_content": id_content,
            "content_type": content_type,
            "idprofile": idprofile,
            "date_init": date_init,
            "date_finish": date_finish,
        }

        form_data = {key: value for key, value in form_data.items() if value is not None}

        try:
            response = requests.post(ViewClient.BASE_URL, data=form_data)
            return ViewClient.handle_response(response)
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}
        
    @staticmethod
    def get_number_views(id_content: int, content_type: int):
        url = f"{ViewClient.BASE_URL}/contents"
        params = {
            "id_content": id_content,
            "content_type": content_type
        }
        response = requests.get(url, params=params)
        cont = 0
        
        if response.status_code == 200:
            cont = len(response.json())
        
        return cont

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
