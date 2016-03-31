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
    var integrations = state.integrations;
    if (integrations.isFetching === false && integrations.items.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  
  return function(dispatch, getState) {
    var state = getState();
    if (shouldFetch(state)) {
      dispatch(requestIntegrations());
      return fetch('/projects/' + state.project.id + '/integrations')
        .then(function(resp) {
          dispatch(receiveIntegrations(resp.integration));
        }, function(err) {
          dispatch(receiveIntegrations([], err));
        });
    } else {
      return Promise.resolve(state.integrations.items);
    }
  }
}