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
    console.info('sirius started.');
    let project = this.store.getState().project;
    render(
      <Provider store={this.store}>
        <App project={project} />
      </Provider>
    , document.getElementById('wrap'));
  }

}

/*
  Wraps the Fetch API, automatically sets
  request headers, parses JSON responses and
  performs error handling.

  Works the same as fetch() but returns a
  Promise that is resolved with JSON.
*/
Sirius.fetch = function(url) {
  let req = new Request(url, {
    mode: 'cors',
    credentials: 'same-origin',
    headers: new Headers({
      'Accept': 'application/json'
    })
  });
  
  return fetch(req).then(function(resp) {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('Received HTTP '+ resp.status +' when fetching '+ resp.url);
    }
  });
}

export default Sirius;