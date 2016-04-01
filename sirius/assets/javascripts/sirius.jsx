import React from 'react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './components/app.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/reducers';

class Sirius {

  constructor(project) {
    this.store = createStore(
      reducers,
      { project: project },
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
    , document.getElementById('wrap'));
  }

}

export default Sirius;