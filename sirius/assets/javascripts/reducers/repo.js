import moment from 'moment'
import Immutable from 'immutable'
import { ADD_REPO, FETCHING_HOSTED_REPOS, EDIT_REPO, EXIT_EDIT_REPO, RECEIVED_HOSTED_REPOS, SET_REPO } from '../actions/repo'

const Repo = Immutable.Record({
    id: null,
    isDeploying: false,
    lastCommit: null,
    lastCommitDate: null,
    url: null
})

const repoReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return Immutable.Map({
            hosted: Immutable.Map({
                isFetching: false,
                bitbucket: Immutable.List()
            }),
            isEditing: false,
            object: undefined
        })
    }

    switch ( action.type ) {

        case ADD_REPO:
            return state.set('object', new Repo())

        case EDIT_REPO:
            return state.set('isEditing', true)

        case EXIT_EDIT_REPO:
            return state.set('isEditing', false)

        case FETCHING_HOSTED_REPOS:
            var hosted = state.get('hosted').set('isFetching', true)
            return state.set('hosted', hosted)

        case 'RECEIVED_ADDONS':
            if (typeof action.items.repo === 'undefined') {
                return state
            }

            var addon = action.items.repo
            var attrs = {
                kind: addon.kind,
                url: addon.data.url
            }

            if (typeof addon.data.is_deploying !== 'undefined') {
                attrs.isDeploying = addon.data.is_deploying
            }

            if (typeof addon.data.last_commit !== 'undefined') {
                attrs.lastCommit = addon.data.last_commit
                attrs.lastCommitDate = moment.utc(addon.data.last_commit_date)
            }

            return state.set('object', new Repo(attrs))
            break;

        case RECEIVED_HOSTED_REPOS:
            var hosted = state.get('hosted')
            var bitbucket = hosted.get('bitbucket').withMutations(list => {
                action.repos.bitbucket.map(repo => {
                    list.push(repo)
                })
            })
            
            hosted = hosted.set('isFetching', false)
            hosted = hosted.set('bitbucket', bitbucket)

            return state.set('hosted', hosted)

        case SET_REPO:
            var object = state.get('object')
            object = object.set('id', action.id)
            object = object.set('url', action.repo)
            return state.set('object', object)

        default:
            return state

    }
}

export default repoReducer