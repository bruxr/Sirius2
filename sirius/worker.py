import tasks
from flask import Blueprint, request

blueprint = Blueprint('worker', __name__)

@blueprint.route('/work/<task_name>', methods=['POST'])
def work(task_name):
    """Executes a background task.

    Arguments:
        task_name -- name of the task
    """
    module = getattr(tasks, task_name)
    task = getattr(module, task_name)
    task(request.form)
    return ('', 204)