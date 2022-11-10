export const GET_TOKEN = 'GET_TOKEN';
export const GET_LOGIN = 'GET_LOGIN';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getLogin = (payload) => ({
  type: GET_LOGIN,
  payload,
});
