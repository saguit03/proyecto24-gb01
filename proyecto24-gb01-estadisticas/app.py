from flask import Flask, render_template
from flask_cors import CORS
from flask_cors import cross_origin
import os
import database as dbase
from controllers.language_ctrl import LanguageCtrl
from controllers.profile_ctrl import ProfileCtrl
from controllers.review_ctrl import ReviewCtrl
from controllers.user_ctrl import UserCtrl
from controllers.view_ctrl import ViewsCtrl

db = dbase.conexion_mongodb()

app = Flask(__name__)

cors = CORS(app) # allow CORS for all domains on all routes.

# -------------------------------------------------------------------------------------------------------


@app.route('/')
@cross_origin()
def home():
    return render_template('index.html')


# -------------------------------------------------------------------------------------------------------


@app.route('/languages')
@cross_origin()
def languages():
    return LanguageCtrl.render_template(db['languages'])


@app.route('/languages', methods=['POST'])
@cross_origin()
def add_language():
    return LanguageCtrl.add_language(db['languages'])


@app.route('/languages', methods=['PUT'])
@cross_origin()
def put_language_form():
    return LanguageCtrl.put_language_form(db['languages'])


@app.route('/languages', methods=['DELETE'])
@cross_origin()
def delete_language_form():
    return LanguageCtrl.delete_language_form(db['languages'])


@app.route('/languages/<id_language>', methods=['PUT'])
@cross_origin()
def put_language(id_language):
    return LanguageCtrl.put_language(db['languages'], id_language)


@app.route('/languages/<id_language>', methods=['DELETE'])
@cross_origin()
def delete_language(id_language):
    return LanguageCtrl.delete_language(db['languages'], id_language)


@app.route('/languages/all')
@cross_origin()
def get_all_languages():
    return LanguageCtrl.get_all_languages(db['languages'])


@app.route('/languages/<id_language>', methods=['GET'])
@cross_origin()
def get_language_by_id(id_language):
    return LanguageCtrl.get_language_by_id(db['languages'], id_language)


@app.route('/languages/name', methods=['GET'])
@cross_origin()
def get_language_by_name():
    return LanguageCtrl.get_language_by_name(db['languages'])


# -------------------------------------------------------------------------------------------------------


@app.route('/reviews')
@cross_origin()
def reviews():
    return ReviewCtrl.render_template(db['reviews'])


@app.route('/reviews', methods=['POST'])
@cross_origin()
def add_review():
    return ReviewCtrl.add_review(db['reviews'])


@app.route('/reviews', methods=['PUT'])
@cross_origin()
def put_review_form():
    return ReviewCtrl.put_review_form(db['reviews'])


@app.route('/reviews', methods=['DELETE'])
@cross_origin()
def delete_review_form():
    return ReviewCtrl.delete_review_form(db['reviews'])


@app.route('/reviews/<id_review>', methods=['PUT'])
@cross_origin()
def put_review(id_review):
    return ReviewCtrl.put_review(db['reviews'], id_review)


@app.route('/reviews/<id_review>', methods=['DELETE'])
@cross_origin()
def delete_review(id_review):
    return ReviewCtrl.delete_review(db['reviews'], id_review)


@app.route('/reviews/all', methods=['GET'])
@cross_origin()
def get_all_reviews():
    return ReviewCtrl.get_all_reviews(db['reviews'])


@app.route('/reviews/<id_review>', methods=['GET'])
@cross_origin()
def get_review_by_id(id_review):
    return ReviewCtrl.get_review_by_id(db['reviews'], id_review)


@app.route('/reviews/contents', methods=['GET'])
@cross_origin()
def get_reviews_by_id_content():
    return ReviewCtrl.get_reviews_by_id_content(db['reviews'])


@app.route('/reviews/profiles', methods=['GET'])
@cross_origin()
def get_reviews_by_idprofile():
    return ReviewCtrl.get_reviews_by_idprofile(db['reviews'])


@app.route('/reviews/ratings', methods=['GET'])
@cross_origin()
def get_reviews_by_rating():
    return ReviewCtrl.get_reviews_by_rating(db['reviews'])


@app.route('/reviews/minrating', methods=['GET'])
@cross_origin()
def get_reviews_by_min_rating():
    return ReviewCtrl.get_reviews_by_min_rating(db['reviews'])


@app.route('/reviews/maxrating', methods=['GET'])
@cross_origin()
def get_reviews_by_max_rating():
    return ReviewCtrl.get_reviews_by_max_rating(db['reviews'])


@app.route('/reviews/comments', methods=['GET'])
@cross_origin()
def get_reviews_with_commentary():
    return ReviewCtrl.get_reviews_with_commentary(db['reviews'])


@app.route('/reviews/nocomments', methods=['GET'])
@cross_origin()
def get_reviews_without_commentary():
    return ReviewCtrl.get_reviews_without_commentary(db['reviews'])


@app.route('/reviews/stats', methods=['GET'])
@cross_origin()
def get_stats_review():
    return ReviewCtrl.get_stats_review(db['reviews'])


# -------------------------------------------------------------------------------------------------------
@app.route('/profiles')
@cross_origin()
def profiles():
    return ProfileCtrl.render_template(db['profiles'])


@app.route('/profiles', methods=['POST'])
@cross_origin()
def add_profile():
    return ProfileCtrl.add_profile(db['profiles'])


@app.route('/profiles/<idprofile>', methods=['DELETE'])
@cross_origin()
def delete_profile(idprofile):
    return ProfileCtrl.delete_profile(db['profiles'], idprofile)


@app.route('/profiles', methods=['DELETE'])
@cross_origin()
def delete_profile_form():
    return ProfileCtrl.delete_profile_form(db['profiles'])


# -------------------------------------------------------------------------------------------------------
@app.route('/users')
@cross_origin()
def users():
    return UserCtrl.render_template(db['users'])


@app.route('/users', methods=['POST'])
@cross_origin()
def add_user():
    return UserCtrl.add_user(db['users'])


@app.route('/users/<iduser>', methods=['DELETE'])
@cross_origin()
def delete_user(idprofile):
    return UserCtrl.delete_user(db['users'], idprofile)


@app.route('/users', methods=['DELETE'])
@cross_origin()
def delete_user_form():
    return UserCtrl.delete_user_form(db['users'])

# -------------------------------------------------------------------------------------------------------

@app.route('/views')
@cross_origin()
def views():
    return ViewsCtrl.render_template(db['views'])


@app.route('/views', methods=['POST'])
@cross_origin()
def add_view():
    return ViewsCtrl.add_view(db['views'])


@app.route('/views', methods=['PUT'])
@cross_origin()
def put_view_form():
    return ViewsCtrl.put_view_form(db['views'])


@app.route('/views', methods=['DELETE'])
@cross_origin()
def delete_view_form():
    return ViewsCtrl.delete_view_form(db['views'])


@app.route('/views/<id_view>', methods=['PUT'])
@cross_origin()
def put_view(id_view):
    return ViewsCtrl.put_view(db['views'], id_view)


@app.route('/views/<id_view>', methods=['DELETE'])
@cross_origin()
def delete_view(id_view):
    return ViewsCtrl.delete_view(db['views'], id_view)


@app.route('/views/all', methods=['GET'])
@cross_origin()
def get_all_views():
    return ViewsCtrl.get_all_views(db['views'])


@app.route('/views/<id_view>', methods=['GET'])
@cross_origin()
def get_view_by_id(id_view):
    return ViewsCtrl.get_view_by_id(db['views'], id_view)


@app.route('/views/contents', methods=['GET'])
@cross_origin()
def get_views_by_id_content():
    return ViewsCtrl.get_views_by_id_content(db['views'])


@app.route('/views/profiles', methods=['GET'])
@cross_origin()
def get_views_by_idprofile():
    return ViewsCtrl.get_views_by_idprofile(db['views'])


@app.route('/views/stats', methods=['GET'])
@cross_origin()
def get_stats_view():
    return ViewsCtrl.get_stats_view(db['views'])


# -------------------------------------------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8083)

