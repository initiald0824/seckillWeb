import Cookies from 'js-cookie';

export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName, null)
};

export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)
};
