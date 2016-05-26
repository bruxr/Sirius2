import json
from os import environ
from services.bitbucket import BitbucketClient
from flask import abort, Blueprint, jsonify, request

blueprint = Blueprint('utils', __name__,
                template_folder='templates')

@blueprint.route('/utils/repositories')
def repositories():
    """Returns a list of Bitbucket hosted repositories."""
    bitbucket = BitbucketClient(environ['BITBUCKET_KEY'], environ['BITBUCKET_SECRET'])
    repos = {
        'bitbucket': [],
        'github': []
    }

    for repo in bitbucket.repositories():
        repos['bitbucket'].append({
            'name': repo['full_name'],
            'url': repo['links']['html']['href'],
            'api': repo['links']['self']['href']
        })

    return jsonify(repos)