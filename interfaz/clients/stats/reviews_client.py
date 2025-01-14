from flask import request
import os
import requests

class ReviewsClient:
    BASE_URL =  f"{os.getenv('ESTADISTICAS_URL')}reviews"

        
    @staticmethod
    def add_review():
        form_data = {
            "id_content": request.form.get('id_content'),
            "idprofile": request.form.get('idprofile'),
            "rating": request.form.get('rating'),
            "review": request.form.get('review'),
            "date_review": request.form.get('date_review'),
            "commentary": request.form.get('commentary'),
            "content_type": request.form.get('content_type'),
        }
        
        print(form_data)
        response = requests.post(ReviewsClient.BASE_URL, data=form_data)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def delete_review_form():
        id_review = request.form.get('id_review')
        url = f"{ReviewsClient.BASE_URL}/{id_review}"
        response = requests.delete(url)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def delete_review(id_review):
        url = f"{ReviewsClient.BASE_URL}/{id_review}"
        response = requests.delete(url)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def put_review_form():
        form_data = request.form.to_dict()
        url = f"{ReviewsClient.BASE_URL}"
        response = requests.put(url, data=form_data)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def put_review(id_review):
        form_data = request.form.to_dict()
        url = f"{ReviewsClient.BASE_URL}/{id_review}"
        response = requests.put(url, data=form_data)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def get_review_by_id(id_review):
        url = f"{ReviewsClient.BASE_URL}/{id_review}"
        response = requests.get(url)
        return ReviewsClient.handle_response(response)
    
    @staticmethod
    def get_all_reviews():
        url = f"{ReviewsClient.BASE_URL}/all"
        response = requests.get(url)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def get_review_contents():
        params = {'id_content': request.args.get('id_content')}
        url = f"{ReviewsClient.BASE_URL}/contents"
        response = requests.get(url, params=params)
        return ReviewsClient.handle_response(response)
    
    @staticmethod
    def get_review_profiles(idprofile):
        url = f"{ReviewsClient.BASE_URL}/profiles/{idprofile}"
        response = requests.get(url)
        return ReviewsClient.handle_response(response)
    
    @staticmethod
    def get_review_ratings():
        params = {'id_rating': request.args.get('id_rating')}
        url = f"{ReviewsClient.BASE_URL}/ratings"
        response = requests.get(url, params=params)
        return ReviewsClient.handle_response(response)
    
    @staticmethod
    def get_review_by_min_rating():
        params = {'rating': request.args.get('rating')}
        url = f"{ReviewsClient.BASE_URL}/minrating"
        response = requests.get(url, params=params)
        return ReviewsClient.handle_response(response)
    
    @staticmethod
    def get_review_by_max_rating():
        params = {'rating': request.args.get('rating')}
        url = f"{ReviewsClient.BASE_URL}/maxrating"
        response = requests.get(url, params=params)
        return ReviewsClient.handle_response(response)
    
    @staticmethod
    def get_review_stats():
        params = {'rating': request.args.get('rating')}
        url = f"{ReviewsClient.BASE_URL}/stats"
        response = requests.get(url, params=params)
        return ReviewsClient.handle_response(response)
    
    @staticmethod
    def get_review_with_comments():
        url = f"{ReviewsClient.BASE_URL}/comments"
        response = requests.get(url)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def get_review_with_no_comments():
        url = f"{ReviewsClient.BASE_URL}/nocomments"
        response = requests.get(url)
        return ReviewsClient.handle_response(response)

    @staticmethod
    def handle_response(response):
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
