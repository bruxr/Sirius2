import Immutable from 'immutable'
import { EDIT_SFTP, EXIT_EDIT_SFTP, SAVING_SFTP } from '../actions/sftp'

const Sftp = Immutable.Record({
    host: null,
    user: null,
    password: null,
    port: 22,
    path: '/'
})

function buildSftp(data) {
    let attrs = {
        host: data.host,
        user: data.user,
        password: data.pass,
    }

    if (typeof data.port !== 'undefined') {
        attrs.port = data.port
    }

    if (typeof data.path !== 'undefined') {
        attrs.path = data.path
    }

    return new Sftp(attrs)
}

const sftpReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return Immutable.Map({
            isEditing: false,
            object: undefined
        })
    }

    switch (action.type) {

        case EDIT_SFTP:
            return state.set('isEditing', true)

        case EXIT_EDIT_SFTP:
            return state.set('isEditing', false)

        case 'RECEIVED_ADDONS':
            if (typeof action.items['sftp'] === 'undefined') {
                return state
            }

            var addon = action.items['sftp'].data
            return state.set('object', buildSftp(addon))

        case SAVING_SFTP:
            return state.set('object', buildSftp(action.sftp))

        default:
            return state

    }
}

export default sftpReducer