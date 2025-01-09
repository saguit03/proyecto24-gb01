from flask import Flask, Blueprint, render_template, redirect, url_for, session
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
import os
from content import ContentType

from clients.contenidos.categories_client import CategoriesClient
from clients.contenidos.chapters_client import ChaptersClient
from clients.contenidos.characters_client import CharactersClient
from clients.contenidos.movies_client import MoviesClient
from clients.contenidos.participants_client import ParticipantsClient
from clients.contenidos.series_client import SeriesClient
from clients.contenidos.seasons_client import SeasonsClient
from clients.contenidos.trailers_client import TrailersClient

from clients.stats.languages_client import LanguagesClient
from clients.stats.reviews_client import ReviewsClient
from clients.stats.views_client import ViewsClient

from clients.users.profiles_client import ProfilesClient
from clients.users.users_client import UsersClient

from auth.user_mixin import User

app = Flask(__name__)
app.secret_key = 'my_secret_medifli' 

login_manager = LoginManager()
login_manager.init_app(app)

# Función user_loader
@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

# Ruta principal
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@app.route('/signup', methods=['GET'])
def signup_page():
    return render_template('signup.html')

@app.route('/login', methods=['POST'])
def login():
    return UsersClient.user_login()

@app.route('/signup', methods=['POST'])
def signup():
    return UsersClient.add_user()

@app.route('/logout')
@login_required
def logout():
    return UsersClient.user_logout()

@app.route('/search', methods=['GET'])
def search():
    return render_template('search.html')

@app.route('/myprofile', methods=['GET'])
@login_required
def my_profile():
    return UsersClient.get_current_user()

@app.route('/myprofile/delete', methods=['POST'])
@login_required
def delete_user():
    return UsersClient.delete_user()

@app.route('/myprofile/update', methods=['POST'])
@login_required
def put_user():
    return UsersClient.put_user()

@app.route('/myprofile/create', methods=['POST'])
@login_required
def create_profile():
    return ProfilesClient.add_profile()

@app.route('/myprofile/delete/<int:idprofile>', methods=['POST'])
@login_required
def delete_profile(idprofile):
    ProfilesClient.delete_profile(idprofile)
    return redirect(url_for('auth.my_profile'))  # Redirigir de vuelta a la lista de perfiles

@app.route('/favorites', methods=['GET'])
@login_required
def favorites():
    return render_template('favorites.html')

@app.route('/users', methods=['GET'])
def users():
    return UsersClient.get_all_users()

@app.route('/users/myreviews', methods=['GET'])
@login_required
def my_reviews():
    return render_template('my_reviews.html')

@app.route('/profiles', methods=['GET'])
@login_required
def profiles():
    return render_template('profiles.html')

@app.route('/languages', methods=['GET'])
def languages():
    return render_template('languages.html')

@app.route('/languages/create', methods=['POST'])
def add_language():
    return LanguagesClient.add_language()

@app.route('/languages/delete', methods=['POST'])
def delete_language_form():
    return LanguagesClient.delete_language_form()

@app.route('/languages/delete/<int:id_language>', methods=['POST'])
def delete_language(id_language):
    return LanguagesClient.delete_language(id_language)

@app.route('/languages/update', methods=['POST'])
def put_language_form():
    return LanguagesClient.put_language_form()

@app.route('/languages/update/<int:id_language>', methods=['POST'])
def put_language(id_language):
    return LanguagesClient.put_language(id_language)

@app.route('/languages/<int:id_language>', methods=['GET'])
def get_language_by_id(id_language):
    return LanguagesClient.get_language_by_id(id_language)

@app.route('/languages/name', methods=['GET'])
def get_language_by_name():
    return LanguagesClient.get_language_by_name()

@app.route('/languages/all', methods=['GET'])
def get_all_languages():
    return LanguagesClient.get_all_languages()

@app.route('/reviews', methods=['GET'])
def reviews():
    content_types = [(ct.name, ct.value) for ct in ContentType]
    return render_template('reviews.html', content_types=content_types)

@app.route('/reviews/create', methods=['POST'])
def add_review():
    return ReviewsClient.add_review()

@app.route('/reviews/delete', methods=['POST'])
def delete_review_form():
    return ReviewsClient.delete_review_form()

@app.route('/reviews/delete/<int:id_review>', methods=['POST'])
def delete_review(id_review):
    return ReviewsClient.delete_review(id_review)

@app.route('/reviews/update', methods=['POST'])
def put_review_form():
    return ReviewsClient.put_review_form()

@app.route('/reviews/update/<int:id_review>', methods=['POST'])
def put_review(id_review):
    return ReviewsClient.put_review(id_review)

@app.route('/reviews/<int:id_review>', methods=['GET'])
def get_review_by_id(id_review):
    return ReviewsClient.get_review_by_id(id_review)

@app.route('/reviews/all', methods=['GET'])
def get_all_reviews():
    return ReviewsClient.get_all_reviews()

@app.route('/reviews/contents', methods=['GET'])
def get_review_contents():
    return ReviewsClient.get_review_contents()

@app.route('/reviews/profiles', methods=['GET'])
def get_review_profiles():
    return ReviewsClient.get_review_profiles()

@app.route('/reviews/comments', methods=['GET'])
def get_review_with_comments():
    return ReviewsClient.get_review_with_comments()

@app.route('/reviews/nocomments', methods=['GET'])
def get_review_with_no_comments():
    return ReviewsClient.get_review_with_no_comments()

@app.route('/views', methods=['GET'])
def views():
    content_types = [(ct.name, ct.value) for ct in ContentType]
    return render_template('views.html', content_types=content_types)

@app.route('/views/create', methods=['POST'])
def add_view():
    return ViewsClient.add_view()

@app.route('/views/delete', methods=['POST'])
def delete_view_form():
    return ViewsClient.delete_view_form()

@app.route('/views/delete/<int:id_view>', methods=['POST'])
def delete_view(id_view):
    return ViewsClient.delete_view(id_view)

@app.route('/views/update', methods=['POST'])
def put_view_form():
    return ViewsClient.put_view_form()

@app.route('/views/update/<int:id_view>', methods=['POST'])
def put_view(id_view):
    return ViewsClient.put_view(id_view)

@app.route('/views/<int:id_view>', methods=['GET'])
def get_view_by_id(id_view):
    return ViewsClient.get_view_by_id(id_view)

@app.route('/views/all', methods=['GET'])
def get_all_views():
    return ViewsClient.get_all_views()

@app.route('/views/contents', methods=['GET'])
def get_view_contents():
    return ViewsClient.get_view_contents()

@app.route('/views/profiles', methods=['GET'])
def get_view_profiles():
    return ViewsClient.get_view_profiles()

@app.route('/movies', methods=['GET'])
def movies():
    return render_template('movies.html')

@app.route('/movies/all', methods=['GET'])
def all_movies():
    return MoviesClient.get_all_movies()

@app.route('/movies/create', methods=['POST'])
def create_movie():
    return MoviesClient.add_movie()

@app.route('/movies/delete', methods=['POST'])
def delete_movie():
    return MoviesClient.delete_movie_form()

@app.route('/movies/delete/<int:id_movie>', methods=['POST'])
def delete_movie_form(id_movie):
    return MoviesClient.delete_movie(id_movie)

@app.route('/movies/update/<int:id_movie>', methods=['POST'])
def put_movie(id_movie):
    return MoviesClient.put_movie(id_movie)

@app.route('/movies/update', methods=['POST'])
def put_movie_form():
    return MoviesClient.put_movie_form()

@app.route('/movies/<int:id_movie>', methods=['GET'])
def get_movie_by_id(id_movie):
    return MoviesClient.get_movie_by_id(id_movie)

@app.route('/movies/title', methods=['GET'])
def get_movie_title():
    return MoviesClient.get_movie_by_title()

@app.route('/movies/release', methods=['GET'])
def get_movie_by_release_date():
    return MoviesClient.get_movie_by_release_date()

@app.route('/movies/<id_movie>/putcategory', methods=['POST'])
def put_category_into_movie(id_movie):
    return MoviesClient.put_category_into_movie(id_movie)

@app.route('/movies/<id_movie>/deletecategory', methods=['POST'])
def delete_category_from_movie(id_movie):
    return MoviesClient.delete_category_from_movie(id_movie)

@app.route('/movies/<id_movie>/puttrailer', methods=['POST'])
def put_trailer_into_movie(id_movie):
    return MoviesClient.put_trailer_into_movie(id_movie)

@app.route('/movies/<id_movie>/deletetrailer', methods=['POST'])
def delete_trailer_from_movie(id_movie):
    return MoviesClient.delete_trailer_from_movie(id_movie)

@app.route('/series', methods=['GET'])
def series():
    return render_template('series.html')

@app.route('/series/all', methods=['GET'])
def all_series():
    return SeriesClient.get_all_series()

@app.route('/series/create', methods=['POST'])
def create_series():
    return SeriesClient.add_series()

@app.route('/series/delete/<int:id_series>', methods=['POST'])
def delete_series(id_series):
    return SeriesClient.delete_series(id_series)

@app.route('/series/update/<int:id_series>', methods=['POST'])
def put_series(id_series):
    return SeriesClient.put_series(id_series)

@app.route('/series/delete', methods=['POST'])
def delete_series_form():
    return SeriesClient.delete_series_form()

@app.route('/series/update', methods=['POST'])
def put_series_form():
    return SeriesClient.put_series_form()

@app.route('/series/<int:id_series>', methods=['GET'])
def series_info(id_series):
    return SeriesClient.get_series_by_id(id_series)

@app.route('/series/<int:id_series>/putseason', methods=['POST'])
def put_season_into_series(id_series):
    return SeriesClient.put_season_into_series(id_series)

@app.route('/series/<id_series>/deleteseason', methods=['POST'])
def delete_season_from_series(id_series):
    return SeriesClient.delete_season_from_series(id_series)

@app.route('/series/<id_series>/putcategory', methods=['POST'])
def put_category_into_series(id_series):
    return SeriesClient.put_category_into_series(id_series)

@app.route('/series/<id_series>/deletecategory', methods=['POST'])
def delete_category_from_series(id_series):
    return SeriesClient.delete_category_from_series(id_series)

@app.route('/series/<id_series>/puttrailer', methods=['POST'])
def put_trailer_into_series(id_series):
    return SeriesClient.put_trailer_into_series(id_series)

@app.route('/series/<id_series>/deletetrailer', methods=['POST'])
def delete_trailer_from_series(id_series):
    return SeriesClient.delete_trailer_from_series(id_series)

@app.route('/seasons', methods=['GET'])
def seasons():
    return render_template('seasons.html')

@app.route('/seasons/all', methods=['GET'])
def all_seasons():
    return SeasonsClient.get_all_seasons()

@app.route('/seasons/create', methods=['POST'])
def create_seasons():
    return SeasonsClient.add_season()

@app.route('/seasons/delete/<int:id_season>', methods=['POST'])
def delete_seasons(id_season):
    return SeasonsClient.delete_season(id_season)

@app.route('/seasons/update/<int:id_season>', methods=['POST'])
def put_seasons(id_season):
    return SeasonsClient.put_season(id_season)

@app.route('/seasons/delete', methods=['POST'])
def delete_seasons_form():
    return SeasonsClient.delete_season_form()

@app.route('/seasons/update', methods=['POST'])
def put_seasons_form():
    return SeasonsClient.put_season_form()

@app.route('/seasons/<int:id_season>', methods=['GET'])
def seasons_info(id_season):
    return SeasonsClient.get_season_by_id(id_season)

@app.route('/seasons/<int:id_season>/chapters', methods=['GET'])
def get_season_chapters(id_season):
    return SeasonsClient.get_season_chapters(id_season)

@app.route('/seasons/<int:id_season>/characters', methods=['GET'])
def get_season_characters(id_season):
    return SeasonsClient.get_season_characters(id_season)

@app.route('/seasons/<int:id_season>/participants', methods=['GET'])
def get_season_participants(id_season):
    return SeasonsClient.get_season_participants(id_season)

@app.route('/seasons/<int:id_season>/putchapter', methods=['POST'])
def put_chapter_into_seasons(id_season):
    return SeasonsClient.put_chapter_into_season(id_season)

@app.route('/seasons/<int:id_season>/deletechapter', methods=['POST'])
def delete_chapter_from_seasons(id_season):
    return SeasonsClient.delete_chapter_from_season(id_season)

@app.route('/seasons/<int:id_season>/putcategory', methods=['POST'])
def put_category_into_seasons(id_season):
    return SeasonsClient.put_category_into_season(id_season)

@app.route('/seasons/<int:id_season>/deletecategory', methods=['POST'])
def delete_category_from_seasons(id_season):
    return SeasonsClient.delete_category_from_season(id_season)

@app.route('/seasons/<int:id_season>/puttrailer', methods=['POST'])
def put_trailer_into_seasons(id_season):
    return SeasonsClient.put_trailer_into_season(id_season)

@app.route('/seasons/<int:id_season>/deletetrailer', methods=['POST'])
def delete_trailer_from_seasons(id_season):
    return SeasonsClient.delete_trailer_from_season(id_season)

@app.route('/chapters', methods=['GET'])
def chapters():
    return render_template('chapters.html')

@app.route('/chapters/all', methods=['GET'])
def all_chapters():
    return ChaptersClient.get_all_chapters()

@app.route('/chapters/create', methods=['POST'])
def create_chapter():
    return ChaptersClient.add_chapter()

@app.route('/chapters/delete', methods=['POST'])
def delete_chapter():
    return ChaptersClient.delete_chapter_form()

@app.route('/chapters/delete/<int:id_chapter>', methods=['POST'])
def delete_chapter_form(id_chapter):
    return ChaptersClient.delete_chapter(id_chapter)

@app.route('/chapters/update/<int:id_chapter>', methods=['POST'])
def put_chapter(id_chapter):
    return ChaptersClient.put_chapter(id_chapter)

@app.route('/chapters/update', methods=['POST'])
def put_chapter_form():
    return ChaptersClient.put_chapter_form()

@app.route('/chapters/<int:id_chapter>', methods=['GET'])
def get_chapter_by_id(id_chapter):
    return ChaptersClient.get_chapter_by_id(id_chapter)

@app.route('/categories', methods=['GET'])
def categories():
    return render_template('categories.html')

@app.route('/categories/create', methods=['POST'])
def add_category():
    return CategoriesClient.add_category()

@app.route('/categories/<int:id_category>', methods=['GET'])
def get_category_by_id(id_category):
    return CategoriesClient.get_category_by_id(id_category)

@app.route('/categories/all', methods=['GET'])
def get_all_categories():
    return CategoriesClient.get_all_categories()

@app.route('/categories/<int:id_category>/content', methods=['GET'])
def get_content_by_category(id_category):
    return CategoriesClient.get_content_by_category(id_category)

@app.route('/participants', methods=['GET'])
def participants():
    return render_template('participants.html')

@app.route('/participants/create', methods=['POST'])
def add_participant():
    return ParticipantsClient.add_participant()

@app.route('/participants/delete', methods=['POST'])
def delete_participant_form():
    return ParticipantsClient.delete_participant_form()

@app.route('/participants/delete/<int:id_participant>', methods=['POST'])
def delete_participant(id_participant):
    return ParticipantsClient.delete_participant(id_participant)

@app.route('/participants/update', methods=['POST'])
def put_participant_form():
    return ParticipantsClient.put_participant_form()

@app.route('/participants/update/<int:id_participant>', methods=['POST'])
def put_participant(id_participant):
    return ParticipantsClient.put_participant(id_participant)

@app.route('/participants/<int:id_participant>', methods=['GET'])
def get_participant_by_id(id_participant):
    return ParticipantsClient.get_participant_by_id(id_participant)

@app.route('/participants/<int:id_participant>/content', methods=['GET'])
def get_content_by_participant(id_participant):
    return ParticipantsClient.get_content_by_participant(id_participant)

@app.route('/participants/name', methods=['GET'])
def get_participant_by_name():
    return ParticipantsClient.get_participant_by_name()

@app.route('/participants/surname', methods=['GET'])
def get_participant_by_surname():
    return ParticipantsClient.get_participant_by_surname()

@app.route('/participants/nationality', methods=['GET'])
def get_participant_by_nationality():
    return ParticipantsClient.get_participant_by_nationality()

@app.route('/participants/age', methods=['GET'])
def get_participant_by_age():
    return ParticipantsClient.get_participant_by_age()

@app.route('/participants/all', methods=['GET'])
def get_all_participants():
    return ParticipantsClient.get_all_participants()

@app.route('/characters', methods=['GET'])
def characters():
    return render_template('characters.html')

@app.route('/characters/create', methods=['POST'])
def add_character():
    return CharactersClient.add_character()

@app.route('/characters/delete', methods=['POST'])
def delete_character_form():
    return CharactersClient.delete_character_form()

@app.route('/characters/delete/<int:id_character>', methods=['POST'])
def delete_character(id_character):
    return CharactersClient.delete_character(id_character)

@app.route('/characters/update', methods=['POST'])
def put_character_form():
    return CharactersClient.put_character_form()

@app.route('/characters/update/<int:id_character>', methods=['POST'])
def put_character(id_character):
    return CharactersClient.put_character(id_character)

@app.route('/characters/<int:id_character>', methods=['GET'])
def get_character_by_id(id_character):
    return CharactersClient.get_character_by_id(id_character)

@app.route('/characters/name', methods=['GET'])
def get_character_by_name():
    return CharactersClient.get_character_by_name()

@app.route('/characters/age', methods=['GET'])
def get_character_by_age():
    return CharactersClient.get_character_by_age()

@app.route('/characters/all', methods=['GET'])
def get_all_characters():
    return CharactersClient.get_all_characters()

@app.route('/trailers', methods=['GET'])
def trailers():
    return render_template('trailers.html')

@app.route('/trailers/all', methods=['GET'])
def all_trailers():
    return TrailersClient.get_all_trailers()

@app.route('/trailers/create', methods=['POST'])
def create_trailer():
    return TrailersClient.add_trailer()

@app.route('/trailers/delete', methods=['POST'])
def delete_trailer():
    return TrailersClient.delete_trailer_form()

@app.route('/trailers/delete/<int:id_trailer>', methods=['POST'])
def delete_trailer_form(id_trailer):
    return TrailersClient.delete_trailer(id_trailer)

@app.route('/trailers/update/<int:id_trailer>', methods=['POST'])
def put_trailer(id_trailer):
    return TrailersClient.put_trailer(id_trailer)

@app.route('/trailers/update', methods=['POST'])
def put_trailer_form():
    return TrailersClient.put_trailer_form()

@app.route('/trailers/<int:id_trailer>', methods=['GET'])
def get_trailer_by_id(id_trailer):
    return TrailersClient.get_trailer_by_id(id_trailer)

@app.route('/trailers/<id_trailer>/putcategory', methods=['POST'])
def put_category_into_trailer(id_trailer):
    return TrailersClient.put_category_into_trailer(id_trailer)

@app.route('/trailers/<id_trailer>/deletecategory', methods=['POST'])
def delete_category_from_trailer(id_trailer):
    return TrailersClient.delete_category_from_trailer(id_trailer)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
