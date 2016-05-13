class RecordNotFoundError(ValueError):
    """Raised when a database record cannot be found."""

class APIError(ValueError):
    """Raised when an unexpected response is received from an API"""