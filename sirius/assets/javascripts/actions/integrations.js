import fetch from '../fetch';

export function deleteIntegration(id) {
  return function(dispatch, getState) {
    let project_id = getState().project.get('id');
    dispatch(deletingIntegration(id));
    return fetch(`/integrations/${id}?project_id=${project_id}`, { method: 'DELETE' })
      .then(function(resp) {
        dispatch(deletedIntegration(id));
      });
  }
}

export function deletingIntegration(id) {
  return {
    type: 'DELETING_INTEGRATION',
    id
  }
}

export function deletedIntegration(id) {
  return {
    type: 'DELETED_INTEGRATION',
    id
  }
}

export function newIntegration(kind) {
  return {
    type: 'NEW_INTEGRATION',
    kind: kind
  }
}

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

export function saveIntegration(id, kind, data) {
  return function(dispatch, getState) {
    let state = getState();
    let project_id = state.project.get('id');
    let payload = { kind, data }
    let push;
    if (id.charAt(0) === '?') {
      push = fetch(`/integrations?project_id=${project_id}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } else {
      push = fetch(`/integrations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
      });
    }

    return push.then(function(resp) {
      dispatch(savedIntegration(resp.integration, id));
    });
  }
}

export function savedIntegration(integration, prevId) {
  return {
    type: 'SAVED_INTEGRATION',
    integration,
    prevId
  }
}