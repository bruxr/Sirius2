import os
from flask import abort, request

def protect_task_url():
    """Ensures the current request is from the App Engine task queue.
    Will abort with a 403 status if the request is not from App Engine.
    """
    if not os.environ['SERVER_SOFTWARE'].startswith('Development'):
        if not request.headers.has_key('X-AppEngine-QueueName') and not request.headers.has_key('X-AppEngine-TaskName'):
            abort(403)