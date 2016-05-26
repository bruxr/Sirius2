import json
from base64 import b64encode
from google.appengine.api import urlfetch

class BitbucketClient(object):
    """Bitbucket client for accessing the Bitbucket API.

    Allows easy access to the API without too much 
    horsing around with HTTP clients.
    """
    ENDPOINT = 'https://api.bitbucket.org/2.0'

    def __init__(self, key, secret):
        """Inits the client with the provided key and secret.

        Args:
            key: OAuth key
            secret: OAuth secret
        """
        self._access_token = self._request_access_token(key, secret)

    def repositories(self):
        """Retrieves all of the user's repositories.

        Returns:
            List of dictionaries containing details of each repository.
            See the API docs for a reference on the available keys.
        """
        next_url = '/repositories/?role=contributor'
        repos = []

        while next_url:
            resp = self.get(next_url)
            repos += resp['values']

            if 'next' in resp:
                next_url = resp['next']
            else:
                next_url = None

        return repos

    def user(self):
        """Returns basic information for the currently authenticated user.

        Returns:
            Dictionary containing details about the current user.
            See the API docs for a reference on the available keys.
        """
        return self.get('/user')

    def get(self, url):
        """Generic use method for requesting data from the API.

        Args:
            url: method name with leading slash or full URL.

        Returns:
            Parsed JSON result returned by the API.

        Raises:
            BitbucketError: Error received from the API.
        """
        headers = {
            'Authorization': 'Bearer ' + self._access_token
        }

        if url[:8] != 'https://':
            url = self.ENDPOINT + url

        result = urlfetch.fetch(
            url=url,
            headers=headers,
            method=urlfetch.GET
        )

        response = json.loads(result.content)
        if result.status_code == 200:
            return response
        else:
            raise BitbucketError(response['error']['message'])

    def _request_access_token(self, key, secret):
        """Requests an access token from Bitbucket.

        Args:
            key: OAuth key
            secret: OAuth secret

        Returns:
            The access key used for further access to the API.

        Raises:
            BitbucketError: Error received from the API
        """
        url = 'https://bitbucket.org/site/oauth2/access_token'
        headers = {
            'Authorization': 'Basic ' + b64encode(key + ':' + secret),
            'Content-type': 'application/x-www-form-urlencoded'
        }
        payload = 'grant_type=client_credentials'
        result = urlfetch.fetch(
            url=url,
            headers=headers,
            method=urlfetch.POST,
            payload=payload
        )

        response = json.loads(result.content)
        if result.status_code == 200:
            return response['access_token']
        else:
            raise BitbucketError(response['error_description'])

class BitbucketError(Exception):
    """Raised when an error is received from Bitbucket"""
    pass
