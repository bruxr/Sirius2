import os
from refreshbooks import api
from sirius.models import Contract, Project
from sirius.errors import RecordNotFoundError

freshbooks = api.TokenClient(
    os.environ['FRESHBOOKS_URL'],
    os.environ['FRESHBOOKS_TOKEN'],
    user_agent='Sirius/1.0'
)

def freshbooks_sync(data):
    project_id = long(data['project_id'])
    contract_id = long(data['contract_id'])

    project = Project.get_by_id(project_id)
    if project is None:
        raise RecordNotFoundError('Project', project_id)

    contract = Contract.get_by_id(contract_id, parent=project.key)
    if contract is None:
        raise RecordNotFoundError('Contract', contract_id)

    for invoice in contract.invoices:
        if invoice[0] is None:
            name = '{0} - {1}'.format(contract.name, invoice[1])
            invoice_id = _create_invoice(name, invoice[3], notes=project.url)
            invoice = (invoice_id, invoice[1], 'saved', invoice[3])

    contract.put()

def _create_invoice(name, amount, notes=''):
    """Creates an invoice in Freshbooks.

    Arguments:
        name -- name of the invoice
        amount -- invoice amount
        notes -- invoice notes

    Returns:
        invoice ID
    """
    response = freshbooks.invoice.create(
        invoice=dict(
            client_id=os.environ['FRESHBOOKS_CLIENT_ID'],
            status='draft',
            notes=notes,
            lines=[
                api.types.line(
                    description=name,
                    unit_cost=amount,
                    quantity='1'
                )
            ]
        )
    )
    return int(response.invoice_id)