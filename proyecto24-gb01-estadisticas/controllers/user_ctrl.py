from flask import render_template, request, jsonify, redirect, url_for
from pymongo.collection import Collection

from database import get_next_sequence_value as get_next_sequence_value
from models.user import User
from controllers.error_ctrl import ErrorCtrl
from controllers.ok_ctrl import OkCtrl

class UserCtrl:
    @staticmethod
    def render_template(db: Collection):
        users_received = db.find()
        return render_template('DB_User.html', users=users_received)

    @staticmethod
    def add_user(db: Collection):
        iduser = get_next_sequence_value(db, "iduser")
        username = request.form['username']
        email = request.form['email']

        if iduser:
            iduser = int(iduser)
            user = User(iduser, username, email)

            db.insert_one(user.to_db_collection())
            return OkCtrl.added('User')
        else:
            ErrorCtrl.error_404('User')

    @staticmethod
    def delete_user(db: Collection, iduser: int):
        if iduser:
            iduser = int(iduser)
            result = db.delete_one({'iduser': iduser})
            if result.deleted_count == 1:
                return OkCtrl.deleted('User')
            else:
                ErrorCtrl.error_404('Error')
        else:
            ErrorCtrl.error_400()

    @staticmethod
    def delete_user_param(db: Collection):
        iduser = int(request.args.get('iduser'))
        return UserCtrl.delete_user(db, iduser)

    @staticmethod
    def delete_user_form(db: Collection):
        iduser = int(request.form.get('iduser'))
        return UserCtrl.delete_user(db, iduser)
