import React from 'react';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/app.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadProject } from './actions/project';

import reducers from './reducers/reducers';

class Sirius {

    // Constructor. setups the app.
    constructor(project) {
        const logger = createLogger({
            collapsed: true
        });

        this.store = createStore(
            reducers,
            {},
            applyMiddleware(thunk, logger)
        );
        this.store.dispatch(loadProject(project));
    }

    // Starts the app and renders the component hierarchy.
    start() {
        this._render();
        console.info('Sirius is ready...');
    }

    // Performs rendering.
    _render() {
        const project = this.store.getState().project;
        render(
            <Provider store={this.store}>
                <App project={project} />
            </Provider>
        , document.getElementById('project'));
    }

}

export default Sirius;