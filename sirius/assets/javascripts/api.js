export function get(url, opts) {
    const o = Object.assign({
        headers: {}
    }, opts)
    const headers = Object.assign({
        'Accept': 'application/json'
    }, o.headers);
    const options = Object.assign({
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers
    }, o);
  
    return new Promise((resolve, reject) => {
        fetch(url, options).then(resp => {
            if (resp.ok) {
                resolve(resp.json());
            } else {
                reject(resp);
            }
        });
    });
}

export function post(url, opts) {
    const options = Object.assign({
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }, opts);
    return get(url, options);
}

export function patch(url, opts) {
    const options = Object.assign({
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        }
    }, opts);
    return get(url, options);
}

export function delet(url, opts) {
    const options = Object.assign({
        method: 'DELETE'
    }, opts);
    return get(url, options);
}