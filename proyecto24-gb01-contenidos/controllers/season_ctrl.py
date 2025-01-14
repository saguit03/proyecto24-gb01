from flask import render_template, request, jsonify, redirect, url_for
from pymongo.collection import Collection

from database import get_next_sequence_value as get_next_sequence_value
from models.season import Season
from controllers.ok_ctrl import OkCtrl
from clients.view_client import ViewClient


class SeasonCtrl:

    err_msg = 'Missing data or incorrect method';
    season_not_found_msg = 'Temporada no encontrada';
    not_found = '404 Not Found';
    bad_request = '400 Bad Request';

    @staticmethod
    def get_json(season):
        return {
                'id_season': season.get('id_season'),
                'id_series': season.get('id_series'),
                'title': season.get('title'),
                'season_number': season.get('season_number'),
                'total_chapters': season.get('total_chapters'),
                'chapters': season.get('chapters'),
                'characters': season.get('characters'),
                'participants': season.get('participants'),
                'trailer': season.get('trailer'),
                'views': ViewClient.get_number_views(id_content=season.get('id_season'), content_type=3)
            }

    @staticmethod
    def render_template(db: Collection):
        seasons_received = db.find()
        return render_template('Season.html', seasons=seasons_received)

    # ---------------------------------------------------------

    @staticmethod
    def add_season(db: Collection):
        id_season = int(get_next_sequence_value(db, "id_season"))
        id_series = request.form.get('id_series')
        title = request.form.get('title')
        season_number = request.form.get('season_number')
        total_chapters = 0

        if id_season:
            season = Season(id_season=id_season,
                            id_series=int(id_series), 
                            title=title, 
                            season_number=int(season_number),
                            total_chapters=total_chapters,
                            chapters=[],
                            characters=[],
                            participants=[],
                            trailer=None)

            db.insert_one(season.to_db_collection())
            return OkCtrl.added('Season')
        else:
            return jsonify({'error': 'Temporada no añadida', 'status': SeasonCtrl.not_found}), 404

    # ---------------------------------------------------------
    @staticmethod
    def delete_season(db: Collection, id_season: int):
        if id_season:
            id_season = int(id_season)
            if db.delete_one({'id_season': id_season}):
                print("Delete ok")
                return OkCtrl.deleted('Season')
            else:
                return jsonify({'error': 'Season not found or not deleted', 'status': SeasonCtrl.not_found}), 404
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    # ---------------------------------------------------------

    @staticmethod
    def delete_season_form(db: Collection):
        id_season = int(request.form.get('id_season'))
        return SeasonCtrl.delete_season(db, id_season)

    @staticmethod
    def put_season_form(db: Collection):
        id_season = int(request.form.get('id_season'))
        return SeasonCtrl.put_season(db, id_season)

    @staticmethod
    def put_season(db: Collection, id_season: int):
        if id_season:
            id_series = request.form.get('id_series')
            title = request.form.get('title')
            season_number = request.form.get('season_number')

            if not id_season:
                return jsonify({'error': 'Identificador de temporada requerido', 'status': SeasonCtrl.bad_request}), 400

            filter_dict = {'id_season': id_season}

            update_fields = {}

            if id_series:
                update_fields['id_series'] = int(id_series)
            if title:
                update_fields['title'] = title
            if season_number:
                update_fields['season_number'] = int(season_number)

            change = {'$set': update_fields}

            return SeasonCtrl.update_season(db, filter_dict, change)

        return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    # --------------------------------

    @staticmethod
    def get_season_by_id(db: Collection, id_season: int):
        if id_season:
            id_season = int(id_season)
            matching_season = db.find({'id_season': id_season})
            season_found = [
                SeasonCtrl.get_json(season)
                for season in matching_season
            ]
            if season_found.__len__()>0:
                ViewClient.add_view_to_content(id_content=id_season, content_type=3)
                return jsonify(season_found), 200
            else:
                return jsonify({'error': 'Season not found', 'status': SeasonCtrl.not_found}), 404
        return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    # --------------------------------------

    @staticmethod
    def get_season_chapters(season_collection: Collection, chapter_collection: Collection, id_season: int):

        if not id_season:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

        matching_season = season_collection.find({'id_season': id_season})

        if not matching_season:
            return jsonify({'error': SeasonCtrl.season_not_found_msg, 'status': SeasonCtrl.not_found}), 404

        result_list = []
        for season in matching_season:
            chapter_list = season.get('chapters', [])
            print(chapter_list)
            result_list.extend(SeasonCtrl.get_chapters(chapter_list, chapter_collection))

        return jsonify(result_list), 200

    @staticmethod
    def get_chapters(chapter_list, chapter_collection):
        result_list = []
        for id_chapter in chapter_list:
            if isinstance(id_chapter, (str, int)):
                id_chapter_str = str(id_chapter).strip()
                if id_chapter_str.isdigit():
                    matching_character = chapter_collection.find({'id_chapter': int(id_chapter_str)})
                    result_list.extend(SeasonCtrl.get_character_details(matching_character))
                else:
                    print(f"id_chapter inválido encontrado: {id_chapter}")
            else:
                print(f"id_chapter no es del tipo esperado: {id_chapter}")
        return result_list

    @staticmethod
    def get_character_details(matching_character):
        result_list = []
        for character in matching_character:
            result_list.append({
                'id_chapter': character.get('id_chapter'),
                'title': character.get('title'),
                'url_video': character.get('url_video'),
                'duration': character.get('duration'),
                'chapter_number': character.get('chapter_number')
            })
        return result_list

    # --------------------------------------

    @staticmethod
    def get_season_characters(season_collection: Collection, character_collection: Collection, id_season: int):

        if not id_season:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

        matching_season = season_collection.find({'id_season': id_season})

        if not matching_season:
            return jsonify({'error': SeasonCtrl.season_not_found_msg, 'status': SeasonCtrl.not_found}), 404

        characters_list = SeasonCtrl.extract_characters(matching_season, character_collection)
        return jsonify(characters_list), 200

    @staticmethod
    def extract_characters(matching_season, character_collection):
        characters_list = []
        for season in matching_season:
            character_ids = season.get('character', [])
            characters_list.extend(SeasonCtrl.get_character_details_by_ids(character_ids, character_collection))
        return characters_list

    @staticmethod
    def get_character_details_by_ids(character_ids, character_collection):
        characters_list = []
        for id_character in character_ids:
            if id_character and id_character.strip().isdigit():
                matching_character = character_collection.find({'id_character': int(id_character)})
                characters_list.extend(SeasonCtrl.get_character_details(matching_character))
            else:
                print(f"id_character inválido encontrado: {id_character}")
        return characters_list

    # --------------------------------------

    @staticmethod
    def get_season_participants(season_collection: Collection, participant_collection: Collection, id_season: int):

        if not id_season:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

        matching_season = season_collection.find({'id_season': id_season})

        if not matching_season:
            return jsonify({'error': SeasonCtrl.season_not_found_msg, 'status': SeasonCtrl.not_found}), 404

        participants_list = SeasonCtrl.extract_participants(matching_season, participant_collection)
        return jsonify(participants_list), 200

    @staticmethod
    def extract_participants(matching_season, participant_collection):
        participants_list = []
        for season in matching_season:
            participant_ids = season.get('participant', [])
            participants_list.extend(SeasonCtrl.get_participant_details_by_ids(participant_ids, participant_collection))
        return participants_list

    @staticmethod
    def get_participant_details_by_ids(participant_ids, participant_collection):
        participants_list = []
        for id_participant in participant_ids:
            if id_participant and id_participant.strip().isdigit():
                matching_participant = participant_collection.find({'id_participant': int(id_participant)})
                participants_list.extend(SeasonCtrl.get_participant_details(matching_participant))
            else:
                print(f"id_participant inválido encontrado: {id_participant}")
        return participants_list

    @staticmethod
    def get_participant_details(matching_participant):
        participants_list = []
        for participant in matching_participant:
            participants_list.append({
                'id_participant': participant.get('id_participant'),
                'name': participant.get('name'),
                'surname': participant.get('surname'),
                'age': participant.get('age')
            })
        return participants_list

    @staticmethod
    def put_trailer_into_season(seasons: Collection, trailers: Collection, id_season: int):
        id_trailer = request.args.get('id_trailer')
        if id_trailer:
            id_trailer = int(id_trailer)
            if trailers.find({'id_trailer': id_trailer}):
                filter_dict = {'id_season': int(id_season)}
                change = {'$set': {'trailer': id_trailer}}
                return SeasonCtrl.update_season(seasons, filter_dict, change)
            else:
                return jsonify({'error': 'No trailer was found', 'status': SeasonCtrl.not_found}), 400
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    @staticmethod
    def delete_trailer_from_season(db: Collection, id_season:int):
        if id_season:
            filter_dict = {'id_season': int(id_season)}
            change = {'$set': {'trailer': None}}
            return SeasonCtrl.update_season(db, filter_dict, change)
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    @staticmethod
    def put_category_into_season(seasons: Collection, categories: Collection, id_season: int):
        id_category = request.args.get('id_category')
        if id_category:
            id_category = int(id_category)
            if categories.find({'id_category': id_category}):
                filter_dict = {'id_season': int(id_season)}
                change = {'$addToSet': {'categories': id_category}}
                return SeasonCtrl.update_season(seasons, filter_dict, change)
            else:
                return jsonify({'error': 'No category was found', 'status': SeasonCtrl.not_found}), 400
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    @staticmethod
    def delete_category_from_season(seasons: Collection, id_season: int):
        id_category = request.args.get('id_category')
        if id_category:
            id_category = int(id_category)
            filter_dict = {'id_season': int(id_season)}
            season = seasons.find_one(filter_dict)
            if season and id_category in season.get('categories', []):  
                change = {'$pull': {'categories': id_category}} 

            return SeasonCtrl.update_season(seasons, filter_dict, change)
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    @staticmethod
    def put_chapter_into_season(seasons: Collection, chapters: Collection, id_season: int):
        id_chapter = request.args.get('id_chapter')
        if id_chapter:
            id_chapter = int(id_chapter)
            if chapters.find({'id_chapter': id_chapter}):
                filter_dict = {'id_season': int(id_season)}
                change = {'$addToSet': {'chapters': id_chapter}}
                return SeasonCtrl.update_season(seasons, filter_dict, change)
            else:
                return jsonify({'error': 'No chapter was found', 'status': SeasonCtrl.not_found}), 400
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400

    @staticmethod
    def delete_chapter_from_season(db: Collection, id_season: int):
        id_chapter = request.args.get('id_chapter')
        if id_chapter:
            id_chapter = int(id_chapter)
            filter_dict = {'id_season': int(id_season)}
            change = {'$pull': {'chapters': id_chapter}}
            return SeasonCtrl.update_season(db, filter_dict, change)
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400


    @staticmethod
    def update_season(db: Collection, filter_dict: dict[str, int], change_dict: dict[str, dict]):
        result = db.update_one(filter_dict, change_dict)
        print(result)
        if result.matched_count == 0:
            return jsonify({'error': 'Season not found or not updated', 'status': SeasonCtrl.not_found}), 404
        elif result.modified_count == 0:
            return jsonify({'message': 'There was no nothing to be updated or deleted', 'status': '200 OK'}), 200
        return OkCtrl.updated('Season')

    @staticmethod
    def update_season_series(db: Collection, id_season:int, id_series:int):
        if id_series and id_season:
            filter_dict = {'id_season': int(id_season)}
            change = {'$set': {'id_series': int(id_series)}}
            return SeasonCtrl.update_season(db, filter_dict, change)
        else:
            return jsonify({'error': SeasonCtrl.err_msg, 'status': SeasonCtrl.bad_request}), 400


   
    @staticmethod
    def get_all_seasons(db: Collection):
        all_seasons = db.find()

        if db.count_documents({}) > 0:
            seasons_list = [
                SeasonCtrl.get_json(season)
                for season in all_seasons
            ]
            if seasons_list.__len__()>0:
               return jsonify(seasons_list), 200
        return jsonify([]), 200
        