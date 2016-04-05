export default function(url, opts) {
  let headers = {
    'Accept': 'application/json'
  }
  if (typeof opts !== 'undefined' && (opts.method === 'POST' || opts.method == 'PATCH')) {
    headers['Content-type'] = 'application/json';
  }

  let init = Object.assign({
    method: 'GET',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers
  }, opts);
  
  return fetch(url, init).then(function(resp) {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('Received HTTP '+ resp.status +' when fetching '+ resp.url);
    }
  });
}