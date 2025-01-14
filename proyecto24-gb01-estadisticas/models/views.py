class View:
    def __init__(self, id_view, date_init, is_finished, date_finish, idprofile, id_content, content_type):
        self.id_view = id_view
        self.date_init = date_init
        self.is_finished = is_finished
        self.date_finish = date_finish
        self.idprofile = idprofile
        self.id_content = id_content
        self.content_type = content_type

    def to_db_collection(self):
        return {
            'id_view': self.id_view,
            'date_init': self.date_init,
            'is_finished': self.is_finished,
            'date_finish': self.date_finish,
            'idprofile': self.idprofile,
            'id_content': self.id_content,
            'content_type': self.content_type
        }
