import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/app.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import Overview from './components/overview.jsx';
import Integrations from './components/integrations.jsx';
import Contracts from './components/contracts.jsx';
import Files from './components/files.jsx';

import reducers from './reducers/reducers';
import { Project } from './reducers/project';

class Sirius {

    // Constructor. setups the app.
    constructor(project) {
        let logger = createLogger({ collapsed: true });
        let projectObj = new Project({
            id: project.id,
            name: project.name,
            description: project.desc,
            createdAt: moment.utc(project.created),
            updatedAt: moment.utc(project.updated)
        });

        this.store = createStore(
            reducers,
            { project: projectObj },
            applyMiddleware(thunk, logger)
        );
    }

    // Starts the app and renders the component hierarchy.
    start() {
        this._render();
        console.info('Sirius started.');
    }

    // Performs rendering.
    _render() {
        render(
            <Provider store={this.store}>
                <App />
            </Provider>
        , document.getElementById('project'));
    }

}

export default Sirius;