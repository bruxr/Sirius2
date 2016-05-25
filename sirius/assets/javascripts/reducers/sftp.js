import _ from 'underscore'
import Immutable from 'immutable'

const Sftp = Immutable.Record({
    host: null,
    user: null,
    password: null,
    port: 22,
    path: '/'
})

const sftpReducer = (state, action) => {
    if (_.isUndefined(state)) {
        return Immutable.Map({
            isEditing: false,
            object: undefined
        })
    }

    switch ( action.type ) {

        case 'RECEIVED_ADDONS':
            if (_.isUndefined(action.items['sftp'])) {
                return state
            }

            var addon = action.items['sftp']
            var attrs = attrs = {
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

            return state.set('object', new Sftp(attrs))
            break;

        default:
            return state

    }
}

export default sftpReducer