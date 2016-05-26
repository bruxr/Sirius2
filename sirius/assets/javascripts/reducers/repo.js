import _ from 'underscore'
import moment from 'moment'
import Immutable from 'immutable'
import { ADD_REPO, FETCHING_HOSTED_REPOS, EDIT_REPO, RECEIVED_HOSTED_REPOS } from '../actions/repo'

const Repo = Immutable.Record({
    id: null,
    isDeploying: false,
    lastCommit: null,
    lastCommitDate: null,
    url: null
})

const repoReducer = (state, action) => {
    if (_.isUndefined(state)) {
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

        case FETCHING_HOSTED_REPOS:
            var hosted = state.get('hosted').set('isFetching', true)
            return state.set('hosted', hosted)

        case 'RECEIVED_ADDONS':
            if (_.isUndefined(action.items['repo'])) {
                return state
            }

            var addon = action.items['repo']
            var attrs = {
                kind: addon.kind,
                url: data.url
            }

            if (!_.isUndefined(data.is_deploying)) {
                attrs.isDeploying = data.is_deploying
            }

            if (!_.isUndefined(data.last_commit)) {
                attrs.lastCommit = data.last_commit
                attrs.lastCommitDate = moment.utc(data.last_commit_date)
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

        default:
            return state

    }
}

export default repoReducer