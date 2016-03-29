from flask import Flask
import projects.projects as projects
import integrations.integrations as integrations

# Initialize app
app = Flask('sirius')

# Add blueprints
app.register_blueprint(projects.app)
app.register_blueprint(integrations.blueprint)

@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500
