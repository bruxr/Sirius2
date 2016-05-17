from google.appengine.ext import ndb
from models import Contract, Project
from google.appengine.api import taskqueue
from flask import abort, Blueprint, jsonify, request

blueprint = Blueprint('contracts', __name__)

@blueprint.route('/projects/<int:project_id>/contracts')
def index(project_id):
    """Lists all contracts under a project.

    Arguments:
        project_id -- project ID
    """
    project = Project.get_by_id(long(project_id))
    if project is None:
        abort(404)

    contracts = []
    for contract in Contract.get_all(project.key):
        contracts.append(contract.json())

    return jsonify(contract=contracts)


@blueprint.route('/projects/<int:project_id>/contracts', methods=['POST'])
def create(project_id):
    """Creates a contract.

    Expects a body with the following attributes:
        name -- contract name
        desc -- contract description
        rate -- charge per hour (in cents)
        rate_type -- floating (1) or fixed (2)
        invoices -- array of objects with name and amount properties

    Arguments:
        project_id -- project ID
    """
    project = Project.get_by_id(long(project_id))
    if project is None:
        abort(404)

    body = request.get_json()

    invoices = []
    invoice_total = 0
    for invoice in body['invoices']:
        amount = int(invoice['amount'])
        invoice_total += amount
        invoices.append((None, invoice['name'], None, amount))

    if body['name'].strip() == '':
        return (jsonify({'error': 'Provide a contract name.'}), 400)

    contract = Contract(parent=project.key)
    contract.name = body['name'].strip()
    contract.desc = body['desc'].strip()
    contract.amount = invoice_total
    contract.rate_type = int(body['rate_type'])
    contract.invoices = invoices

    if body['rate'] is not None:
        contract.rate = int(body['rate'])

    @ndb.transactional
    def insert_contract():
        contract.put()
        params = {
            'project_id': project.key.id(),
            'contract_id': contract.key.id()
        }
        taskqueue.add(url='/work/freshbooks_sync', params=params, transactional=True)

    insert_contract()
    return (jsonify(contract.json()), 201)

@blueprint.route('/projects/<int:project_id>/contracts/<int:contract_id>')
def show(project_id, contract_id):
    """Returns details about a contract.

    Arguments:
        project_id -- project ID
        contract_id -- contract ID
    """
    project = Project.get_by_id(long(project_id))
    if project is None:
        abort(404)

    contract = Contract.get_by_id(long(contract_id), parent=project.key)
    if contract is None:
        abort(404)

    return jsonify(contract.json())

@blueprint.route('/projects/<int:project_id>/contracts/<int:contract_id>', methods=['PATCH'])
def update(project_id, contract_id):
    """Updates an existing contract.

    Expects a body with the following attributes:
        name -- contract name
        desc -- contract description
        amount -- total contract amount
        rate -- charge per hour (in cents)
        rate_type -- floating (1) or fixed (2)
        invoices -- array of objects with name, status and amount properties.

    Arguments:
        project_id -- project ID
        contract_id -- contract ID
    """    
    project = Project.get_by_id(long(project_id))
    if project is None:
        abort(404)

    contract = Contract.get_by_id(long(contract_id), parent=project.key)
    if contract is None:
        abort(404)

    body = request.get_json()

    if body['name'].strip() == '':
        return (jsonify({'error': 'Provide a contract name.'}), 400)

    invoice_total = 0
    for invoice in body['invoices']:
        invoice_total += invoice['amount']

    if body['amount'] != invoice_total:
        return (jsonify({'error': 'Total invoice amount is not equal the contract amount.'}), 400)

    contract.name = body['name'].strip()
    contract.desc = body['desc'].strip()
    contract.amount = long(body['amount'])
    contract.rate = int(body['rate'])
    contract.rate_type = int(body['rate_type'])
    contract.invoices = body['invoices']

    @ndb.transactional
    def update_contract():
        contract.put()
        for index, invoice in enumerate(contract.invoices):
            params = {
                'project_id': project.key.id(),
                'contract_id': contract.key.id()
            }
            taskqueue.add(url='/work/freshbooks_sync', params=params, transactional=True)

    update_contract()
    return jsonify(contract.json())

@blueprint.route('/projects/<int:project_id>/contracts/<int:contract_id>', methods=['DELETE'])
def destroy(project_id, contract_id):
    """Deletes an existing contract.

    Arguments:
        project_id -- project ID
        contract_id -- contract ID
    """
    project = Project.get_by_id(long(project_id))
    if project is None:
        abort(404)

    contract = Contract.get_by_id(long(contract_id), parent=project.key)
    if contract is None:
        abort(404)

    @ndb.transactional
    def delete_contract():
        for index, invoice in enumerate(contract.invoices):
            if invoice[0] is None:
                continue
            taskqueue.add(url='/work/freshbooks_delete', params={'invoice_id': invoice[0]}, transactional=True)
        contract.key.delete()

    delete_contract()
    return ('', 204)