import fetch from '../fetch';

export function fetchFiles() {
    function shouldFetch(files) {
        return !files.get('isFetching') && files.get('items').size === 0;
    }
    
    return function(dispatch, getState) {
        let state = getState();
        if (shouldFetch(state.files)) {
            dispatch(fetchingFiles());
            let project_id = state.project.get('id');
            return fetch(`/projects/${project_id}/files`)
                .then(function(resp) {
                    dispatch(receivedFiles(resp.file));
                });
        } else {
            Promise.resolve();
        }
    }
}

export function fetchingFiles() {
    return {
        type: 'FETCHING_FILES'
    }
}

export function receivedFiles(files) {
    return {
        type: 'RECEIVED_FILES',
        items: files
    }
}

export function pushFile(file) {
    return function(dispatch, getState) {
        let tempId = '?' + (+new Date());
        dispatch(uploadingFile(tempId, file));
        return new Promise(function(resolve) {
            let state = getState();
            let project_id = state.project.id;
            let fd = new FormData();
            fd.append(file.name, file);
            
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `/projects/${project_id}/files`, true);
            xhr.onload = function(e) {
                if (e.target.status === 200) {
                    let resp = JSON.parse(e.target.responseText);
                    dispatch(uploadedFile(tempId, resp.file));
                    resolve(resp.file);
                }
            }
            xhr.send(fd);
        });
    }
}

export function uploadingFile(tempId, file) {
    return {
        type: 'UPLOADING_FILE',
        tempId,
        file
    }
}

export function uploadedFile(tempId, file) {
    return {
        type: 'UPLOADED_FILE',
        tempId,
        file
    }
}