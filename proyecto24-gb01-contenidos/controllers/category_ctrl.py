from flask import render_template, request, jsonify, redirect, url_for
from pymongo.collection import Collection

from database import get_next_sequence_value as get_next_sequence_value
from models.category import Category
from controllers.ok_ctrl import OkCtrl
from controllers.movie_ctrl import MovieCtrl
from controllers.series_ctrl import SeriesCtrl

class CategoryCtrl:

    err_msg = 'Missing data or incorrect method';
    not_found = '404 Not Found';
    bad_request = '400 Bad Request';

    @staticmethod
    def render_template(db: Collection):
        categories_received = db.find()
        return render_template('Category.html', categories=categories_received)

    # ---------------------------------------------------------

    @staticmethod
    def add_category(db: Collection):
        id_category = int(get_next_sequence_value(db, "id_category"))
        name = request.form['name']

        if id_category:
            category = Category(id_category, name)
            db.insert_one(category.to_db_collection())
            return OkCtrl.added('Category')
        else:
            return jsonify({'error': 'Categoría no insertada', 'status': CategoryCtrl.not_found}), 404

    # ---------------------------------------------------------

    @staticmethod
    def get_all_categories(db: Collection):
        all_categories = db.find()
        category_list = [
            {
                'id_category': category.get('id_category'),
                'name': category.get('name')
            }
            for category in all_categories
        ]
        if category_list.__len__() > 0:
            return jsonify(category_list), 200
        else:
            return jsonify([]), 200

    # ---------------------------------------------------------

    @staticmethod
    def get_category_by_id(db: Collection, id_category: int):
        if id_category:
            id_category = int(id_category)
            matching_category = db.find({'id_category': id_category})
            category_found = [
                {
                    'id_category': category.get('id_category'),
                    'name': category.get('name')
                }
                for category in matching_category
            ]
            if category_found.__len__() > 0:
                return jsonify(category_found), 200
            else:
                return jsonify({'error': 'Categoría no encontrada', 'status': CategoryCtrl.not_found}), 404

        else:
            return jsonify({'error': CategoryCtrl.err_msg, 'status': CategoryCtrl.bad_request}), 400

    # ---------------------------------------------------------

    @staticmethod
    def get_content_by_category(id_category: int, category_collection: Collection, movie_collection: Collection, series_collection: Collection):
        if id_category:
            matching_category = category_collection.find({'id_category': id_category})
            print(matching_category)

            if matching_category:
                content_list = []
                matching_movie = movie_collection.find({'category': {'$in': [str(id_category)]}})

                content_list.append({'Content': 'Movies'})

                for movie in matching_movie:
                    content_list.append(MovieCtrl.get_json(movie))

                content_list.append({'Content': 'Series'})
                matching_series = series_collection.find({'category': {'$in': [str(id_category)]}})

                for series in matching_series:
                    content_list.append(SeriesCtrl.get_json(series))

                return jsonify(content_list), 200

            else:
                return jsonify({'error': 'Películas y/o series no encontradas', 'status': CategoryCtrl.not_found}), 404
        else:
            return jsonify({'error': CategoryCtrl.err_msg, 'status': CategoryCtrl.bad_request}), 400
