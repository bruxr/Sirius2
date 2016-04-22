import React from 'react';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import App from './components/app.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import Overview from './components/overview.jsx';
import Integrations from './components/integrations.jsx';

import reducers from './reducers/reducers';

class Sirius {

    // Constructor. setups the app.
    constructor(project) {
        let logger = createLogger({ collapsed: true });

        this.store = createStore(
            reducers,
            { project: Immutable.Map(project) },
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
                <Router history={browserHistory}>
                    <Route path={`/a/${sirius_project.id}`} component={App}>
                        <IndexRoute component={Overview} />
                        <Route path="integrations" component={Integrations} />
                    </Route>
                </Router>
            </Provider>
        , document.getElementById('project'));
    }

}

export default Sirius;