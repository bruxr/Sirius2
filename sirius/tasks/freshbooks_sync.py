import os
from refreshbooks import api
from sirius.models import Contract, Invoice, Project
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
        name = '{0} - {1}'.format(contract.name, invoice.name)
        if invoice.freshbooks_id is None:
            invoice.freshbooks_id = _create_invoice(name, invoice.amount, notes=project.url)
            invoice.status = 1
        else:
            _update_invoice(invoice.freshbooks_id, name, invoice.amount, notes=project.url)

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

def _update_invoice(id, name, amount, notes=''):
    """Updates an existing invoice in Freshbooks.

    Arguments:
        id -- invoice ID
        name -- new invoice name
        amount -- new invoice amount
        notes -- new invoice notes

    Returns:
        invoice ID
    """
    response = freshbooks.invoice.update(
        invoice=dict(
            invoice_id=id,
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