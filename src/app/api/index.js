export function findfalconeGetApi(url, cb) {
  const xhr = createCORSRequest('GET', url);
  if (!xhr) {
    // eslint-disable-next-line no-alert
    alert('CORS not supported');
    return;
  }
  xhr.onload = () => {
    const text = JSON.parse(xhr.responseText);
    cb(text);
  };
  xhr.onerror = () => {
    // eslint-disable-next-line no-alert
    console.log('CORS not supported');
  };
  xhr.send();
}

export function findfalconePostApi(url, body, cb) {
  const xhr = createCORSRequest('POST', url);
  if (!xhr) {
    // eslint-disable-next-line no-alert
    alert('CORS not supported');
    return;
  }
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    console.log(response);
    cb(Object.assign({}, response, url));
  };
  xhr.onerror = () => {
    console.log('CORS not supported');
  };
  xhr.send(JSON.stringify(body));
}

export function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  // eslint-disable-next-line no-negated-condition
  } else if (typeof XDomainRequest !== 'undefined') {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  return xhr;
}
