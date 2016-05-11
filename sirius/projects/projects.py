import json
from models import Project
from google.appengine.ext import ndb
from google.appengine.api import taskqueue
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
    return render_template('index.html', projects=projects)

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
        taskqueue.add(url='/work/setup_sentry', params={'project_id': project.key.id()}, transactional=True)

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
        return render_template('show.html', project=project, project_json=pjson)

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