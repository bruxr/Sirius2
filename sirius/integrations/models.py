import json
from sirius.crypt import encrypt, decrypt
from google.appengine.ext import ndb

class Integration(ndb.Model):
    kind = ndb.StringProperty(required=True, indexed=False)
    data = ndb.TextProperty()

    @classmethod
    def get_all(cls, project):
        return cls.query(ancestor=project).order(cls.kind).fetch()

    def set_data(self, data):
        if not isinstance(data, basestring):
            data = json.dumps(data)

        self._data = encrypt(data)
        self.data = self._data

    def get_data(self):
        if not hasattr(self, '_data'):
            self._data = decrypt(self.data)
            self._data = json.loads(self._data)

        return self._data

    def json(self):
        return { 'id': self.key.id(), 'kind': self.kind, 'data': self.get_data() }