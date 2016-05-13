import os
import urllib
from sirius.models import Project
import sirius.services.sentry as sentry
from google.appengine.api import urlfetch
from google.appengine.api import app_identity
from sirius.errors import RecordNotFoundError

def sentry_setup(data):
    project_id = long(data['project_id'])

    project = Project.get_by_id(project_id)
    if project is None:
        raise RecordNotFoundError('Project', project_id)

    slug = sentry.create_project(project.name)
    dsn = sentry.create_key(slug)

    if 'Development' in os.environ['SERVER_SOFTWARE']:
        app_url = 'http://'
    else:
        app_url = 'https://'
    app_url += app_identity.get_default_version_hostname()
    
    headers = {'Content-type': 'application/json'}
    payload = urllib.urlencode({'kind': 'sentry', 'data': {'slug': slug, 'dsn': dsn}})
    url = '{0}/projects/{1}/integrations'.format(app_url, project_id)

    urlfetch.fetch(
        url=url,
        payload=payload,
        method=urlfetch.POST,
        headers=headers
    )