import fetch from '../fetch';

export function fetchContracts() {
    function shouldFetch(contracts) {
        return !contracts.get('isFetching') && contracts.get('items').size === 0;
    }

    return function(dispatch, getState) {
        let state = getState();
        if (shouldFetch(state.contracts)) {
            dispatch(fetchContracts());
            let project_id = state.project.get('id');
            return fetch(`/projects/${project_id}/contracts`)
                .then(function(resp) {
                    dispatch(receivedContracts(resp.contract));
                });
        } else {
            Promise.resolve();
        }
    }
}

export function fetchingContracts() {
    return {
        type: 'FETCHING_CONTRACTS'
    }
}

export function receivedContracts(contracts) {
    return {
        type: 'RECEIVED_CONTRACTS',
        items: contracts
    }
}