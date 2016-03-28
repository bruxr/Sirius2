import os
from flask import Flask
from sirius.application import app
import sirius.projects.projects as projects

# Sanity checks
if (os.environ.get('APP_KEY') == None):
    raise EnvironmentError('Cannot find application key in environment.')

# Enable debugging on dev
app.debug = os.environ.get('SERVER_SOFTWARE', '').startswith('Development')