from flask import request, redirect, url_for, render_template, session
from flask_login import login_user, logout_user, current_user
import json
import requests
import os
from auth.user_mixin import User


class UsersClient:
    BASE_URL = f"{os.getenv('USUARIOS_URL')}users"

    headers = {"Accept: application/json", "Content-Type: application/json"}

    @staticmethod
    def handle_response(response):
        if response.status_code in {200, 201}:  # Agregado para cubrir el caso de creación exitosa
            return response.json()
        else:
            response.raise_for_status()

    @staticmethod
    def get_user(iduser):
        url = f"{UsersClient.BASE_URL}/{iduser}"
        response = requests.get(url, headers=UsersClient.headers)
        return UsersClient.handle_response(response)

    @staticmethod
    def add_user():
        form_data = request.form.to_dict()
        response = requests.post(UsersClient.BASE_URL, data=form_data)
        return UsersClient.handle_response(response)

    @staticmethod
    def user_login():
        url = f"{UsersClient.BASE_URL}/login"
        form_data = request.form.to_dict()
        response = requests.post(url, 
                                 headers=UsersClient.headers,
                                 data=json.dumps(form_data))
        
        if response.status_code in {200, 201}:
            user = response.json()
            login_user(User(user.get('id')))
            return render_template('myprofile.html', user=user)
            
        return redirect(url_for('login', error=True))


    @staticmethod
    def user_logout():
        session.pop('user_id', None)
        session.pop('username', None)
        logout_user()
        return redirect(url_for('/'))

    @staticmethod
    def put_user(iduser):
        url = f"{UsersClient.BASE_URL}/{iduser}"
        
        form_data = request.form.to_dict()
        
        user = {
            "name": form_data.get("name"),
            "surname": form_data.get("surname"),
            "username": form_data.get("username"),
            "email": form_data.get("email"),
            "password": form_data.get("password"),
        }
        
        response = requests.put(url,json=user,headers=UsersClient.headers)
        return UsersClient.handle_response(response)

    @staticmethod
    def delete_user(iduser):
        url = f"{UsersClient.BASE_URL}/{iduser}"
        response = requests.delete(url)
        return UsersClient.handle_response(response)

    @staticmethod
    def get_all_users():
        url = UsersClient.BASE_URL
        response = requests.get(url, headers=UsersClient.headers)
        return UsersClient.handle_response(response)
