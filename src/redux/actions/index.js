export const GET_TOKEN = 'GET_TOKEN';
export const GET_LOGIN = 'GET_LOGIN';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const CLEAR_STATE = 'CLEAR_STATE';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getLogin = (payload) => ({
  type: GET_LOGIN,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const addAssertions = (payload) => ({
  type: ADD_ASSERTIONS,
  payload,
});

export const clearState = (payload) => ({
  type: CLEAR_STATE,
  payload,
});
