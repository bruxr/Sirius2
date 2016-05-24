import * as api from '../api';

export function deleteAddon(addonId) {
    return function(dispatch, getState) {
        const projectId = getState().project.get('id');
        dispatch(deletingAddon(addonId));
        if (addonId < 0) {
            dispatch(deletedAddon(addonId));
        } else {
            return api.delet(`/projects/${projectId}/integrations/${addonId}`)
                .then(resp => {
                    dispatch(deletedAddon(addonId));
                }, resp => {
                    throw new Error(`Failed to delete addon #${addonId}`);
                });
        }
    }
}

export function deletingAddon(id) {
    return {
        type: 'DELETING_ADDON',
        id
    }
}

export function deletedAddon(id) {
    return {
        type: 'DELETED_ADDON',
        id
    }
}

export function newAddon(kind) {
    const id = (+new Date()) * -1;
    return {
        type: 'NEW_ADDON',
        kind,
        id
    }
}

export function fetchAddons() {
    function shouldFetch(state) {
        let isFetching = state.addons.get('isFetching');
        let itemCount = state.addons.get('items').size;
        if (!isFetching && itemCount === 0) {
            return true;
        } else {
            return false;
        }
    }
  
    return function(dispatch, getState) {
        const state = getState();
        const projectId = state.project.get('id');
        if (shouldFetch(state)) {
            dispatch(fetchingAddons());
            return api.get(`/projects/${projectId}/addons`)
                .then(resp => {
                    dispatch(receivedAddons(resp.addon));
                }, resp => {
                    throw new Error('Failed to fetch project addons.');
                });
        } else {
          return Promise.resolve();
        }
    }
}

export function fetchingAddons() {
    return {
        type: 'FETCHING_ADDONS'
    }
}

export function receivedAddons(addons) {
    return {
        type: 'RECEIVED_ADDONS',
        items: addons
    }
}

export function saveAddon(id, kind, data) {
    return function(dispatch, getState) {
        const state = getState();
        const projectId = state.project.get('id');
        const body = JSON.stringify({
            kind,
            data
        });
        let push;
        
        if (id < 0) {
            push = api.post(`/projects/${projectId}/integrations`, {
                body
            });
        } else {
            push = api.patch(`/projects/${projectId}/integrations/${id}`, {
                body
            });
        }

        return push.then(resp => {
            dispatch(changedAddon(resp.addon, id));
        }, resp => {
            throw new Error(`Failed to save addon ${kind} #${id}.`)
        });
  }
}

export function changedAddon(addon, prevId) {
    return {
        type: 'CHANGED_ADDON',
        addon,
        prevId
    }
}