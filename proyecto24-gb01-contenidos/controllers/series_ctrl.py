from flask import render_template, request, jsonify, redirect, url_for
from pymongo.collection import Collection
from database import get_next_sequence_value as get_next_sequence_value
from models.series import Series
from controllers.season_ctrl import SeasonCtrl
from controllers.ok_ctrl import OkCtrl
from clients.view_client import ViewClient

class SeriesCtrl:

    err_msg = 'Missing data or incorrect method';
    series_not_found_msg = 'Series no encontrada';
    not_found = '404 Not Found';
    bad_request = '400 Bad Request';

    @staticmethod
    def render_template(db: Collection):
        series_received = db.find()
        return render_template('Series.html', series=series_received)

    # --------------------------------------------------------------

    @staticmethod
    def add_series(db: Collection):
        id_series = int(get_next_sequence_value(db, "id_series"))
        title = request.form.get('title')
        duration = request.form.get('duration')
        url_title_page = request.form.get('url_title_page')
        release_date = request.form.get('release_date')
        synopsis = request.form.get('synopsis')
        description = request.form.get('description')
        is_subscription = request.form.get('is_subscription')

        if id_series:
            series = Series(id_series=id_series,
                            title=title,
                            duration=duration,
                            url_title_page=url_title_page,
                            release_date=release_date,
                            synopsis=synopsis,
                            description=description,
                            is_subscription=is_subscription,
                            languages=[],
                            categories=[],
                            characters=[],
                            participants=[],
                            seasons=[],
                            trailer=None)


            db.insert_one(series.to_db_collection())
            return OkCtrl.added('Series')
        else:
            return jsonify({'error': 'Series no añadida', 'status': SeriesCtrl.not_found}), 404

    # --------------------------------------------------------------

    @staticmethod
    def get_series_by_title(db: Collection):
        title = request.args.get('title')

        if title:
            matching_series = db.find({'title': {'$regex': title, '$options': 'i'}})

            if db.count_documents({'title': {'$regex': title, '$options': 'i'}}) > 0:
                series_found = [
                    {
                        'id_series': series.get('id_series'),
                        'title': series.get('title'),
                        'duration': series.get('duration'),
                        'url_title_page': series.get('url_title_page'),
                        'release_date': series.get('release_date'),
                        'synopsis': series.get('synopsis'),
                        'description': series.get('description'),
                        'is_subscription': series.get('is_subscription'),  # OJO
                        'seasons': series.get('seasons'),
                        'languages': series.get('languages'),
                        'categories': series.get('categories'),
                        'characters': series.get('characters'),
                        'participants': series.get('participants'),
                        'trailer': series.get('trailer')
                    }
                    for series in matching_series
                ]
                return jsonify(series_found), 200

            else:
                return jsonify({'error': 'No se han encontrado series', 'status': SeriesCtrl.not_found}), 404

        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    # --------------------------------------------------------------

    @staticmethod
    def get_series_by_id(db: Collection, id_series: int):
        if id_series:
            id_series = int(id_series)
            matching_series = db.find({'id_series': id_series})
            series_found = [
                {
                    'id_series': series.get('id_series'),
                    'title': series.get('title'),
                    'duration': series.get('duration'),
                    'url_title_page': series.get('url_title_page'),
                    'release_date': series.get('release_date'),
                    'synopsis': series.get('synopsis'),
                    'description': series.get('description'),
                    'is_subscription': series.get('is_subscription'),
                    'seasons': series.get('seasons'),
                    'languages': series.get('languages'),
                    'categories': series.get('categories'),
                    'characters': series.get('characters'),
                    'participants': series.get('participants'),
                    'trailer': series.get('trailer')
                }
                for series in matching_series
            ]
            if series_found.__len__()>0:
                ViewClient.add_view_to_content(id_content=id_series, content_type=2)

                return jsonify(series_found), 200
            else:
                return jsonify({'error': SeriesCtrl.series_not_found_msg, 'status': SeriesCtrl.not_found}), 404

        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    # --------------------------------------------------------------

    @staticmethod
    def get_series_characters(id_series: int,series_collection: Collection, character_collection: Collection):

        if id_series:
            matching_series = series_collection.find({'id_series': id_series})

            if matching_series:
                characters_list = []

                for series in matching_series:
                    character_ids = series.get('character', [])

                    for id_character in character_ids:

                        if id_character and id_character.strip().isdigit():
                            matching_character = character_collection.find({'id_character': int(id_character)})

                            for character in matching_character:
                                characters_list.append({
                                    'id_character': character.get('id_character'),
                                    'name': character.get('name'),
                                    'participant': character.get('participant'),
                                    'age': character.get('age')
                                })
                        else:
                            print(f"id_character inválido encontrado: {id_character}")
                return jsonify(characters_list), 200

            else:
                return jsonify({'error': SeriesCtrl.series_not_found_msg, 'status': SeriesCtrl.not_found}), 404

        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    # --------------------------------------------------------------

    @staticmethod
    def get_series_chapters(id_series: int, series_collection: Collection, season_collection: Collection):

        if id_series:
            matching_series = series_collection.find({'id_series': id_series})

            if matching_series:
                seasons_list = []

                for series in matching_series:
                    seasons_ids = series.get('seasons', [])
                    print(seasons_ids)

                    for id_season in seasons_ids:

                        if id_season and id_season.strip().isdigit():
                            matching_season = season_collection.find(
                                {'id_season': int(id_season), 'id_series': int(id_series)})

                            for season in matching_season:
                                seasons_list.append({
                                    'id_season': season.get('id_season'),
                                    'id_series': season.get('id_series'),
                                    'title': season.get('title'),
                                    'season_number': season.get('season_number'),
                                    'total_chapters': season.get('total_chapters'),
                                    'chapters': season.get('chapters'),
                                    'characters': season.get('characters'),
                                    'participants': season.get('participants'),
                                    'trailer': season.get('trailer')
                                })

                return jsonify(seasons_list), 200

            else:
                return jsonify({'error': SeriesCtrl.series_not_found_msg, 'status': SeriesCtrl.not_found}), 404

        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    # --------------------------------------------------------------

    @staticmethod
    def get_series_participants(id_series: int,series_collection, participants_collection):

        if id_series:
            matching_series = series_collection.find({'id_series': id_series})

            if matching_series:
                participants_list = []

                for series in matching_series:
                    participants_ids = series.get('participant', [])

                    for id_participant in participants_ids:

                        if id_participant and id_participant.strip().isdigit():
                            matching_participant = participants_collection.find({'id_participant': int(id_participant)})

                            for participant in matching_participant:
                                participants_list.append({
                                    'name': participant.get('name'),
                                    'surname': participant.get('surname'),
                                    'age': participant.get('age'),
                                    'nationality': participant.get('nationality')
                                })
                        else:
                            print(f"id_participant inválido encontrado: {id_participant}")
                return jsonify(participants_list), 200

            else:
                return jsonify({'error': SeriesCtrl.series_not_found_msg, 'status': SeriesCtrl.not_found}), 404

        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    # --------------------------------------------------------------

    @staticmethod
    def get_all_series(db: Collection):
        all_series = db.find()

        if db.count_documents({}) > 0:
            series_list = [
                {
                    'id_series': series.get('id_series'),
                    'title': series.get('title'),
                    'duration': series.get('duration'),
                    'url_title_page': series.get('url_title_page'),
                    'release_date': series.get('release_date'),
                    'synopsis': series.get('synopsis'),
                    'description': series.get('description'),
                    'is_subscription': series.get('is_subscription'),
                    'seasons': series.get('seasons'),
                    'languages': series.get('languages'),
                    'categories': series.get('categories'),
                    'characters': series.get('characters'),
                    'participants': series.get('participants'),
                    'trailer': series.get('trailer')
                }
                for series in all_series
            ]
            return jsonify(series_list), 200

        else:
            return jsonify({'error': 'No existen películas insertadas', 'status': SeriesCtrl.not_found}), 404

    # --------------------------------------------------------------

    @staticmethod
    def delete_series(db: Collection, id_series: int):
        if id_series:
            id_series = int(id_series)
            if db.delete_one({'id_series': id_series}):
                return OkCtrl.deleted('Series')
            else:
                return jsonify({'error': 'Series not found or not deleted', 'status': SeriesCtrl.not_found}), 404
        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    # --------------------------------------------------------------

    @staticmethod
    def delete_series_form(db: Collection):
        id_series = int(request.form.get('id_series'))
        return SeriesCtrl.delete_series(db, id_series)

    @staticmethod
    def put_series_form(db: Collection):
        id_series = int(request.form.get('id_series'))
        return SeriesCtrl.put_series(db, id_series)

    @staticmethod
    def put_series(db: Collection, id_series: int):
        if id_series:
            id_series = int(id_series)
            title = request.form.get('title')
            duration = request.form.get('duration')
            seasons = request.form.get('seasons[]')
            url_title_page = request.form.get('url_title_page')
            release_date = request.form.get('release_date')
            synopsis = request.form.get('synopsis')
            description = request.form.get('description')
            is_subscription = request.form.get('is_subscription')

            if not id_series:
                return jsonify({'error': 'Identificador de series requerido', 'status': SeriesCtrl.bad_request}), 400

            filter_dict = {'id_series': id_series}

            update_fields = {}

            if title:
                update_fields['title'] = title
            if duration:
                update_fields['duration'] = int(duration)
            if seasons:
                update_fields['seasons'] = seasons
            if url_title_page:
                update_fields['url_title_page'] = url_title_page
            if release_date:
                update_fields['release_date'] = release_date
            if synopsis:
                update_fields['synopsis'] = synopsis
            if description:
                update_fields['description'] = description
            if is_subscription:
                update_fields['is_subscription'] = is_subscription

            change = {'$set': update_fields}

            return SeriesCtrl.update_series(db, filter_dict, change)

        return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    @staticmethod
    def put_trailer_into_series(series: Collection, trailers: Collection, id_series: int):
        id_trailer = request.form.get('id_trailer')
        if id_trailer:
            id_trailer = int(id_trailer)
            if trailers.find({'id_trailer': id_trailer}):
                filter_dict = {'id_series': int(id_series)}
                change = {'$set': {'trailer': id_trailer}}
                return SeriesCtrl.update_series(series, filter_dict, change)
            else:
                return jsonify({'error': 'No trailer was found', 'status': SeriesCtrl.not_found}), 400
        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    @staticmethod
    def delete_trailer_from_series(db: Collection, id_series:int):
        if id_series:
            filter_dict = {'id_series': int(id_series)}
            change = {'$set': {'trailer': None}}
            return SeriesCtrl.update_series(db, filter_dict, change)
        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    @staticmethod
    def put_category_into_series(series: Collection, categories: Collection, id_series: int):
        id_category = request.form.get('id_category')
        if id_category:
            id_category = int(id_category)
            if categories.find({'id_category': id_category}):
                filter_dict = {'id_series': int(id_series)}
                change = {'$addToSet': {'categories': id_category}}
                return SeriesCtrl.update_series(series, filter_dict, change)
            else:
                return jsonify({'error': 'No category was found', 'status': SeriesCtrl.not_found}), 400
        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    @staticmethod
    def delete_category_from_series(series: Collection, id_series: int):
        id_category = request.form.get('id_category')
        if id_category:
            id_category = int(id_category)
            filter_dict = {'id_series': int(id_series)}
            series_updated = series.find_one(filter_dict)
            if series_updated and id_category in series.get('categories', []):  
                change = {'$pull': {'categories': id_category}} 

            return SeriesCtrl.update_series(series, filter_dict, change)
        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    @staticmethod
    def put_season_into_series(series: Collection, seasons: Collection, id_series: int):
        id_season = request.form.get('id_season')
        if id_season:
            id_season = int(id_season)
            if seasons.find({'id_season': id_season}):
                filter_dict = {'id_series': int(id_series)}
                change = {'$addToSet': {'seasons': id_season}}
                SeasonCtrl.update_season_series(seasons, id_season, id_series)
                return SeriesCtrl.update_series(series, filter_dict, change)
            else:
                return jsonify({'error': 'No season was found', 'status': SeriesCtrl.not_found}), 400
        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    @staticmethod
    def delete_season_from_series(series: Collection, id_series: int):
        id_season = request.form.get('id_season')
        if id_season:
            id_season = int(id_season)
            filter_dict = {'id_series': int(id_series)}
            series = series.find_one(filter_dict)
            if series and id_season in series.get('seasons', []):  
                change = {'$pull': {'seasons': id_category}} 

            return SeriesCtrl.update_series(series, filter_dict, change)
        else:
            return jsonify({'error': SeriesCtrl.err_msg, 'status': SeriesCtrl.bad_request}), 400

    @staticmethod
    def update_series(db: Collection, filter_dict: dict[str, int], change_dict: dict[str, dict]):
        result = db.update_one(filter_dict, change_dict)
        print(result)
        if result.matched_count == 0:
            return jsonify({'error': 'Series not found or not updated', 'status': SeriesCtrl.not_found}), 404
        elif result.modified_count == 0:
            return jsonify({'message': 'There was no nothing to be updated or deleted', 'status': '200 OK'}), 200
        return OkCtrl.updated('Series')

