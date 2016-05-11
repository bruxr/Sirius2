import tasks
from flask import Blueprint, request

blueprint = Blueprint('worker', __name__)

@blueprint.route('/work/<task_name>', methods=['POST'])
def work(task_name):
    getattr(tasks, task_name)()
    return ('', 204)