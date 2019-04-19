import { login as loginUrl } from '@config/apiUrl.js'
import request from '@utils/request.js';


export async function login(params) {
  let url = {
    api: loginUrl,
    type: 'json'
  };
  return request.get(url, params, (res) => {

  });
}
