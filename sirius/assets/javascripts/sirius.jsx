import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/app.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Project } from './reducers/project';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/reducers';

class Sirius {

    // Constructor. setups the app.
    constructor(proj) {
        const logger = createLogger({
            collapsed: true
        });
        const project = new Project({
            id: proj.id,
            name: proj.name,
            url: proj.url,
            desc: proj.desc,
            status: proj.status,
            createdAt: moment.utc(proj.created),
            updatedAt: moment.utc(proj.updated)
        });
        const isDev = function() {
            return window.devToolsExtension && document.location.hostname === 'localhost'
        }

        this.store = createStore(
            reducers,
            { project },
            compose(
                applyMiddleware(thunk, logger),
                isDev() ? window.devToolsExtension() : f => f
            )
        );
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