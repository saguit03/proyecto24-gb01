class User:
    def __init__(self, iduser, username, email):
        self.iduser = iduser
        self.username = username
        self.email = email

    def to_db_collection(self):
        return {
            'iduser': self.iduser,
            'username': self.username,
            'email': self.email
        }
