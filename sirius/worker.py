from flask import Blueprint, request

blueprint = Blueprint('worker', __name__)

@blueprint.route('/work/<task_name>', methods=['POST'])
def work(task_name):
    task = getattr(__import__('tasks.%s' % task_name), task_name)
    task(request.form)
    return ('', 204)