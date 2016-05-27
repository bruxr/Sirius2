export class APIClient {
    
    constructor(url, method) {
        if (typeof method === 'undefined') {
            method = 'GET'
        }

        this.url = url
        this.options = {
            headers: {
                'Accept': 'application/json'
            },
            mode: 'same-origin',
            credentials: 'same-origin',
            method
        }
    }

    set(header, value) {
        if (typeof header === 'object') {
            this.options.headers = Object.assign(this.options.headers, header)
        } else {
            this.options.headers[header] = value
        }
        return this
    }

    send(payload) {
        payload = JSON.stringify(payload)
        this.set('Content-type', 'application/json')
        if (typeof this.options.body === 'undefined') {
            this.options.body = payload
        } else {
            this.options.body = Object.assigsn(this.options.body, payload)
        }
        return this
    }

    then(resolve, reject) {
        fetch(this.url, this.options)
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                        .then(json => resolve(json))
                } else {
                    if (typeof reject === 'function') {
                        reject(resp)
                    }
                }
            })
    }
}

export function get(url) {
    return new APIClient(url)
}

export function post(url) {
    return new APIClient(url, 'POST')
}

export function patch(url) {
    return new APIClient(url, 'PATCH')
}

export function del(url) {
    return new APIClient(url, 'DELETE')
}