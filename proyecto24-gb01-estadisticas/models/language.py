class Language:
    def __init__(self, id_language, name):
        self.id_language = id_language
        self.name = name

    def to_db_collection(self):
        return {
            'id_language': self.id_language,
            'name': self.name
        }
