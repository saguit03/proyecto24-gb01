from flask import request, render_template, redirect, url_for
from types import SimpleNamespace
import os
import requests

class ParticipantsClient:
    BASE_URL =  f"{os.getenv('CONTENIDOS_URL')}participants"

    @staticmethod
    def render_update_participant(id_participant):
        participant_data = ParticipantsClient.get_participant_by_id(id_participant=id_participant)
        if participant_data and len(participant_data) > 0:
            participant_dict = participant_data[0]
            participant = SimpleNamespace(**participant_dict)
            return render_template('update_participant.html', participant=participant)
        else:
            return redirect(url_for('participants'))
        
    @staticmethod
    def render_participants():
        return render_template('participants.html')

    @staticmethod
    def add_participant():
        form_data = request.form.to_dict()
        response = requests.post(ParticipantsClient.BASE_URL, data=form_data)
        return ParticipantsClient.handle_response(response)

    @staticmethod
    def delete_participant_form():
        id_participant = request.form.get('id_participant')
        url = f"{ParticipantsClient.BASE_URL}/{id_participant}"
        response = requests.delete(url)
        return ParticipantsClient.handle_response(response)

    @staticmethod
    def delete_participant(id_participant):
        url = f"{ParticipantsClient.BASE_URL}/{id_participant}"
        response = requests.delete(url)
        return ParticipantsClient.handle_response(response)

    @staticmethod
    def put_participant_form():
        form_data = request.form.to_dict()
        url = f"{ParticipantsClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return ParticipantsClient.handle_response(response)

    @staticmethod
    def put_participant(id_participant):
        form_data = request.form.to_dict()
        url = f"{ParticipantsClient.BASE_URL}/{id_participant}"
        response = requests.put(url, data=form_data)
        return ParticipantsClient.handle_response(response)

    @staticmethod
    def get_participant_by_id(id_participant):
        url = f"{ParticipantsClient.BASE_URL}/{id_participant}"
        response = requests.get(url)
        return ParticipantsClient.handle_response(response)
    
    @staticmethod
    def get_participant_by_name():
        params = {'name': request.args.get('name')}
        url = f"{ParticipantsClient.BASE_URL}/name"
        response = requests.get(url, params=params)
        return ParticipantsClient.handle_response(response)
    
    @staticmethod
    def get_participant_by_surname():
        params = {'surname': request.args.get('surname')}
        url = f"{ParticipantsClient.BASE_URL}/surname"
        response = requests.get(url, params=params)
        return ParticipantsClient.handle_response(response)
    
    @staticmethod
    def get_participant_by_age():
        params = {'age': request.args.get('age')}
        url = f"{ParticipantsClient.BASE_URL}/age"
        response = requests.get(url, params=params)
        return ParticipantsClient.handle_response(response)
    
    @staticmethod
    def get_participant_by_nationality():
        params = {'nationality': request.args.get('nationality')}
        url = f"{ParticipantsClient.BASE_URL}/nationality"
        response = requests.get(url, params=params)
        return ParticipantsClient.handle_response(response)

    @staticmethod
    def get_content_by_participant(id_category):
        url = f"{ParticipantsClient.BASE_URL}/{id_category}/content"
        response = requests.get(url)
        return ParticipantsClient.handle_response(response)
    
    @staticmethod
    def get_all_participants():
        url = f"{ParticipantsClient.BASE_URL}/all"
        response = requests.get(url)
        if response.status_code == 200:
            return render_template('participants.html', participants=response.json())
        else:
            return redirect(url_for('participants'))

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
