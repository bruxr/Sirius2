import re
import logging
import storage
from models import File, Project
from werkzeug import secure_filename
from flask import Blueprint, abort, jsonify, redirect, request

blueprint = Blueprint('files', __name__)

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'zip'])

def _file_allowed(filename):
    """Returns TRUE if the provided filename and its
    extension is allowed and can be uploaded.
    
    Args:
        filename - the filename duh
    """
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
    
def _unique_filename(project, filename):
    """Generates a unique filename by checking if the
    provided filename already exists in the database.
    
    Will append '-n' to the base filename if the filename
    already exists.
    
    Args:
        filename
    """
    base, ext = filename.rsplit('.', 1);
    new_name = filename
    i = 1
    while File.get_by_name(project.key, new_name):
        new_name = base + '-' + str(i) + '.' + ext
        i += 1
    return new_name

@blueprint.route('/projects/<int:project_id>/files')
def index(project_id):
    """Files list API
    
    Allows client to list files uploaded to an existing project.
    Returns at most 25 items. Provide an offset query arg to
    paginate results:
        /projects/123/files?offset=25
    """
    
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)

    files = []
    for f in File.get_all(project.key):
        files.append(f.json())

    return jsonify(file=files)

@blueprint.route('/projects/<int:project_id>/files', methods=['POST'])
def create(project_id):
    """File upload API
    
    File uploads are processed in this endpoint. If successful, this
    will respond with the file details.
    
    Take note that this API only processes one file at a time.
    To upload multiple files, send multiple requests to this endpoint.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)

    filename = request.files.keys()[0]
    if not _file_allowed(filename):
        return abort(400)
    
    file = request.files[filename]
    filename = secure_filename(filename.strip())
    path = str(project.key.id()) + '/' + _unique_filename(project, filename)
    
    size = storage.put(file, path, file.mimetype)
    logging.info('[601] FILES: Uploaded file ' + filename + ' with ' + str(size) + ' bytes.')
    
    f = File(parent=project.key)
    f.name = filename
    f.type = file.mimetype
    f.size = size
    f.path = path
    f.put()

    return jsonify(file=f.json())
    
@blueprint.route('/projects/<int:project_id>/files/<int:file_id>', methods=['GET'])
def retrieve(project_id, file_id):
    """File download API
    
    Redirects users to a secure URL that allows them to download
    the requested file.
    """
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)

    file = File.get_by_id(long(file_id), parent=project.key)
    if not file:
        return abort(404)
    
    logging.info('[602] FILES: ' + request.remote_addr + ' has requested file '+ str(file_id))
    
    file_url = storage.get_url(file.path)
    return redirect(file_url)

@blueprint.route('/projects/<int:project_id>/files/<int:file_id>', methods=['DELETE'])
def destroy(project_id, file_id):
    """Delete file API.
    
    Processes requests for deleting a project file.
    """
    
    project = Project.get_by_id(long(project_id))
    if not project:
        return abort(404)
    
    file = File.get_by_id(long(file_id), parent=project.key)
    if not file:
        return abort(404)

    file.key.delete()
    logging.info('[603] FILES: Deleted file '+ str(file_id))
    
    return ('', 204)