import re
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

@blueprint.route('/integrations', methods=['POST'])
def create():
    project_id = request.args.get('project_id');
    project = Project.get_by_id(long(project_id))
    if project == None: abort(404)

    body = request.get_json()
    integration = Integration(parent=project.key)
    integration.kind = body['kind'].strip()
    integration.set_data(body['data'])
    integration.put()
    return jsonify(integration=integration.json())

@blueprint.route('/integrations/<int:integration_id>', methods=['PATCH'])
def show(integration_id):
    integration = Integration.get_by_id(long(integration))
    if integration == None: return abort(404)

    body = request.json()
    integration.set_data(body['data'])
    integration.put()
    return jsonify(integration=integration.json())

@blueprint.route('/integrations/<int:integration_id>', methods=['DELETE'])
def destroy(integration_id):
    integration = Integration.get_by_id(long(integration_id))
    if integration == None: return abort(404)

    integration.key.delete_async()
    return render_template('empty.html', 204)