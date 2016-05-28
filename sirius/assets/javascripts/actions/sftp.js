import * as api2 from '../api2'

export const EDIT_SFTP = 'EDIT_SFTP'
export const SAVING_SFTP = 'SAVING_SFTP'
export const SAVED_SFTP = 'SAVED_SFTP'
export const EXIT_EDIT_SFTP = 'EXIT_EDIT_SFTP'

export function editSftp() {
    return {
        type: EDIT_SFTP
    }
}

export function saveSftp(sftp) {
    return function(dispatch, getState) {
        const projectId = getState().project.get('id')

        dispatch(savingSftp(sftp))

        api2.post(`/projects/${projectId}/addons`)
            .send({
                kind: 'sftp',
                data: sftp
            })
            .then(resp => {
                dispatch(savedSftp(sftp))
            }, resp => {
                throw new Error('Failed to save SFTP details.')
            })
    }
}

export function savedSftp(sftp) {
    return {
        type: SAVED_SFTP,
        sftp
    }
}

export function savingSftp(sftp) {
    return {
        type: SAVING_SFTP,
        sftp
    }
}

export function exitEditSftp() {
    return {
        type: EXIT_EDIT_SFTP
    }
}