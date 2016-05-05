import fetch from '../fetch';

export function fetchFiles() {
    function shouldFetch(files) {
        return !files.isFetching && files.items.length === 0;
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
        dispatch(uploadingFile(file));
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
                    dispatch(uploadedFile(resp.file, file));
                    resolve(resp.file);
                }
            }
            xhr.send(fd);
        });
    }
}

export function uploadingFile(file) {
    return {
        type: 'UPLOADING_FILE',
        file: file
    }
}

export function uploadedFile(file, old_file) {
    return {
        type: 'UPLOADED_FILE',
        file: file,
        old_file: old_file
    }
}