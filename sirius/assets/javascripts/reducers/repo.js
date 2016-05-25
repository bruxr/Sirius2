import _ from 'underscore'
import moment from 'moment'
import Immutable from 'immutable'

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
            isEditing: false,
            object: undefined
        })
    }

    switch ( action.type ) {

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

        default:
            return state

    }
}

export default repoReducer