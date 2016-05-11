from google.appengine.api import urlfetch
from sirius.projects.models import Project
from sirius.errors import RecordNotFoundError

def setup_sentry(params):
    """Initializes a project in Sentry for a Sirius project.

    Args:
        project_id - ID of the project in Sirius
    """
    project_id = long(params['project_id'])
    project = Project.get_by_id(project_id)
    if project is None:
        raise RecordNotFoundError('Cannot find project with the given ID', project_id)

    payload = '{"name":"%s"}' % project.name
    headers = {'Content-Type': 'application/json'}
    print('creating sentry instance for %s' % project.name)