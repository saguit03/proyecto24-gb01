from flask import render_template, request, jsonify, redirect, url_for

class OkCtrl:
    
    @staticmethod
    def added(element_type): 
        return jsonify({'message': f'{element_type} added successfully', 'status': '200 OK'}), 200
    
    @staticmethod
    def updated(element_type): 
        return jsonify({'message': f'{element_type} updated successfully', 'status': '200 OK'}), 200
    
    @staticmethod
    def deleted(element_type): 
        return jsonify({'message': f'{element_type} deleted successfully', 'status': '200 OK'}), 200