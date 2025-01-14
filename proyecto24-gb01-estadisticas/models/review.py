class Review:
    def __init__(self, id_review, rating, commentary, idprofile, id_content, content_type):
        self.id_review = id_review
        self.rating = rating
        self.commentary = commentary
        self.idprofile = idprofile
        self.id_content = id_content
        self.content_type = content_type

    def to_db_collection(self):
        return {
            'id_review': self.id_review,
            'rating': self.rating,
            'commentary': self.commentary,
            'idprofile': self.idprofile,
            'id_content': self.id_content,
            'content_type': self.content_type
        }
