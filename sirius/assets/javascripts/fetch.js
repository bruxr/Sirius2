export default function(url) {
  let req = new Request(url, {
    mode: 'cors',
    credentials: 'same-origin',
    headers: new Headers({
      'Accept': 'application/json'
    })
  });
  
  return fetch(req).then(function(resp) {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('Received HTTP '+ resp.status +' when fetching '+ resp.url);
    }
  });
}