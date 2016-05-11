import os
import json
import requests
from google.appengine.ext import ndb
from models import Project, Integration
import requests_toolbelt.adapters.appengine
from google.appengine.api import app_identity, taskqueue, urlfetch
from flask import Blueprint, abort, redirect, render_template, request, url_for

app = Blueprint('projects', __name__,
                template_folder='templates')

@app.route('/a')
def index():
    """Projects index route.
    
    GET /a
    
    Lists all the projects managed by Sirius.
    The page also allows creation of new projects through
    a quick entry form.
    """
    
    projects = Project.get_all()
    return render_template('projects/index.html', projects=projects)

@app.route('/projects', methods=['POST'])
def create():
    """Create project route.
    
    Accepts submitted forms to create a new managed project.
    This will insert the project into the database and redirect
    the user to the project page afterwards.
    """
    
    name = request.form['name'].strip()
    if (name == ''): abort(400)

    url = request.form['url'].strip()
    if (url == ''): abort(400)

    desc = request.form['desc'].strip()

    project = Project(name=name, url=url, desc=desc)

    @ndb.transactional
    def insert_project():
        project.put()
        url = '/projects/' + project.key.id() + '/setup'
        taskqueue.add(url=url, params={'project_id': project.key.id()}, transactional=True)

    insert_project()
    return redirect('/a/' + str(project.key.id()))

@app.route('/a/<int:project_id>', methods=['GET'], defaults={'path': ''})
@app.route('/a/<int:project_id>/<path:path>', methods=['GET'])
def show(project_id, path):
    """Project page route.
    
    Renders the single page app (SPA) for the project. The SPA will
    be the main interface of the user to Sirius.
    """
    
    project = Project.get_by_id(long(project_id))
    if (project == None):
        return abort(404)
    else:
        pjson = json.dumps(project.json(), ensure_ascii=False)
        return render_template('projects/show.html', project=project, project_json=pjson)

@app.route('/projects/<int:project_id>', methods=['PATCH'])
def update(project_id):
    """Update project route.
    
    Processes requests for updating project details.
    Responds with the updated project details when succesful.
    
    TODO: implement this
    """
    
    abort(503)

@app.route('/projects/<int:project_id>', methods=['DELETE'])
def destroy(project_id):
    """Delete project route.
    
    Processes requests for deleting a project.
    Responds with an HTTP 204 if the project has been deleted.
    
    TODO: implement this
    """
     
    abort(503)

@app.route('/projects/<int:project_id>/setup', methods=['POST'])
def setup(project_id):
    project_id = long(project_id)
    project = Project.get_by_id(project_id)
    if project is None:
        abort(404)

    requests_toolbelt.adapters.appengine.monkeypatch()

    # Common Sentry vars
    org = os.environ['SENTRY_ORG']
    team = os.environ['SENTRY_TEAM']
    api_base = 'https://app.getsentry.com/api/0'
    headers = {
        'Authorization': 'Basic ' + os.environ['SENTRY_KEY'],
        'Content-Type': 'application/json'
    }

    # Create a project in Sentry
    payload = {'name': project.name}
    url = '{0}/teams/{1}/{2}/projects/'.format(api_base, org, team)
    result = requests.post(url, json=payload, headers=headers)
    if result.status_code != 201:
        raise RuntimeError('Failed to create a project in Sentry. Received: ' + result.text, result.status_code)

    # Register a client key for the project
    project_slug = result.json()['slug']
    payload = {'name': 'Default'}
    url = '{0}/projects/{1}/{2}/keys/'.format(api_base, org, project_slug)
    result = requests.post(url, json=payload, headers=headers)
    if result.status_code != 201:
        raise RuntimeError('Failed to create a client key in Sentry. Received: ' + result.text, result.status_code, project_id)

    # Create an integration
    if 'Development' in os.environ['SERVER_SOFTWARE']:
        app_url = 'http://'
    else:
        app_url = 'https://'
    app_url += app_identity.get_default_version_hostname()
    
    project_dsn = result.json()['dsn']['secret']
    payload = {'kind': 'sentry', 'data': {'slug': project_slug, 'dsn': project_dsn} }
    url = '{0}/projects/{1}/integrations'.format(app_url, project_id)
    requests.post(url, json=payload, headers=headers)
    if result.status_code != 201:
        raise RuntimeError('Failed to create sentry integration.', result.status_code, project_id)

    return ('', 204)