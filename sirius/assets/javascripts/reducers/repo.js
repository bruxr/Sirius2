import _ from 'underscore'
import Immutable from 'immutable'

const Repo = Immutable.Record({
    kind: null,
    isDeploying: false,
    lastCommit: null,
    lastCommitDate: null,
    url: null
})

const buildRepo = (addon) => {
    const data = addon.data
    const attrs = {
        kind: addon.kind,
        url: data.url
    }

    if (!_.isUndefined(data.is_deploying)) {
        attrs.isDeploying = data.is_deploying
    }

    if (!_.isUndefined(data.last_commit)) {
        attrs.lastCommit = data.last_commit
        attrs.lastCommitDate = data.last_commit_date
    }

    return new Repo(attrs)
}

const repoReducer = (state, action) => {
    if (_.isUndefined(state)) {
        return Immutable.Map({
            isEditing: false,
            object: undefined
        })
    }

    switch ( action.type ) {

        case 'RECEIVED_ADDONS':
            for (addon of action.items) {
                if (addon.kind === 'bitbucket') {
                    var repo = buildRepo(addon)
                    return state.set('object', repo)
                }
            }
            return state
            break;

        default:
            return state

    }
}

export default repoReducer