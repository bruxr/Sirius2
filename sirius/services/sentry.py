import os
import json
from google.appengine.api import urlfetch
from sirius.errors import APIError

API_BASE = 'https://app.getsentry.com/api/0'

class SentryError(APIError):
    """Raised when an error is received from Sentry."""

def create_project(name):
    """Creates a project in Sentry.

    This assumes that sentry environment variables SENTRY_ORG,
    SENTRY_TEAM and SENTRY_KEY is set.

    Arguments:
        name -- project name

    Returns
        project slug in Sentry
    """
    org = os.environ['SENTRY_ORG']
    team = os.environ['SENTRY_TEAM']
    headers = {
        'Authorization': 'Basic ' + os.environ['SENTRY_KEY'],
        'Content-Type': 'application/json'
    }
    payload = json.dumps({'name': name})
    url = '{0}/teams/{1}/{2}/projects/'.format(API_BASE, org, team)

    result = urlfetch.fetch(
        url=url,
        payload=payload,
        method=urlfetch.POST,
        headers=headers
    )
    response = json.loads(result.content)
    if result.status_code == 201:
        return response['slug']
    else:
        raise SentryError(result.status_code, response['detail'])

def create_key(slug):
    """Creates a client key for a project.

    Arguments:
        slug -- project slug

    Returns
        client's secret DSN key
    """
    org = os.environ['SENTRY_ORG']
    headers = {
        'Authorization': 'Basic ' + os.environ['SENTRY_KEY'],
        'Content-Type': 'application/json'
    }
    payload = json.dumps({'name': 'Default'})
    url = '{0}/projects/{1}/{2}/keys/'.format(API_BASE, org, slug)

    result = urlfetch.fetch(
        url=url,
        payload=payload,
        method=urlfetch.POST,
        headers=headers
    )
    response = json.loads(result.content)
    if result.status_code == 201:
        return response['dsn']['secret']
    else:
        raise SentryError(result.status_code, response['detail'])