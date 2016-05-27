import json
from crypt import encrypt, decrypt
from google.appengine.ext import ndb

class Addon(ndb.Model):
    """Represents a single project add-on.

    The add-on type is stored as the entity's ID:
        sftp = Addon(id='sftp')

    This ensures that there can be no duplicate
    addons under a project.

    Properties:
        data -- add-on data or details.
    """
    data = ndb.TextProperty()

    @classmethod
    def get_all(cls, project):
        return cls.query(ancestor=project).fetch()

    def set_data(self, data):
        """Set information/data about the addon.

        Use this instead of setting the properly directly
        so sensitive info are encrypted when stored.

        Args:
            data - addon data.
        """
        self.data = encrypt(data)

    def get_data(self):
        """Retrieve addon information/data.

        Use this instead of accessing the data property
        directly so encrypted info is automatically decrypted

        Returns:
            Dictionary containing addon data.
        """
        return decrypt(self.data)

    def json(self):
        return {
            'id': self.key.id(),
            'data': self.get_data()
        }

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

class Project(ndb.Model):
    name = ndb.StringProperty(required=True, indexed=False)
    url = ndb.TextProperty(required=True)
    desc = ndb.TextProperty()
    status = ndb.IntegerProperty(choices=[0, 1], indexed=False, default=1)
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