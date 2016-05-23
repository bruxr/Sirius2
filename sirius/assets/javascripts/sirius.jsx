import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/app.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/reducers';

class Sirius {

    // Constructor. setups the app.
    constructor(proj) {
        const logger = createLogger({
            collapsed: true
        });
        this.project = {
            id: proj.id,
            name: proj.name,
            desc: proj.desc,
            url: proj.url,
            created: moment.utc(proj.created),
            updated: moment.utc(proj.updated)
        };

        this.store = createStore(
            reducers,
            { project: this.project },
            applyMiddleware(thunk, logger)
        );
    }

    // Starts the app and renders the component hierarchy.
    start() {
        console.info('Sirius started.');
        this._render();
    }

    // Performs rendering.
    _render() {
        render(
            <Provider store={this.store}>
                <App project={this.project} />
            </Provider>
        , document.getElementById('project'));
    }

}

export default Sirius;