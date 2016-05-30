import _ from 'underscore'
import * as api from '../api'
import * as api2 from '../api2'

export const ADD_REPO = 'ADD_REPO'
export const CHANGE_REPO = 'CHANGE_REPO'
export const DEPLOY_REPO = 'DEPLOY_REPO'
export const EDIT_REPO = 'EDIT_REPO'
export const EXIT_EDIT_REPO = 'EXIT_EDIT_REPO'
export const FETCHING_HOSTED_REPOS = 'FETCHING_HOSTED_REPOS'
export const RECEIVED_HOSTED_REPOS = 'RECEIVED_HOSTED_REPOS'
export const SAVE_REPO = 'SAVE_REPO'
export const SET_REPO = 'SET_REPO'

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

export function deployRepo() {
    function canDeploy(state) {
        const repo = state.repo.get('object')
        return repo !== 'undefined' && !repo.get('isDeploying')
    }

    return function(dispatch, getState) {
        const state = getState()
        if (canDeploy(state)) {
            dispatch({
                type: DEPLOY_REPO
            })
        }
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

export function exitEditRepo() {
    return {
        type: EXIT_EDIT_REPO
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

export function saveRepo(repo) {
    return function(dispatch, getState) {
        const projectId = getState().project.get('id')
        const tempId = (+new Date()) * -1
        dispatch(setRepo(tempId, repo))
        return api2.post(`/projects/${projectId}/addons`)
            .send({
                'kind': 'repo',
                'data': {
                    'url': repo
                }
            })
            .then(resp => {
                dispatch(setRepo(resp.addon.id, repo))
                dispatch(exitEditRepo())
            }, resp => {
                throw new Error('Failed set project repository.')
            })
    }
}

export function setRepo(id, repo) {
    return {
        type: SET_REPO,
        id,
        repo
    }
}