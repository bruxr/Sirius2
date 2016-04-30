import json
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