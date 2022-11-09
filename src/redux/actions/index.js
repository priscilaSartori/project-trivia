export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});
