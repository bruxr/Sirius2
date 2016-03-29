from models import Integration
from sirius.projects.models import Project
from flask import Blueprint, abort, jsonify, redirect, request
from google.appengine.ext import ndb

blueprint = Blueprint('integrations', __name__,
                template_folder='templates')

@blueprint.route('/projects/<int:project_id>/integrations')
def index(project_id):
    project = Project.get_by_id(long(project_id))
    if (project == None): abort(404)

    integrations = []
    for i in Integration.get_all(project.key):
        integrations.append(i.json())

    return jsonify(integration=integrations)

@blueprint.route('/projects/<int:project_id>/integrations', methods=['POST'])
def create(project_id):
    project = Project.get_by_id(long(project_id))
    if project == None: abort(404)

    body = request.get_json()
    integration = Integration(parent=ndb.Key('Project', long(project_id)))
    integration.kind = body['kind'].strip()
    integration.set_data(body['data'])
    integration.put()
    return jsonify(integration=integration.json())

@blueprint.route('/projects/<int:project_id>', methods=['GET'])
def show(project_id):
    project = Project.get_by_id(long(project_id))
    if (project == None):
        return abort(404)
    else:
        return render_template('show.html', project=project)

@blueprint.route('/projects/<int:project_id>', methods=['PATCH'])
def update(project_id):
    abort(503)

@blueprint.route('/projects/<int:project_id>', methods=['DELETE'])
def destroy(project_id):
    abort(503)