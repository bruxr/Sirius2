from models import Project
from flask import Blueprint, abort, redirect, render_template, url_for

app = Blueprint('projects', __name__,
                template_folder='templates')

@app.route('/')
def index():
    projects = Project.get_all()
    return render_template('index.html', projects=projects)

@app.route('/', methods=['POST'])
def create():
    name = self.request.get('name').strip()
    if (name == ''): abort(400)

    url = self.request.get('url').strip()
    if (url == ''): abort(400)

    desc = self.request.get('desc').strip()

    project = Project(name=name, url=url, desc=desc)
    project.put()

    redirect(url_for('.show'))

@app.route('/<int:project_id>', methods=['GET'])
def show(project_id):
    project = Project.get_by_id(long(project_id))
    if (project == None):
        return abort(404)
    else:
        return render_template('show.html', project=project)

@app.route('/<int:project_id>', methods=['PATCH'])
def update(project_id):
    abort(503)

@app.route('/<int:project_id>', methods=['DELETE'])
def update(project_id):
    abort(503)