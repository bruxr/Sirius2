import re
from models import Integration
from sirius.projects.models import Project
from flask import Blueprint, abort, jsonify, redirect, request
from google.appengine.ext import ndb

blueprint = Blueprint('integrations', __name__,
                template_folder='templates')

@blueprint.route('/projects/<int:project_id>/integrations')
def index(project_id):
    """Integrations list API.
    
    Responds with a list of all integrations added to a project.
    Integrations are not sorted so the order may differ between requests.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project: return abort(404)

    integrations = []
    for i in Integration.get_all(project.key):
        integrations.append(i.json())

    return jsonify(integration=integrations)

@blueprint.route('/projects/<int:project_id>/integrations', methods=['POST'])
def create(project_id):
    """Add integration API.
    
    Processes requests for adding an integration to an existing project.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project: return abort(404)

    body = request.get_json()
    integration = Integration(parent=project.key)
    integration.kind = body['kind'].strip()
    integration.set_data(body['data'])
    integration.put()
    return jsonify(integration=integration.json())

@blueprint.route('/projects/<int:project_id>/integrations/<int:integration_id>', methods=['PATCH'])
def show(project_id, integration_id):
    """Update integration API.
    
    Processes requests for updating an existing integration.
    Take note that the kind field will be ignored because an existing
    integration cannot have its kind/type changed.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project: return abort(404)
    
    integration = Integration.get_by_id(long(integration_id), parent=project.key)
    if not integration: return abort(404)
    body = request.get_json()
    integration.set_data(body['data'])
    integration.put()
    return jsonify(integration=integration.json())

@blueprint.route('/projects/<int:project_id>/integrations/<int:integration_id>', methods=['DELETE'])
def destroy(project_id, integration_id):
    """Delete integration API.
    
    Processes requests for deleting an existing integration.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project: return abort(404)
    
    integration = Integration.get_by_id(long(integration_id), parent=project.key)
    if not integration: return abort(404)

    integration.key.delete()
    return ('', 204)