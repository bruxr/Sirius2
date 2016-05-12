import json
from crypt import encrypt, decrypt
from google.appengine.ext import ndb

class Contract(ndb.Model):
    """Represents a single contract. Contracts are created
    for a single work order and encapsulates invoices.

    Attributes:
        name -- contract name
        desc -- contract description
        amount -- total contract amount in cents
        alloted_time -- for fixed-rate contracts. number of minutes alloted for a contract. null for floating type contracts.
        rate -- USD per hour. in cents
        rate_type -- floating (1) or fixed (2)
        invoices -- array of invoices in (ID, name, status, amount) form
        started_at -- the first time the contract has started
        ended_at -- the recent time when the time has stopped
    """
    name = ndb.StringProperty(required=True, indexed=False)
    desc = ndb.TextProperty()
    amount = ndb.IntegerProperty(default=0)
    time = ndb.IntegerProperty(default=0)
    alloted_time = ndb.IntegerProperty(default=None)
    rate = ndb.IntegerProperty(default=None)
    rate_type = ndb.IntegerProperty()
    invoices = ndb.JsonProperty(default=[])
    started_at = ndb.DateTimeProperty()
    ended_at = ndb.DateTimeProperty()

    @classmethod
    def get_all(cls, project):
        """Retrieves contracts stored in the database."""
        return cls.query(ancestor=project).fetch()

    def json(self):
        """Returns a hash depicting the JSON representation of this contract"""
        json = {
            'id': self.key.id(),
            'name': self.name,
            'desc': self.desc,
            'amount': self.amount,
            'alloted_time': self.alloted_time,
            'rate': self.rate,
            'rate_type': self.rate_type,
            'invoices': [],
            'started_at': None,
            'ended_at': None
        }

        for index, invoice in enumerate(self.invoices):
            json['invoices'].append({
                'id': index,
                'name': invoice[1],
                'status': invoice[2],
                'amount': invoice[3]
            })

        if self.started_at is not None:
            json['started_at'] = self.started_at.isoformat()

        if self.ended_at is not None:
            json['ended_at'] = self.ended_at.isoformat()

        return json

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