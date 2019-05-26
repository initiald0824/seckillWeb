import Cookies from 'js-cookie';

export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}
