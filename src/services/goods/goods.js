import request from '@utils/request.js'

export function querySeckillGoods(params, successCallback, errorCallback) {
  let url = {
    api: '/api/list_goods',
    type: 'json'
  };
  request.get(url, params, successCallback, errorCallback)
}

export function queryGoodsDetail(params, successCallback, errorCallback) {
  let url = {
    api: '/api/goodsDetail',
    type: 'json'
  };
  request.get(url, params, successCallback, errorCallback)
}
