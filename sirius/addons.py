import re
from models import Addon, Project
from flask import Blueprint, abort, jsonify, redirect, request

blueprint = Blueprint('addons', __name__,
                template_folder='templates')

@blueprint.route('/projects/<int:project_id>/addons')
def index(project_id):
    """Add-ons list API.
    
    Responds with a list of all add-ons added to a project.
    Add-ons are not sorted so the order may differ between requests.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)

    addons = []
    for i in Addon.get_all(project.key):
        addons.append(i.json())

    return jsonify(addon=addons)

@blueprint.route('/projects/<int:project_id>/addons', methods=['POST'])
def create(project_id):
    """Integrate add-on API.
    
    Processes requests for integrating an add-on to an existing project.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)

    body = request.get_json()
    addon = Addon(parent=project.key)
    addon.kind = body['kind'].strip()
    addon.data(body['data'])
    addon.put()
    return jsonify(addon=addon.json())

@blueprint.route('/projects/<int:project_id>/addon/<int:addon>', methods=['PATCH'])
def show(project_id, addon_id):
    """Update addon API.
    
    Processes requests for updating an existing addon.
    Take note that the kind field will be ignored because an existing
    addons cannot have its kind/type changed.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)
    
    addon = Addon.get_by_id(long(addon_id), parent=project.key)
    if not addon:
        return abort(404)

    body = request.get_json()
    addon.set_data(body['data'])
    addon.put()
    return jsonify(addon=addon.json())

@blueprint.route('/projects/<int:project_id>/addon/<int:addon_id>', methods=['DELETE'])
def destroy(project_id, addon_id):
    """Delete addon API.
    
    Processes requests for deleting an existing addon.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)
    
    addon = Addon.get_by_id(long(addon_id), parent=project.key)
    if not addon:
        return abort(404)

    addon.key.delete()
    return ('', 204)