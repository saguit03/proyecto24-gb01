from flask import Flask, render_template
from flask_cors import CORS
from flask_cors import cross_origin
import os

import database as dbase
from controllers.category_ctrl import CategoryCtrl
from controllers.chapter_ctrl import ChapterCtrl
from controllers.character_ctrl import CharacterCtrl
from controllers.movie_ctrl import MovieCtrl
from controllers.participant_ctrl import ParticipantCtrl
from controllers.season_ctrl import SeasonCtrl
from controllers.series_ctrl import SeriesCtrl
from controllers.trailer_ctrl import TrailerCtrl

db = dbase.conexion_mongodb()

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.

# -------------------------------------------------------------------------------------------------------

@app.route('/')
@cross_origin()
def home():
    return render_template('index.html')

# -------------------------------------------------------------------------------------------------------

@app.route('/movies')
@cross_origin()
def movies():
    return MovieCtrl.render_template(db['movies'])


@app.route('/movies', methods=['POST'])
@cross_origin()
def add_movie():
    return MovieCtrl.add_movie(db['movies'])


@app.route('/movies', methods=['DELETE'])
@cross_origin()
def delete_movie_form():
    return MovieCtrl.delete_movie_form(db['movies'])


@app.route('/movies/<id_movie>', methods=['DELETE'])
@cross_origin()
def delete_movie(id_movie):
    return MovieCtrl.delete_movie(db['movies'], id_movie)


@app.route('/movies', methods=['PUT'])
@cross_origin()
def put_movie_form():
    return MovieCtrl.put_movie_form(db['movies'])


@app.route('/movies/<id_movie>', methods=['PUT'])
@cross_origin()
def put_movie(id_movie):
    return MovieCtrl.put_movie(db['movies'], id_movie)


@app.route('/movies/<id_movie>', methods=['GET'])
@cross_origin()
def get_movie_by_id(id_movie):
    return MovieCtrl.get_movie_by_id(db['movies'], id_movie)


@app.route('/movies/all', methods=['GET'])
@cross_origin()
def get_all_movies():
    return MovieCtrl.get_all_movies(db['movies'])

@app.route('/movies/title', methods=['GET'])
@cross_origin()
def get_movie_by_title():
    return MovieCtrl.get_movie_by_title(db['movies'])


@app.route('/movies/<id_movie>/trailer', methods=['PUT'])
@cross_origin()
def put_trailer_into_movie(id_movie):
    return MovieCtrl.put_trailer_into_movie(db['movies'], db['trailers'], id_movie)


@app.route('/movies/<id_movie>/trailer', methods=['DELETE'])
@cross_origin()
def delete_trailer_from_movie(id_movie):
    return MovieCtrl.delete_trailer_from_movie(db['movies'], id_movie)


@app.route('/movies/release', methods=['GET'])
@cross_origin()
def get_movie_by_release_date():
    return MovieCtrl.get_movie_by_release_date(db['movies'])

@app.route('/movies/characters', methods=['GET'])
@cross_origin()
def get_movie_characters():
    return MovieCtrl.get_movie_characters(db['movies'], db['characters'])


@app.route('/movies/participants', methods=['GET'])
@cross_origin()
def get_movie_participants():
    return MovieCtrl.get_movie_participants(db['movies'], db['participants'])


@app.route('/movies/<id_movie>/categories', methods=['PUT'])
@cross_origin()
def put_category_into_movie(id_movie):
    return MovieCtrl.put_category_into_movie(db['movies'], db['categories'], id_movie)


@app.route('/movies/<id_movie>/categories', methods=['DELETE'])
@cross_origin()
def delete_category_from_movie(id_movie):
    return MovieCtrl.delete_category_from_movie(db['movies'], id_movie)

# -------------------------------------------------------------------------------------------------------

@app.route('/trailers')
@cross_origin()
def trailers():
    return TrailerCtrl.render_template(db['trailers'])

@app.route('/trailers/all', methods=['GET'])
@cross_origin()
def all_trailers():
    return TrailerCtrl.get_all_trailers(db['trailers'])

@app.route('/trailers', methods=['POST'])
@cross_origin()
def add_trailer():
    return TrailerCtrl.add_trailer(db['trailers'])


@app.route('/trailers', methods=['DELETE'])
@cross_origin()
def delete_trailer_form():
    return TrailerCtrl.delete_trailer_form(db['trailers'])


@app.route('/trailers', methods=['PUT'])
@cross_origin()
def put_trailer_form():
    return TrailerCtrl.put_trailer_form(db['trailers'])


@app.route('/trailers/<id_trailer>', methods=['DELETE'])
@cross_origin()
def delete_trailer(id_trailer):
    return TrailerCtrl.delete_trailer(db['trailers'], id_trailer)


@app.route('/trailers/<id_trailer>', methods=['PUT'])
@cross_origin()
def put_trailer(id_trailer):
    return TrailerCtrl.put_trailer(db['trailers'], id_trailer)


@app.route('/trailers/<id_trailer>', methods=['GET'])
@cross_origin()
def get_trailer_by_id(id_trailer):
    return TrailerCtrl.get_trailer_by_id(db['trailers'], id_trailer)


@app.route('/trailers/<id_trailer>/categories', methods=['PUT'])
@cross_origin()
def put_category_into_trailer(id_trailer):
    return TrailerCtrl.put_category_into_trailer(db['trailers'], db['categories'], id_trailer)


@app.route('/trailers/<id_trailer>/categories', methods=['DELETE'])
@cross_origin()
def delete_category_from_trailer(id_trailer):
    return TrailerCtrl.delete_category_from_trailer(db['trailers'], id_trailer)

# -------------------------------------------------------------------------------------------------------

@app.route('/chapters')
@cross_origin()
def chapters():
    return ChapterCtrl.render_template(db['chapters'])

@app.route('/chapters/all', methods=['GET'])
@cross_origin()
def get_all_chapters():
    return ChapterCtrl.get_all_chapters(db['chapters'])

@app.route('/chapters', methods=['POST'])
@cross_origin()
def add_chapter():
    return ChapterCtrl.add_chapter(db['chapters'])


@app.route('/chapters', methods=['DELETE'])
@cross_origin()
def delete_chapter_form():
    return ChapterCtrl.delete_chapter_form(db['chapters'])


@app.route('/chapters', methods=['PUT'])
@cross_origin()
def put_chapter_form():
    return ChapterCtrl.put_chapter_form(db['chapters'])


@app.route('/chapters/<id_chapter>', methods=['DELETE'])
@cross_origin()
def delete_chapter(id_chapter):
    return ChapterCtrl.delete_chapter(db['chapters'], id_chapter)


@app.route('/chapters/<id_chapter>', methods=['PUT'])
@cross_origin()
def put_chapter(id_chapter):
    return ChapterCtrl.put_chapter(db['chapters'], id_chapter)


@app.route('/chapters/<id_chapter>', methods=['GET'])
@cross_origin()
def get_chapter_by_id(id_chapter):
    return ChapterCtrl.get_chapter_by_id(db['chapters'], id_chapter)

# -------------------------------------------------------------------------------------------------------

@app.route('/seasons')
@cross_origin()
def seasons():
    return SeasonCtrl.render_template(db['seasons'])


@app.route('/seasons/all', methods=['GET'])
@cross_origin()
def get_all_seasons():
    return SeasonCtrl.get_all_seasons(db['seasons'])

@app.route('/seasons', methods=['POST'])
@cross_origin()
def add_season():
    return SeasonCtrl.add_season(db['seasons'])


@app.route('/seasons', methods=['PUT'])
@cross_origin()
def put_season_form():
    return SeasonCtrl.put_season_form(db['seasons'])


@app.route('/seasons', methods=['DELETE'])
@cross_origin()
def delete_season_form():
    return SeasonCtrl.delete_season_form(db['seasons'])


@app.route('/seasons/<id_season>', methods=['PUT'])
@cross_origin()
def put_season(id_season):
    return SeasonCtrl.put_season(db['seasons'], id_season)


@app.route('/seasons/<id_season>', methods=['DELETE'])
@cross_origin()
def delete_season(id_season):
    return SeasonCtrl.delete_season(db['seasons'], id_season)


@app.route('/seasons/<id_season>', methods=['GET'])
@cross_origin()
def get_season_by_id(id_season):
    return SeasonCtrl.get_season_by_id(db['seasons'], id_season)


@app.route('/seasons/<id_season>/chapters', methods=['GET'])
@cross_origin()
def get_season_chapters(id_season):
    return SeasonCtrl.get_season_chapters(db['seasons'], db['chapters'],id_season)


@app.route('/seasons/<id_season>/characters', methods=['GET'])
@cross_origin()
def get_season_characters(id_season):
    return SeasonCtrl.get_season_characters(db['seasons'], db['characters'],id_season)


@app.route('/seasons/<id_season>/participants', methods=['GET'])
@cross_origin()
def get_season_participants(id_season):
    return SeasonCtrl.get_season_participants(db['seasons'], db['participants'],id_season)


@app.route('/seasons/<id_season>/trailer', methods=['PUT'])
@cross_origin()
def put_trailer_into_season(id_season):
    return SeasonCtrl.put_trailer_into_season(db['seasons'], db['trailers'], id_season)


@app.route('/seasons/<id_season>/trailer', methods=['DELETE'])
@cross_origin()
def delete_trailer_from_season(id_season):
    return SeasonCtrl.delete_trailer_from_season(db['seasons'], id_season)


@app.route('/seasons/<id_season>/categories', methods=['PUT'])
@cross_origin()
def put_category_into_season(id_season):
    return SeasonCtrl.put_category_into_season(db['seasons'], db['categories'], id_season)


@app.route('/seasons/<id_season>/categories', methods=['DELETE'])
@cross_origin()
def delete_category_from_season(id_season):
    return SeasonCtrl.delete_category_from_season(db['seasons'], id_season)


@app.route('/seasons/<id_season>/chapters', methods=['PUT'])
@cross_origin()
def put_chapter_into_season(id_season):
    return SeasonCtrl.put_chapter_into_season(db['seasons'], db['chapters'], id_season)


@app.route('/seasons/<id_season>/chapters', methods=['DELETE'])
@cross_origin()
def delete_chapter_from_season(id_season):
    return SeasonCtrl.delete_chapter_from_season(db['seasons'], id_season)

# -------------------------------------------------------------------------------------------------------

@app.route('/categories')
@cross_origin()
def categories():
    return CategoryCtrl.render_template(db['categories'])


@app.route('/categories', methods=['POST'])
@cross_origin()
def add_category():
    return CategoryCtrl.add_category(db['categories'])


@app.route('/categories/all', methods=['GET'])
@cross_origin()
def get_all_categories():
    return CategoryCtrl.get_all_categories(db['categories'])


@app.route('/categories/<id_category>', methods=['GET'])
@cross_origin()
def get_category_by_id(id_category):
    return CategoryCtrl.get_category_by_id(db['categories'], id_category)

# No se borran ni se modifican categorías.

@app.route('/categories/<id_category>/content', methods=['GET'])
@cross_origin()
def get_content_by_category(id_category):
    return CategoryCtrl.get_content_by_category(id_category, db['categories'], db['movies'], db['series'])


# -------------------------------------------------------------------------------------------------------

@app.route('/participants')
@cross_origin()
def participants():
    return ParticipantCtrl.render_template(db['participants'])


@app.route('/participants', methods=['POST'])
@cross_origin()
def add_participant():
    return ParticipantCtrl.add_participant(db['participants'])


@app.route('/participants', methods=['PUT'])
@cross_origin()
def put_participant_form():
    return ParticipantCtrl.put_participant_form(db['participants'])


@app.route('/participants', methods=['DELETE'])
@cross_origin()
def delete_participant_form():
    return ParticipantCtrl.delete_participant_form(db['participants'])


@app.route('/participants/<id_participant>', methods=['PUT'])
@cross_origin()
def put_participant(id_participant):
    return ParticipantCtrl.put_participant(db['participants'], id_participant)


@app.route('/participants/<id_participant>', methods=['DELETE'])
@cross_origin()
def delete_participant(id_participant):
    return ParticipantCtrl.delete_participant(db['participants'], id_participant)


@app.route('/participants/<id_participant>', methods=['GET'])
@cross_origin()
def get_participant_by_id(id_participant):
    return ParticipantCtrl.get_participant_by_id(db['participants'], id_participant)


@app.route('/participants/name', methods=['GET'])
@cross_origin()
def get_participant_by_name():
    return ParticipantCtrl.get_participant_by_name(db['participants'])


@app.route('/participants/surname', methods=['GET'])
@cross_origin()
def get_participant_by_surname():
    return ParticipantCtrl.get_participant_by_surname(db['participants'])


@app.route('/participants/age', methods=['GET'])
@cross_origin()
def get_participant_by_age():
    return ParticipantCtrl.get_participant_by_age(db['participants'])


@app.route('/participants/nationality', methods=['GET'])
@cross_origin()
def get_participant_by_nationality():
    return ParticipantCtrl.get_participant_by_nationality(db['participants'])


@app.route('/participants/<id_participant>/content', methods=['GET'])
@cross_origin()
def get_content_by_participant(id_participant):
    return ParticipantCtrl.get_content_by_participant(id_participant, db['participants'], db['movies'], db['series'])

@app.route('/participants/all', methods=['GET'])
@cross_origin()
def get_all_participants():
    return ParticipantCtrl.get_all_participants(db['participants'])

# -------------------------------------------------------------------------------------------------------

@app.route('/characters')
@cross_origin()
def characters():
    return CharacterCtrl.render_template(db['characters'])


@app.route('/characters', methods=['POST'])
@cross_origin()
def add_character():
    return CharacterCtrl.add_character(db['characters'])


@app.route('/characters', methods=['PUT'])
@cross_origin()
def put_character_form():
    return CharacterCtrl.put_character_form(db['characters'])


@app.route('/characters', methods=['DELETE'])
@cross_origin()
def delete_character_form():
    return CharacterCtrl.delete_character_form(db['characters'])


@app.route('/characters/<id_character>', methods=['PUT'])
@cross_origin()
def put_character(id_character):
    return CharacterCtrl.put_character(db['characters'], id_character)


@app.route('/characters/<id_character>', methods=['DELETE'])
@cross_origin()
def delete_character(id_character):
    return CharacterCtrl.delete_character(db['characters'], id_character)


@app.route('/characters/<id_character>', methods=['GET'])
@cross_origin()
def get_character_by_id(id_character):
    return CharacterCtrl.get_character_by_id(db['characters'], id_character)


@app.route('/characters/name', methods=['GET'])
@cross_origin()
def get_character_by_name():
    return CharacterCtrl.get_character_by_name(db['characters'])


@app.route('/characters/age', methods=['GET'])
@cross_origin()
def get_character_by_age():
    return CharacterCtrl.get_character_by_age(db['characters'])


@app.route('/characters/all', methods=['GET'])
@cross_origin()
def get_all_characters():
    return CharacterCtrl.get_all_characters(db['characters'])


@app.route('/characters/content', methods=['GET'])
@cross_origin()
def get_content_by_character():
    return CharacterCtrl.get_content_by_character(db['characters'], db['movies'], db['series'])

# -------------------------------------------------------------------------------------------------------

@app.route('/series')
@cross_origin()
def series():
    return SeriesCtrl.render_template(db['series'])


@app.route('/series', methods=['POST'])
@cross_origin()
def add_series():
    return SeriesCtrl.add_series(db['series'])


@app.route('/series/all', methods=['GET'])
@cross_origin()
def get_all_series():
    return SeriesCtrl.get_all_series(db['series'])


@app.route('/series/title', methods=['GET'])
@cross_origin()
def get_series_by_title():
    return SeriesCtrl.get_series_by_title(db['series'])


@app.route('/series/<id_series>', methods=['GET'])
@cross_origin()
def get_series_by_id(id_series):
    return SeriesCtrl.get_series_by_id(db['series'], id_series)


@app.route('/series', methods=['DELETE'])
@cross_origin()
def delete_series_form():
    return SeriesCtrl.delete_series_form(db['series'])


@app.route('/series', methods=['PUT'])
@cross_origin()
def put_series_form():
    return SeriesCtrl.put_series_form(db['series'])


@app.route('/series/<id_series>', methods=['DELETE'])
@cross_origin()
def delete_series(id_series):
    return SeriesCtrl.delete_series(db['series'], id_series)


@app.route('/series/<id_series>', methods=['PUT'])
@cross_origin()
def put_series(id_series):
    return SeriesCtrl.put_series(db['series'], id_series)


@app.route('/series/<id_series>/chapters', methods=['GET'])
@cross_origin()
def get_series_chapters(id_series):
    return SeriesCtrl.get_series_chapters(id_series,db['series'], db['seasons'])


@app.route('/series/<id_series>/characters', methods=['GET'])
@cross_origin()
def get_series_characters(id_series):
    return SeriesCtrl.get_series_characters(id_series,db['series'], db['characters'])


@app.route('/series/<id_series>/participants', methods=['GET'])
@cross_origin()
def get_series_participants(id_series):
    return SeriesCtrl.get_series_participants(id_series,db['series'], db['participants'])


@app.route('/series/<id_series>/trailer', methods=['PUT'])
@cross_origin()
def put_trailer_into_series(id_series):
    return SeriesCtrl.put_trailer_into_series(db['series'], db['trailers'], id_series)

@app.route('/series/<id_series>/trailer', methods=['DELETE'])
@cross_origin()
def delete_trailer_from_series(id_series):
    return SeriesCtrl.delete_trailer_from_series(db['series'], id_series)


@app.route('/series/<id_series>/categories', methods=['PUT'])
@cross_origin()
def put_category_into_series(id_series):
    return SeriesCtrl.put_category_into_series(db['series'], db['categories'], id_series)

@app.route('/series/<id_series>/categories', methods=['DELETE'])
@cross_origin()
def delete_category_from_series(id_series):
    return SeriesCtrl.delete_category_from_series(db['series'], id_series)


@app.route('/series/<id_series>/seasons', methods=['PUT'])
@cross_origin()
def put_season_into_series(id_series):
    return SeriesCtrl.put_season_into_series(db['series'], db['seasons'], id_series)


@app.route('/series/<id_series>/seasons', methods=['DELETE'])
@cross_origin()
def delete_season_from_series(id_series):
    return SeriesCtrl.delete_season_from_series(db['series'], id_series)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8082)
