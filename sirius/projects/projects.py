from models import Project
from flask import Blueprint, abort, redirect, render_template, request, url_for

app = Blueprint('projects', __name__,
                template_folder='templates')

@app.route('/projects')
def index():
    projects = Project.get_all()
    return render_template('index.html', projects=projects)

@app.route('/projects', methods=['POST'])
def create():
    name = request.form['name'].strip()
    if (name == ''): abort(400)

    url = request.form['url'].strip()
    if (url == ''): abort(400)

    desc = request.form['desc'].strip()

    project = Project(name=name, url=url, desc=desc)
    project.put()

    redirect('/projects/' + str(project.key.id()))

@app.route('/projects/<int:project_id>', methods=['GET'])
def show(project_id):
    project = Project.get_by_id(long(project_id))
    if (project == None):
        return abort(404)
    else:
        return render_template('show.html', project=project)

@app.route('/projects/<int:project_id>', methods=['PATCH'])
def update(project_id):
    abort(503)

@app.route('/projects/<int:project_id>', methods=['DELETE'])
def destroy(project_id):
    abort(503)