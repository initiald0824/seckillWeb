import axios from 'axios';

axios.defaults.withCredentials = true;

const service = axios.create();

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function filterNull(o) {
 for (let key in o) {
   if(o.hasOwnProperty(key)) {
     if (o[key] === null) {
       delete o[key];
     }
     if (toType(o[key]) === 'string') {
       o[key] = o[key].trim();
     } else if (toType(o[key]) === 'object') {
       o[key] = filterNull(o[key]);
     } else if (toType(o[key]) === 'array') {
       o[key] = filterNull(o[key]);
     }
   }
 }
 return o;
}

function apiAxios(method, url, params, success, failure) {
  if (url.type === 'json') {
    if (params) {
      params = filterNull(params);
    }
  } else if (url.type === 'formData') {
    if (params) {
      const _params = new URLSearchParams();
      Object.keys(params).forEach(key => _params.append(key, params[key]));
      params = _params
    }
  }

  const method2Headers = {
    'GET': {'Content-Type': 'application/json; charset=UTF-8'},
    'POST': {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    'PUT': {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    'DELETE': {'Content-Type': 'application/json; charset=UTF-8'}
  };

  service({
    method: method,
    url: url.api,
    headers: !url.type ? method2Headers['method'] : url.type === 'json' ? { 'Content-Type': 'application/json; charset=UTF-8'} :
      url.type === 'formData' ? {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} :
        {'Content-Type': 'multipart/form-data; charset=UTF-8'},
    data: method === 'POST' || method === 'PUT' ? params : null,
    dataType: 'json',
    params: method === 'GET' || method === 'DELETE' ? params : null,
    withCredentials: true
  }).then((res) => {
    if (res.data.code === 0) {
      if (success) {
        success(res.data);
      }
    } else {
      if (failure) {
        failure(res.data);
      }
    }
  }).catch((err) => {
    throw new Error(err);
  })
}

export default {
  get: function(url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function(url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function(url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function(url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}

