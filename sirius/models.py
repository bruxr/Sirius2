import json
from crypt import encrypt, decrypt
from google.appengine.ext import ndb

class File(ndb.Model):
    """Represents a single project file, resource or media.
    
    When a file is uploaded, it is written to persistent storage like
    Google Cloud Storage then a corresponding instance of this class is created and saved to the database.
    
    Properties:
        name - file name
        type - mime type
        size - file size in bytes
        path - canonical resource path to the file
        date - upload date
    """
    name = ndb.StringProperty(required=True)
    type = ndb.StringProperty(required=True, indexed=False)
    size = ndb.IntegerProperty(required=True)
    path = ndb.TextProperty()
    date = ndb.DateTimeProperty(required=True, indexed=True, auto_now_add=True)

    @classmethod
    def get_all(cls, project):
        """Retrieves files stored in the database."""
        return cls.query(ancestor=project).order(-File.date).fetch()
        
    @classmethod
    def get_by_name(cls, project, name):
        """Retrieves a file with the specified filename."""
        return cls.query(ancestor=project).filter(File.name == name).get()

    def json(self):
        """Returns a hash depicting the JSON representation of this file"""
        return {
            'id': self.key.id(),
            'name': self.name,
            'type': self.type,
            'size': self.size,
            'date': self.date.isoformat()
        }

class Integration(ndb.Model):
    kind = ndb.StringProperty(required=True, indexed=False)
    data = ndb.TextProperty()

    @classmethod
    def get_all(cls, project):
        return cls.query(ancestor=project).fetch()

    def set_data(self, data):
        self._data = data

        if not isinstance(data, basestring):
            data = json.dumps(data)
        self.data = encrypt(data)

    def get_data(self):
        if not hasattr(self, '_data'):
            self._data = decrypt(self.data)
            self._data = json.loads(self._data)

        return self._data

    def json(self):
        return { 'id': self.key.id(), 'kind': self.kind, 'data': self.get_data() }

class Project(ndb.Model):
    name = ndb.StringProperty(required=True, indexed=False)
    url = ndb.TextProperty(required=True)
    desc = ndb.TextProperty()
    status = ndb.StringProperty(choices=['active', 'inactive', 'archived'], indexed=False, default='active')
    created = ndb.DateTimeProperty(auto_now_add=True, indexed=False)
    updated = ndb.DateTimeProperty(auto_now=True)

    @classmethod
    def get_all(cls):
        return cls.query().order(-cls.updated)

    def path(self):
        return '/projects/' + str(self.key.id())

    def json(self):
        return {
            'id': self.key.id(),
            'name': self.name,
            'url': self.url,
            'desc': self.desc,
            'status': self.status,
            'created': self.created.isoformat(),
            'updated': self.updated.isoformat()
        }