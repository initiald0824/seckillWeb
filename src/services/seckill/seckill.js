import request from '@/utils/request.js';

export function execSeckill(params, successCallback, errorCallback) {
  let url = {
    api: '/api/seckill',
    type: 'formData'
  };
  request.post(url, params, successCallback, errorCallback)
}
