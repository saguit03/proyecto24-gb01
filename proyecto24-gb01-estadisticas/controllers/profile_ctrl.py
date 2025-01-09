from flask import render_template, request, jsonify, redirect, url_for
from pymongo.collection import Collection

from database import get_next_sequence_value as get_next_sequence_value
from models.profileUser import ProfileUser
from controllers.error_ctrl import ErrorCtrl
from controllers.ok_ctrl import OkCtrl

class ProfileCtrl:
    @staticmethod
    def render_template(db: Collection):
        profiles_received = db.find()
        return render_template('DB_ProfileUser.html', profiles=profiles_received)

    @staticmethod
    def add_profile(db: Collection):
        idprofile = get_next_sequence_value(db, "idprofile")
        name = request.form.get('name')
        iduser = request.form.get('iduser')
        id_language = request.form.get('id_language')

        if idprofile:
            idprofile = int(idprofile)
            profile_user = ProfileUser(idprofile, str(name), int(iduser), int(id_language))
            db.insert_one(profile_user.to_db_collection())
            return OkCtrl.added('Profile')
        else:
            ErrorCtrl.error_404('Profile')

    @staticmethod
    def delete_profile(db: Collection, idprofile: int):
        if idprofile:
            idprofile = int(idprofile)
            result = db.delete_one({'idprofile': idprofile})
            if result.deleted_count == 1:
                return OkCtrl.deleted('Profile')
            else:
                ErrorCtrl.error_404('Profile')
        else:
            ErrorCtrl.error_400()

    @staticmethod
    def delete_profile_param(db: Collection):
        idprofile = int(request.args.get('idprofile'))
        return ProfileCtrl.delete_profile(db, idprofile)

    @staticmethod
    def delete_profile_form(db: Collection):
        idprofile = int(request.form.get('idprofile'))
        return ProfileCtrl.delete_profile(db, idprofile)
