from google.appengine.ext import ndb

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