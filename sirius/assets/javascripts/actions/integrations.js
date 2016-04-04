import fetch from '../fetch';

export function requestIntegrations() {
  return {
    type: 'REQUEST_INTEGRATIONS'
  }
}

export function receiveIntegrations(integrations, err) {
  return {
    type: 'RECEIVE_INTEGRATIONS',
    items: integrations,
    error: err
  }
}

export function fetchIntegrations() {
  function shouldFetch(state) {
    let isFetching = state.integrations.get('isFetching');
    let itemCount = state.integrations.get('items').size;
    if (isFetching === false && itemCount === 0) {
      return true;
    } else {
      return false;
    }
  }
  
  return function(dispatch, getState) {
    var state = getState();
    if (shouldFetch(state)) {
      dispatch(requestIntegrations());
      return fetch('/projects/' + state.project.get('id') + '/integrations')
        .then(function(resp) {
          dispatch(receiveIntegrations(resp.integration));
        }, function(err) {
          dispatch(receiveIntegrations([], err));
        });
    } else {
      return Promise.resolve();
    }
  }
}