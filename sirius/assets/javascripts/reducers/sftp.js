import _ from 'underscore'
import Immutable from 'immutable'

const Sftp = Immutable.Record({
    host: null,
    user: null,
    password: null,
    port: 22,
    path: '/'
})

const buildSftp = (addon) => {
    const data = addon.data
    const attrs = {
        host: addon.host,
        user: addon.user,
        password: addon.pass,
    }

    if (!_.isUndefined(data.port)) {
        attrs.port = data.port
    }

    if (!_.isUndefined(data.path)) {
        attrs.path = data.path
    }

    return new Sftp(attrs)
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
                if (addon.kind === 'sftp') {
                    var sftp = buildSftp(addon)
                    return state.set('object', sftp)
                }
            }
            return state
            break;

        default:
            return state

    }
}

export default repoReducer