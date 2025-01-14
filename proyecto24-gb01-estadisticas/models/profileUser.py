class ProfileUser:
    def __init__(self, idprofile, name, iduser, id_language):
        self.idprofile = idprofile
        self.name = name,
        self.iduser = iduser,
        self.id_language = id_language

    def to_db_collection(self):
        return {
            'idprofile': self.idprofile,
            'name': self.name,
            'iduser': self.iduser,
            'id_language': self.id_language
        }
