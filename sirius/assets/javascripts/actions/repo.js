import _ from 'underscore'
import * as api from '../api'

export const ADD_REPO = 'SET_REPO'
export const CHANGE_REPO = 'CHANGE_REPO'
export const EDIT_REPO = 'EDIT_REPO'
export const FETCHING_HOSTED_REPOS = 'FETCHING_HOSTED_REPOS'
export const RECEIVED_HOSTED_REPOS = 'RECEIVED_HOSTED_REPOS'

export function addRepo() {
    return {
        type: ADD_REPO
    }
}

export function changeRepo() {
    return function(dispatch, getState) {
        const state = getState()
        dispatch(fetchHostedRepos())
        if (_.isUndefined(state.repo.get('object'))) {
            dispatch(addRepo())
        }
        dispatch(editRepo())
    }
}

export function editRepo() {
    return {
        type: EDIT_REPO
    }
    return function(dispatch, getState) {
        const state = getState()
    }
}

export function fetchHostedRepos() {
    function shouldFetch(state) {
        return !state.get('isFetching') && state.get('bitbucket').size === 0
    }

    return function(dispatch, getState) {
        const hosted = getState().repo.get('hosted')
        if (shouldFetch(hosted)) {
            dispatch(fetchingHostedRepos())
            return api.get('/utils/repositories')
                .then(resp => {
                    dispatch(receivedHostedRepos(resp))
                }, resp => {
                    throw new Error('Failed to fetch list of hosted repositories.')
                })
        }
    }
}

export function fetchingHostedRepos() {
    return {
        type: FETCHING_HOSTED_REPOS
    }
}

export function receivedHostedRepos(repos) {
    return {
        type: RECEIVED_HOSTED_REPOS,
        repos
    }
}