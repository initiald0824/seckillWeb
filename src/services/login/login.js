import request from '@utils/request.js';

export function login(params, successCallback, errorCallback) {
  let url = {
    api: '/api/login',
    type: 'json'
  };
  request.get(url, params, successCallback, errorCallback)
}

export function authorization(params, successCallback, errorCallback) {
  let url = {
    api: '/api/authorization',
    type: 'json'
  };
  request.get(url, params, successCallback, errorCallback)
}
