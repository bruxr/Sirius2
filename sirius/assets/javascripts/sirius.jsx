import React from 'react';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import App from './components/app.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/reducers';

class Sirius {

  constructor(project) {
    let logger = createLogger({ collapsed: true });

    this.store = createStore(
      reducers,
      { project: Immutable.Map(project) },
      applyMiddleware(thunk, logger)
    );
  }

  start() {
    this._render();
    console.info('Sirius started.');
  }

  _render() {
    let project = this.store.getState().project;
    render(
      <Provider store={this.store}>
        <App project={project} />
      </Provider>
    , document.getElementById('project'));
  }

}

export default Sirius;