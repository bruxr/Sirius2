import os
from refreshbooks import api
from sirius.errors import RecordNotFoundError

freshbooks = api.TokenClient(
    os.environ['FRESHBOOKS_URL'],
    os.environ['FRESHBOOKS_TOKEN'],
    user_agent='Sirius/1.0'
)

def freshbooks_delete(data):
    invoice_id = int(data['invoice_id'])
    response = freshbooks.invoice.delete(
        invoice_id=invoice_id
    )